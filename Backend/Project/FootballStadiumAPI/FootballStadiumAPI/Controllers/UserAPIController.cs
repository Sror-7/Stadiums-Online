using FootballStadiumAPIBusiness;
using FootballStadiumAPIDataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FootballStadiumAPIDataAccess.DTOs;

namespace FootballStadiumAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/User")]
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        private readonly UserBusiness _userBusiness;

        public UserAPIController(UserBusiness userBusiness)
        {
            _userBusiness = userBusiness;

        }
        [HttpPost("Add", Name = "AddNewUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddNewUser( UserCreateDTO newUser)
        {
            
                int result = FootballStadiumAPIBusiness.UserBusiness.AddNewUser(newUser);

            if(result > 0)
                return Ok(new { message = "User created successfully", userId = result });

            else
                return BadRequest("Failed to add User.");

        }
        [HttpGet("Get", Name = "GetUserInfoByID")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize]
        public ActionResult<IEnumerable<UserDTO>> GetUserInfoByID()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            UserDTO user = FootballStadiumAPIBusiness.UserBusiness.Find(int.Parse(userId));

            if (user == null)
            {
                return NotFound("No User Found!");
            }
            return Ok(user);

        }
        //[HttpGet("GetByUsernameAndPassword", Name = "GetUserInfoByUsernameAndPassword")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]

        //public ActionResult<IEnumerable<UserDTO>> GetUserInfoByUsernameAndPassword(string Username, string Password)
        //{
        //    UserDTO user = FootballStadiumAPIBusiness.UserBusiness.Find(Username,Password);

        //    if (user == null)
        //    {
        //        return NotFound("No User Found!");
        //    }
        //    return Ok(user);

        //}
        [HttpPut("Update",Name = "UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateUser(UserUpdateDTO data)
        {
            try
            {
                bool updated = FootballStadiumAPIBusiness.UserBusiness.UpdateUser(data);
                if (updated)
                    return Ok(new { message = "Updated successfully" });
                else
                    return NotFound(new { message = "Update failed" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server Error", error = ex.Message });
            }
        }
        [HttpGet("UsernameAvailabilityCheck", Name = "IsUsernameAvailable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsUsernameAvailable(string username, int? userId = null)
        {
            try
            {
                bool isAvailable = FootballStadiumAPIBusiness.UserBusiness.IsUsernameAvailable(username, userId);

                if (isAvailable)
                {
                    return Ok(new { available = true, message = "Username is available." });
                }
                else
                {
                    return Conflict(new { available = false, message = "Username is already taken." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    available = false,
                    message = "An error occurred while checking username availability.",
                    error = ex.Message
                });
            }
        }
        [HttpGet("EmailAvailabilityCheck", Name = "IsEmailAvailable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsEmailAvailable(string email, int? userId = null)
        {
            try
            {
                bool isAvailable = FootballStadiumAPIBusiness.UserBusiness.IsEmailAvailable(email, userId);

                if (isAvailable)
                {
                    return Ok(new { available = true, message = "Email is available." });
                }
                else
                {
                    return Conflict(new { available = false, message = "This email is already registered. Please log in or use a different email." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    available = false,
                    message = "An error occurred while checking email availability.",
                    error = ex.Message
                });
            }
        }
        [HttpPut("ChangePassword", Name = "ChangeUserPassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult ChangeUserPassword([FromBody] ChangePasswordDTO changePassword)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");


            bool changed = _userBusiness.ChangeUserPassword(int.Parse(userId), changePassword);

            if (!changed)
            {
                return BadRequest(new { success = false, message = "Password changed faild" });
            }


            return Ok(new { success = true,message = "Password changed successfully" });
        }
        [HttpGet("IsPassowrdCorrect", Name = "IsUserPasswordCorrect")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult IsPasswordCorrect(string Password)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");


            bool isCorrect = _userBusiness.IsPasswordCorrect(int.Parse(userId), Password);

            if (isCorrect)
                return Ok(new { isCorrect = true, message = "Password is correct!" });
            else
                return BadRequest(new { isCorrect = false, message = "Password is incorrect!" });
        }

    }
}
