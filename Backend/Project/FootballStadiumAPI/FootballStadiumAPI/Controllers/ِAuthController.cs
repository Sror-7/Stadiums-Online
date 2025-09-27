using FootballStadiumAPIDataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FootballStadiumAPIDataAccess.DTOs;

namespace FootballStadiumAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
{
    [HttpPost("Login", Name = "LoginByIdentifierAndPassword")]

        public IActionResult Login( LoginDto model)
    {
        
        var token = FootballStadiumAPIBusiness.AuthBusiness.Login(model.Identifier, model.Password);

        if (token == null)
            return Unauthorized(new { message = "Invalid credentials" });

        return Ok(new { token });
    }
    //[HttpPost("Login", Name = "LoginByUsernameAndPassword")]

    //    public IActionResult Login( LoginDto model)
    //{
        
    //    var token = FootballStadiumAPIBusiness.Auth.Login(model.Username, model.Password);

    //    if (token == null)
    //        return Unauthorized(new { message = "Invalid credentials" });

    //    return Ok(new { token });
    //}
    [HttpPost("SignIn", Name = "SignInNewUser")]

        public IActionResult SignIn( SignInDTO model)
   {
        
        var token = FootballStadiumAPIBusiness.AuthBusiness.SignIn(model);
         
        if (token == null)
            return Unauthorized(new { message = "Error while creating user" });

        return Ok(new { token });
    }
        [Authorize]
        [HttpGet("protected")]
        public IActionResult GetProtected()
        {
            return Ok(new { message = "Access granted to protected resource." });
        }
    }
    }