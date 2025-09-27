using FootballStadiumAPIBusiness;
using FootballStadiumAPIDataAccess;
using FootballStadiumAPIDataAccess.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text.Json;

namespace FootballStadiumAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/Bookings")]
    [ApiController]
    public class BookingsAPIController : ControllerBase
    {
        [HttpGet("OneTimeBookingsListByStadiumIDAndDate", Name = "OneTimeBookingsListByStadiumIDAndDate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<OneTimeBookingDTO>> GetOneTimeBookingsListByStadiumIDAndDate(int StadiumID, DateTime Date, int Duration)
        {

            List<OneTimeBookingDTO> BookingsList = FootballStadiumAPIBusiness.BookingBusiness.GetOneTimeBookingsListByStadiumIDAndDate(StadiumID, Date, Duration);
            if (BookingsList.Count == 0)
            {
                return NotFound("No Bookings Found!");
            }
            return Ok(BookingsList);

        }
        [HttpGet("ConstantBookingsListByStadiumIDAndWeekDay", Name = "ConstantBookingsListByStadiumIDAndWeekDay")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<ConstantBookingDTO>> GetConstantBookingsListByStadiumIDAndWeekDay(int StadiumID, string WeekDay, int Duration)
        {

            List<ConstantBookingDTO> BookingsList = FootballStadiumAPIBusiness.BookingBusiness.GetConstantBookingsListByStadiumIDAndWeekDay(StadiumID, WeekDay, Duration);
            if (BookingsList.Count == 0)
            {
                return NotFound("No Bookings Found!");
            }
            return Ok(BookingsList);

        }
        [HttpGet("UpcomingBookingsList", Name = "UpcomingBookingsListByUserID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize]
        public IActionResult GetUpcomingBookingsListByUserID()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            var BookingsList = FootballStadiumAPIBusiness.BookingBusiness.GetUpcomingBookingsByUserID(int.Parse(userId));

            if (BookingsList.Count == 0)
            {
                return NotFound("No Bookings Found!");
            }
            return Ok(BookingsList);

        }
        [HttpGet("ConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber", Name = "ConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<ConstantBookingDTO>> GetConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber(int StadiumID, string WeekDay,int WeekNumber, int Duration)
        {

            List<ConstantBookingDTO> BookingsList = FootballStadiumAPIBusiness.BookingBusiness.GetConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber(StadiumID, WeekDay,WeekNumber, Duration);
            if (BookingsList.Count == 0)
            {
                return NotFound("No Bookings Found!");
            }
            return Ok(BookingsList);

        }

        [HttpPost("AddOneTime", Name = "AddNewOneTimeBooking")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public ActionResult<int> AddNewOneTimeBooking(OneTimeBookingCreateDTO newBooking)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            var insertedId = FootballStadiumAPIBusiness.BookingBusiness.AddNewOneTimeBooking(newBooking, int.Parse(userId));

            if (insertedId > 0)
                return Created("Add new one time booking succeded", new { id = insertedId });

            return BadRequest("Failed to add Booking.");
        }
        [HttpPost("AddConstant", Name = "AddNewConstantBooking")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public ActionResult<int> AddNewConstantBooking(ConstantBookingCreateDTO newBooking)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");
            var insertedId = FootballStadiumAPIBusiness.BookingBusiness.AddNewConstantBooking(newBooking, int.Parse(userId));

            if (insertedId > 0)
                return Created("Add new constant booking succeded", new { id = insertedId });

            return BadRequest("Failed to add Booking.");
        }


        [HttpPut("UpdateStatus", Name = "UpdateBookingStatus")]
        public IActionResult UpdateBookingStatus(int BookingID, int BookingStatusID)
        {
            bool success = FootballStadiumAPIBusiness.BookingBusiness.UpdateBookingStatus( BookingID, BookingStatusID);

            if (success)
                return Ok(new { message = "Booking status updated successfully" });

            return BadRequest(new { message = "Failed to update booking status" });
        }
        [HttpGet("UserConstantBookingsByStatusID", Name = "GetUserConstantBookingsByStatusID")]
        [Authorize]
        public IActionResult GetUserConstantBookings([FromQuery] int statusID)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            var bookings = BookingBusiness.GetUserConstantBookings(int.Parse(userId), statusID);

            return Ok(bookings);
        }
        [HttpGet("UserOneTimeBookingsByStatusID", Name = "GetUserOneTimeBookingsByStatusID")]
        [Authorize]
        public IActionResult GetUserOneTimeBookings([FromQuery] int statusID)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            var bookings = BookingBusiness.GetUserOneTimeBookings(int.Parse(userId), statusID);

            return Ok(bookings);
        }

        [HttpGet("OneTimeBookings", Name = "OneTimeBookings")]
        public ActionResult<IEnumerable<OneTimeBookingDTO>> GetOneTimeBookings(int StadiumID, DateTime Date, int? BookingStatusID = null)
        {
            var bookings = FootballStadiumAPIBusiness.BookingBusiness.GetOneTimeBookings(StadiumID, Date, BookingStatusID);

            if (!bookings.Any())
                return NotFound("No Bookings Found!");

            return Ok(bookings);
        }
        [HttpGet("ConstantBookings", Name = "ConstantBookings")]
        public ActionResult<IEnumerable<ConstantBookingDTO>> GetConstantBookings(int StadiumID, string WeekDay, int? WeekNumber = null, int? BookingStatusID = null)
        {
            var bookings = FootballStadiumAPIBusiness.BookingBusiness.GetConstantBookings(StadiumID, WeekDay, WeekNumber, BookingStatusID);

            if (!bookings.Any())
                return NotFound("No Bookings Found!");

            return Ok(bookings);
        }

    }
}
