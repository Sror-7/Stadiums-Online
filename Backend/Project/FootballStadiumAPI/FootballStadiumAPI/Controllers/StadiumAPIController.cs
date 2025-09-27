using FootballStadiumAPIBusiness;
using FootballStadiumAPIDataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FootballStadiumAPIDataAccess.DTOs;
namespace FootballStadiumAPI.Controllers
{

    //[Route("api/[controller]")]
    [Route("api/Stadium")]
    [ApiController]
    public class StadiumAPIController : ControllerBase
    {
        private readonly StadiumBusiness _stadiumBusiness;

        public StadiumAPIController(StadiumBusiness stadiumBusiness)
        {
            _stadiumBusiness = stadiumBusiness;

        }

        [HttpGet("All", Name = "GetAllStadiums")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StadiumDTO>> GetAllStadiums()
        {
            List<StadiumDTO> StadiumsList = FootballStadiumAPIBusiness.StadiumBusiness.GetAllStadiums();
            if (StadiumsList.Count == 0)
            {
                return NotFound("No Stadiums Found!");
            }
            return Ok(StadiumsList);
        }

        [HttpGet("AllWithSettings", Name = "GetAllStadiumsWithSettings")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StadiumDTO>> GetAllStadiumsWithSettings()
        {
            List<StadiumInfoWithSettingsDTO> StadiumsList = FootballStadiumAPIBusiness.StadiumBusiness.GetAllStadiumsWithSettings();
            if (StadiumsList.Count == 0)
            {
                return NotFound("No Stadiums Found!");
            }
            return Ok(StadiumsList);
        }

        [HttpGet("Get", Name = "GetStadiumInfoByID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StadiumDTO>> GetStadiumInfoByID(int StadiumID)
        {
            StadiumDTO stadium = FootballStadiumAPIBusiness.StadiumBusiness.Find(StadiumID);
            if (stadium == null)
            {
                return NotFound("No Stadiums Found!");
            }


            return Ok(stadium);
        }
        [HttpGet("GetWithSettings", Name = "GetStadiumInfoWithSettingsByID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StadiumInfoWithSettingsDTO>> GetStadiumInfoWithSettingsByID(int StadiumID)
        {
            StadiumInfoWithSettingsDTO stadium = FootballStadiumAPIBusiness.StadiumBusiness.GetStadiumInfoWithSettingsSettingsByID(StadiumID);
            if (stadium == null)
            {
                return NotFound("No Stadiums Found!");
            }


            return Ok(stadium);
        }
        [HttpGet("GetByOwnerID", Name = "GetStadiumInfoByOwnerID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StadiumDTO>> GetStadiumInfoByOwnerID(int OwnerID)
        {
            StadiumDTO stadium = FootballStadiumAPIBusiness.StadiumBusiness.FindByOwnerID(OwnerID);
            if (stadium == null)
            {
                return NotFound("No Stadiums Found!");
            }

            return Ok(stadium);
        }
        [HttpGet("GetByLoggedUser", Name = "GetStadiumInfoByLoggedUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize]
        public ActionResult<IEnumerable<StadiumDTO>> GetStadiumInfoByLoggedUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");
            StadiumDTO stadium = FootballStadiumAPIBusiness.StadiumBusiness.FindByOwnerID(int.Parse(userId));
            if (stadium == null)
            {
                return NotFound("No Stadiums Found!");
            }


            return Ok(stadium);
        }
        [HttpGet("GetBookingSettings", Name = "GetBookingSettingsByStadiumID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        [Authorize]
        public ActionResult<IEnumerable<StadiumDTO>> GetBookingSettingsByStadiumID()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");
            StadiumDTO st = StadiumBusiness.FindByOwnerID(int.Parse(userId));


            StadiumBookingSettingsDTO stadium = FootballStadiumAPIBusiness.StadiumBusiness.GetStadiumSettings(st.ID);
            if (stadium == null)
            {
                return NotFound("No Settings Found!");
            }

            return Ok(stadium);
        }
        [HttpPost("Add", Name = "AddNewStadium")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> AddNewStadium([FromBody] StadiumCreateDTO newStadium)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            newStadium.OwnerID = int.Parse(userId);
            var insertedId = await _stadiumBusiness.AddNewStadium(newStadium);

            if (insertedId > 0)
            {
                return Created("", new { id = insertedId });
            }

            return BadRequest("Failed to add stadium.");
        }

        [HttpGet("StadiumNameAvailabilityCheck", Name = "IsStadiumNameAvailable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsStadiumNameAvailable(string StadiumName, int? StadiumID = null)
        {
            try
            {
                bool isAvailable = FootballStadiumAPIBusiness.StadiumBusiness.IsStadiumNameAvailable(StadiumName, StadiumID);

                if (isAvailable)
                {
                    return Ok(new { available = true, message = "Stadium name is available." });
                }
                else
                {
                    return Conflict(new { available = false, message = "Stadium name you wrote isn't available" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    available = false,
                    message = "An error occurred while checking stadium name availability.",
                    error = ex.Message
                });
            }
        }
        [HttpPatch("Patch/{id}", Name = "PatchStadium")]
        public async Task<IActionResult> PatchStadium(int id, [FromBody] JsonPatchDocument<StadiumUpdateDTO> patchData)
        {
            if (patchData == null)
                return BadRequest("Patch document is required.");

            var result = await _stadiumBusiness.PatchStadiumAsync(id, patchData);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Updated successfully" });
        }
        [HttpPut("UpdateImage/{id}", Name = "UpdateStadiumImage")]
        public async Task<IActionResult> UpdateImage(int id, IFormFile? ImageFile)
        {
            var result = await _stadiumBusiness.UpdateStadiumImage(id, ImageFile);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Updated image successfully" });
        }
        [HttpPatch("PatchBookingSettings/{id}", Name = "PatchStadiumBookingSettings")]
        public async Task<IActionResult> PatchStadiumBookingSettings(int id, [FromBody] JsonPatchDocument<StadiumBookingSettingsDTO> patchData)
        {
            if (patchData == null)
                return BadRequest("Patch document is required.");

            var result = await _stadiumBusiness.PatchStadiumBookingSettingsAsync(id, patchData);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Updated successfully" });
        }

    }
}
