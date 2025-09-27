using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FootballStadiumAPIDataAccess.DTOs;
namespace FootballStadiumAPIDataAccess
{
    public class NotificationData
    {
        public static List<Notification> GetAllNotifications(int userID)
        {
            List<Notification> notifications = new List<Notification>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_GetAllByUser", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@UserID", userID);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var notification = new Notification
                            {
                                Id= reader.GetInt32(reader.GetOrdinal("ID")),
                                UserID = userID,
                                SourceID = reader.IsDBNull(reader.GetOrdinal("SourceId"))
                                    ? 0
                                    : reader.GetInt32(reader.GetOrdinal("SourceId")),
                                SourceType = reader.IsDBNull(reader.GetOrdinal("SourceType"))
                                    ? null
                                    : reader.GetString(reader.GetOrdinal("SourceType")),
                                Type = reader.IsDBNull(reader.GetOrdinal("Type"))
                                    ? null
                                    : reader.GetString(reader.GetOrdinal("Type")),

                                Content = reader.IsDBNull(reader.GetOrdinal("Content"))
                                    ? null
                                    : reader.GetString(reader.GetOrdinal("Content")),
                                IsRead = reader.GetBoolean(reader.GetOrdinal("IsRead")),
                                Trash = reader.GetBoolean(reader.GetOrdinal("Trash")),
                                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                                UpdatedAt = reader.IsDBNull(reader.GetOrdinal("UpdatedAt"))
                                    ? null
                                    : reader.GetDateTime(reader.GetOrdinal("UpdatedAt")),
                            };

                            notifications.Add(notification);
                        }
                    }
                }
            }

            return notifications;
        }
        public static bool MarkNotificationAsRead(int notificationId)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_MarkAsRead", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NotificationID", notificationId);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public static void MarkAllAsRead(int userID)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_MarkAllAsRead", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userID);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static int CountUnreadNotifications(int userId)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_CountUnreadByUser", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userId);

                    conn.Open();
                    object result = cmd.ExecuteScalar();
                    return result != null ? Convert.ToInt32(result) : 0;
                }
            }
        }

        public static bool DeleteNotification(int notificationId)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_Delete", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NotificationID", notificationId);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public static NotificationTemplate GetTemplate(string Type, string Title)
        {
            NotificationTemplate template = null;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_GetTemplateByTypeAndTitle", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Type", Type);
                    cmd.Parameters.AddWithValue("@Title", Title);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            template = new NotificationTemplate
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                Title = Title,
                                Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                    ? null
                                    : reader.GetString(reader.GetOrdinal("Description")),
                                SourceType = reader.IsDBNull(reader.GetOrdinal("SourceType"))
                                    ? null
                                    : reader.GetString(reader.GetOrdinal("SourceType")),
                                UpdatedAt = reader.IsDBNull(reader.GetOrdinal("UpdatedAt"))
                                    ? null
                                    : reader.GetDateTime(reader.GetOrdinal("UpdatedAt")),
                                Type = Type,
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                            };
                        }
                    }
                }
            }

            return template;
        }
        public static int Add(Notification notification)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Notification_Add", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@UserId", notification.UserID);


                    if (notification.SourceID != null)
                        cmd.Parameters.AddWithValue("@SourceID", notification.SourceID);
                    else
                        cmd.Parameters.AddWithValue("@SourceID", DBNull.Value);

                    if (!string.IsNullOrEmpty(notification.SourceType))
                        cmd.Parameters.AddWithValue("@SourceType", notification.SourceType);
                    else
                        cmd.Parameters.AddWithValue("@SourceType", DBNull.Value);

                    cmd.Parameters.AddWithValue("@Type", notification.Type);
                    cmd.Parameters.AddWithValue("@Content", notification.Content);

                    SqlParameter outputIdParam = new SqlParameter("@NewNotificationID", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(outputIdParam);

                    conn.Open();
                    cmd.ExecuteNonQuery();

                    insertedId = Convert.ToInt32(outputIdParam.Value);
                }
            }

            return insertedId;
        }

    }
}