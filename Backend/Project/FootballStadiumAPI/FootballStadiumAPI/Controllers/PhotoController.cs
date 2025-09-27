//using FootballStadiumAPI.Interfaces;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace FootballStadiumAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class PhotoController : ControllerBase
//    {
//        private readonly IPhotoService _photoService;

//        public PhotoController(IPhotoService photoService)
//        {
//            _photoService = photoService;
//        }

//        [HttpPost("upload")]
//        public async Task<IActionResult> UploadPhoto([FromForm] IFormFile file)
//        {
//            var result = await _photoService.UploadPhotoAsync(file);

//            if (result.Error != null)
//                return BadRequest(result.Error.Message);

//            return Ok(new
//            {
//                Url = result.SecureUrl.AbsoluteUri,
//                PublicId = result.PublicId
//            });
//        }
//    }
//}
