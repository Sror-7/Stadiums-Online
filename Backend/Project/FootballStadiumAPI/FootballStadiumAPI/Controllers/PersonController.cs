using FootballStadiumAPIBusiness;
using FootballStadiumAPIDataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using FootballStadiumAPIDataAccess.DTOs;

namespace FootballStadiumAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/Person")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PersonBusiness _personBusiness;

        public PersonController(PersonBusiness personBusiness)
        {
            _personBusiness = personBusiness;

        }

        //private readonly CloudinaryService _cloudinaryService;

        //public PersonController(CloudinaryService cloudinaryService)
        //{
        //    _cloudinaryService = cloudinaryService;
        //}
        [HttpPost("Add", Name = "AddNewPerson")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddNewPerson([FromForm] PersonCreateDTO person)
        {
            try
            {
                string pictureUrl = null;

                //if (person.ProfilePicture != null)
                //{
                //    pictureUrl = await _cloudinaryService.UploadImageAsync(person.ProfilePicture);
                //}

                var personDto = new PersonDTO
                {
                    Name = person.Name,
                    //SecondName = person.SecondName,
                    //LastName = person.LastName,
                    Gender = person.Gender,
                    Phone = person.Phone,
                    Address = person.Address,
                    ImageURL = pictureUrl ?? "",
                    DateOfBirth = person.DateOfBirth,
                };

                int result = FootballStadiumAPIBusiness.PersonBusiness.AddNewPerson(personDto);

                if (result > 0)
                    return Created(string.Empty, new { message = "Person created successfully", ID = result });

                return BadRequest(new { message = "Failed to create Person." });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error", error = ex.Message });
            }
        }

        [HttpPatch("Patch/{id}", Name = "PatchPerson")]
        public async  Task<IActionResult> PatchPerson( int id, [FromBody] JsonPatchDocument<PersonUpdateDTO> patchData)
        {
            if (patchData == null)
                return BadRequest("Patch document is required.");

            var result = await _personBusiness.PatchPersonAsync(id, patchData);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Updated successfully" });
        }
        [HttpPut("UpdateImage/{id}", Name = "UpdatePersonImage")]
        public async Task<IActionResult> UpdateImage(int id, IFormFile? ImageFile)
        {
            var result = await _personBusiness.UpdatePersonImage(id, ImageFile);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Updated image successfully" });
        }
        //[HttpPut("Update",Name = "UpdatePerson")]
        //public async  Task<IActionResult> UpdatePerson(
        //    [FromForm] PersonUpdateDTO person
        //     )
        //{
        //    try
        //    {
        //        string pictureUrl = null;

        //        if (person.ProfilePicture != null)
        //        {
        //            pictureUrl = await _cloudinaryService.UploadImageAsync(person.ProfilePicture);
        //        }

        //        var personDto = new PersonDTO
        //        {
        //            ID = person.ID,
        //            Name = person.Name,
        //            //SecondName = person.SecondName,
        //            //LastName = person.LastName,
        //            Gender = person.Gender,
        //            Phone = person.Phone,
        //            Address = person.Address,
        //            ImageURL = pictureUrl ?? "",
        //            DateOfBirth = person.DateOfBirth,
        //        };

        //        bool updated = FootballStadiumAPIBusiness.Person.UpdatePerson(personDto);
        //        if (updated)
        //            return Ok(new { message = "Updated successfully" });
        //        else
        //            return BadRequest(new { message = "Update failed" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Server Error", error = ex.Message });
        //    }
        //}
        [HttpGet("Get", Name = "GetPersonInfoByID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<PersonDTO>> GetPersonInfoByID(int PersonID)
        {
            PersonDTO person = FootballStadiumAPIBusiness.PersonBusiness.Find(PersonID);

            if (person == null)
            {
                return NotFound("No Person Found!");
            }
            return Ok(person);

        }
    }
}
