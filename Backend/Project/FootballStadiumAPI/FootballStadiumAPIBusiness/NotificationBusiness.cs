using FootballStadiumAPIDataAccess;
using FootballStadiumAPIDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace FootballStadiumAPIBusiness
{
    public class NotificationBusiness
    {
        public enum enNotificationTitles
        {
            BookingAdded,
            BookingAccepted,
            BookingRejected,
            BookingCancelled, BookingReminder
        }
        public static bool SendNotification(
            int userId,
            string type,
            string title,
            int sourceId,
            string sourceType = null,
            Dictionary<string, string> placeholders = null,
            string defaultIfMissing = "") 
        {

            var template = NotificationData.GetTemplate(type, title);
            if (template == null)
                return false; 


            string content = template.Content;


            if (placeholders != null)
            {
                foreach (var placeholder in placeholders)
                {
                   
                    content = content.Replace("{" + placeholder.Key + "}", placeholder.Value ?? defaultIfMissing);
                }
            }
            else
                content = System.Text.RegularExpressions.Regex.Replace(content, @"\{.*?\}", defaultIfMissing);


            Notification notification = new Notification
            {
                UserID = userId,
                SourceID = sourceId,
                SourceType = sourceType ?? template.SourceType,
                Type = template.Type,
                Content = content,
            };

            NotificationData.Add(notification);

            return true;
        }
        public static List<Notification> GetAllNotifications(int userID)
        {
            return NotificationData.GetAllNotifications(userID);
        }
        public static bool DeleteNotification(int notificationId)
        {
            return NotificationData.DeleteNotification(notificationId);
        }

        public static int CountUnreadNotifications(int userId)
        {
            return NotificationData.CountUnreadNotifications(userId);
        }
        public static void MarkAllAsRead(int userID)
        {
            NotificationData.MarkAllAsRead(userID);
        }

        public static bool MarkNotificationAsRead(int notificationId)
        {
            return NotificationData.MarkNotificationAsRead(notificationId);
        }


    }
}
