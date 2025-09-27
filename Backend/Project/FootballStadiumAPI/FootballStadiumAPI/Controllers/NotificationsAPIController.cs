using FootballStadiumAPIBusiness;
using FootballStadiumAPIDataAccess.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FootballStadiumAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/Notification")]
    [ApiController]
    public class NotificationsAPIController : ControllerBase
    {
        [HttpGet("All", Name = "GetAllNotifications")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize]
        public ActionResult<IEnumerable<Notification>> GetAllNotifications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            List<Notification> Notifications = FootballStadiumAPIBusiness.NotificationBusiness.GetAllNotifications(int.Parse(userId));
            if (Notifications.Count == 0)
            {
                return NotFound("No notification found!");
            }
            return Ok(Notifications);
        }
        [HttpDelete("Delete/{id}", Name = "DeleteNotification")]
        [Authorize]
        public IActionResult DeleteNotification(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("Invalid token");

            bool deleted = NotificationBusiness.DeleteNotification(id);
            if (!deleted) return NotFound("Notification not found or could not be deleted.");

            return Ok("Notification deleted successfully.");
        }

        [HttpPut("MarkAsRead/{id}", Name = "MarkNotificationAsRead")]
        public IActionResult MarkNotificationAsRead(int id)
        {

            bool updated = NotificationBusiness.MarkNotificationAsRead(id);
            if (!updated) return NotFound("Notification not found or could not be updated.");

            return Ok("Notification marked as read successfully.");
        }

        [HttpGet("CountUnread", Name = "CountUnreadNotifications")]
        [Authorize]
        public IActionResult CountUnreadNotifications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("Invalid token");

            int count = NotificationBusiness.CountUnreadNotifications(int.Parse(userId));
            return Ok(new { unreadCount = count });
        }
        [HttpPut("MarkAllAsRead", Name = "MarkAllNotificationsAsRead")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize]
        public IActionResult MarkAllAsRead()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            FootballStadiumAPIBusiness.NotificationBusiness.MarkAllAsRead(int.Parse(userId));
            return Ok(new { message = "All notifications marked as read." });
        }

    }
}