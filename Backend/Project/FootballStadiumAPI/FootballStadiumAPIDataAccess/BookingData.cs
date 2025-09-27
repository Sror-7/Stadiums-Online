using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FootballStadiumAPIDataAccess.DTO;

namespace FootballStadiumAPIDataAccess
{
    public class BookingData
    {
        public static bool IsOneTimeBookingAvailable(int stadiumId, DateTime date, TimeSpan startTime, int duration)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_IsOneTimeBookingAvailable", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumId);
                    cmd.Parameters.AddWithValue("@Date", date.Date);
                    cmd.Parameters.AddWithValue("@StartTime", startTime);
                    cmd.Parameters.AddWithValue("@Duration", duration);

                    conn.Open();
                    var result = cmd.ExecuteScalar();
                    return Convert.ToInt32(result) == 1;
                }
            }
        }

        public static bool IsConstantBookingAvailable(int stadiumId, string weekDay, int? weekNumber, TimeSpan startTime, int duration, bool isPermanent)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_IsConstantBookingAvailable", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumId);
                    cmd.Parameters.AddWithValue("@WeekDay", weekDay);
                    cmd.Parameters.AddWithValue("@StartTime", startTime);
                    cmd.Parameters.AddWithValue("@Duration", duration);
                    cmd.Parameters.AddWithValue("@IsPermanent", isPermanent);

                    if (weekNumber.HasValue)
                        cmd.Parameters.AddWithValue("@WeekNumber", weekNumber.Value);
                    else
                        cmd.Parameters.AddWithValue("@WeekNumber", DBNull.Value);

                    conn.Open();
                    var result = cmd.ExecuteScalar();
                    return Convert.ToInt32(result) == 1;
                }
            }
        }

        public static List<ConstantBookingDTO> GetConstantBookingsListByStadiumIDAndWeekDay(int stadiumID, string WeekDay)
        {
            var bookingsList = new List<ConstantBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetConstantBookingsListByStadiumIDAndWeekDay", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
                    cmd.Parameters.AddWithValue("@WeekDay", WeekDay);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(
                            new ConstantBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                StadiumID = stadiumID,
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                WeekDay = WeekDay,
                                WeekNumber = reader.IsDBNull(reader.GetOrdinal("WeekNumber")) ? null : reader.GetInt32(reader.GetOrdinal("WeekNumber")) ,
                                Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? null : reader.GetDateTime(reader.GetOrdinal("Date")),
                                StartDate = reader.IsDBNull(reader.GetOrdinal("StartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                IsPermanent = reader.GetBoolean(reader.GetOrdinal("IsPermanent")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),

                            }
                            )
                                ;
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<ConstantBookingDTO> GetConstantBookingsListByStadiumIDAndDate(int stadiumID, DateTime Date)
        {
            var bookingsList = new List<ConstantBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetConstantBookingsListByStadiumIDAndDate", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
                    cmd.Parameters.AddWithValue("@Date", Date);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(
                            new ConstantBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                StadiumID = stadiumID,
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                WeekDay = reader.GetString(reader.GetOrdinal("WeekDay")),
                                WeekNumber = reader.IsDBNull(reader.GetOrdinal("WeekNumber")) ? null : reader.GetInt32(reader.GetOrdinal("WeekNumber")) ,
                                Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? null : reader.GetDateTime(reader.GetOrdinal("Date")),
                                StartDate = reader.IsDBNull(reader.GetOrdinal("StartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                IsPermanent = reader.GetBoolean(reader.GetOrdinal("IsPermanent")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),

                            }
                            )
                                ;
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<OneTimeBookingDTO> GetOneTimeBookingsListByStadiumIDAndDate(int stadiumID, DateTime Date)
        {
            var bookingsList = new List<OneTimeBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetOneTimeBookingsListByStadiumIDAndDate", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
                    cmd.Parameters.AddWithValue("@Date", Date);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(
                            new OneTimeBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                StadiumID = stadiumID,
                                Date = Date,
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),

                            }
                            )
                                ;
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<ConstantBookingDTO> GetConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber(int stadiumID,string WeekDay, int WeekNumber)
        {
            var bookingsList = new List<ConstantBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
                    cmd.Parameters.AddWithValue("@WeekNumber", WeekNumber);
                    cmd.Parameters.AddWithValue("@WeekDay", WeekDay);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(
                            new ConstantBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                StadiumID = stadiumID,
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                WeekDay = WeekDay,
                                WeekNumber = WeekNumber,
                                StartDate = reader.IsDBNull(reader.GetOrdinal("StartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                IsPermanent = reader.GetBoolean(reader.GetOrdinal("IsPermanent")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),

                            }
                            )
                                ;
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<ConstantBookingDTO> GetUpcomingConstantBookingsByUserID(int userID)
        {
            var bookingsList = new List<ConstantBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpcomingConstantBookingsByUserID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userID);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(
                                new ConstantBookingDTO
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                    StadiumID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                    CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                    WeekDay =reader.GetString(reader.GetOrdinal("WeekDay")),
                                    WeekNumber = reader.IsDBNull(reader.GetOrdinal("WeekNumber")) ? null : reader.GetInt32(reader.GetOrdinal("WeekNumber")),
                                    StartDate = reader.IsDBNull(reader.GetOrdinal("StartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                    IsPermanent = reader.GetBoolean(reader.GetOrdinal("IsPermanent")),
                                    StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                    Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                    BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                    CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                }
                            );
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<OneTimeBookingDTO> GetUpcomingOneTimeBookingsByUserID(int userID)
        {
            var bookingsList = new List<OneTimeBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpcomingOneTimeBookingsByUserID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userID);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(
                                new OneTimeBookingDTO
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                    StadiumID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                    CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                    Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                                    StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                    Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                    BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                    CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                }
                            );
                        }
                    }
                }
            }

            return bookingsList;
        }

        //public static List<BookingDTO> GetBookingsListByStadiumIDAndDate(int stadiumID, DateTime? Date)
        //{
        //    var bookingsList = new List<BookingDTO>();

        //    using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("SP_GetBookingsListByStadiumIDAndDate", conn))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
        //            cmd.Parameters.AddWithValue("@Date", Date);

        //            conn.Open();

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                while (reader.Read())
        //                {
        //                    bookingsList.Add(new BookingDTO
        //                    (
        //                        reader.GetInt32(reader.GetOrdinal("ID")),
        //                        //reader.GetInt32(reader.GetOrdinal("StadiumID")),
        //                        stadiumID,
        //                        reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
        //                        reader.GetString(reader.GetOrdinal("BookingStatus")),
        //                        reader.GetDateTime(reader.GetOrdinal("Date")),
        //                        reader.GetTimeSpan(reader.GetOrdinal("Time")),
        //                        reader.GetDateTime(reader.GetOrdinal("CreatedDate"))
        //                    ));
        //                }
        //            }
        //        }
        //    }

        //    return bookingsList;
        //}
        //public static List<BookingStatusDTO> GetAllBookingsStatus()
        //{
        //    var bookingsStatusList = new List<BookingStatusDTO>();

        //    using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("SP_GetAllBookingsStatus", conn))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            conn.Open();

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                while (reader.Read())
        //                {
        //                    bookingsStatusList.Add(new BookingStatusDTO
        //                    {
        //                        StatusID = reader.GetInt32(reader.GetOrdinal("ID")),
        //                        Status = reader.GetString(reader.GetOrdinal("Status"))
        //                    });
        //                }
        //            }
        //        }
        //    }

        //    return bookingsStatusList;
        //}

        public static int AddNewOneTimeBooking(OneTimeBookingCreateDTO newBooking, int UserID)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_AddNewOneTimeBooking", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", newBooking.StadiumID);
                    cmd.Parameters.AddWithValue("@CreatedByUserID", UserID);
                    cmd.Parameters.AddWithValue("@Date", newBooking.Date);
                    cmd.Parameters.AddWithValue("@StartTime", newBooking.StartTime);
                    cmd.Parameters.AddWithValue("@Duration", newBooking.Duration);
                    SqlParameter outputIdParam = new SqlParameter("@NewOneTimeBookingID", SqlDbType.Int)
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
        public static int AddNewConstantBooking(ConstantBookingCreateDTO newBooking, int UserID)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_AddNewConstantBooking", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", newBooking.StadiumID);
                    cmd.Parameters.AddWithValue("@CreatedByUserID", UserID);
                    cmd.Parameters.AddWithValue("@WeekDay", newBooking.WeekDay);
                    cmd.Parameters.AddWithValue("@WeekNumber", newBooking.WeekNumber == null ? DBNull.Value : newBooking.WeekNumber);
                    cmd.Parameters.AddWithValue("@Date", newBooking.Date == null ? DBNull.Value : newBooking.Date);
                    cmd.Parameters.AddWithValue("@IsPermanent", newBooking.IsPermanent);
                    cmd.Parameters.AddWithValue("@StartTime", newBooking.StartTime);
                    cmd.Parameters.AddWithValue("@Duration", newBooking.Duration);
                    SqlParameter outputIdParam = new SqlParameter("@NewConstantBookingID", SqlDbType.Int)
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
        //public static int AddNewBooking(BookingCreateDTO newBooking)
        //{
        //    int insertedId = -1;

        //    using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("SP_AddNewBooking", conn))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            cmd.Parameters.AddWithValue("@StadiumID", newBooking.StadiumID);
        //            cmd.Parameters.AddWithValue("@CreatedByUserID", newBooking.CreatedByUserID);
        //            cmd.Parameters.AddWithValue("@BookingStatusID", 1);
        //            cmd.Parameters.AddWithValue("@Date", newBooking.Date);
        //            cmd.Parameters.AddWithValue("@Time", newBooking.Time);
        //            //cmd.Parameters.AddWithValue("@CreatedDate", DateTime.Now);

        //            SqlParameter outputIdParam = new SqlParameter("@NewBookingID", SqlDbType.Int)
        //            {
        //                Direction = ParameterDirection.Output
        //            };
        //            cmd.Parameters.Add(outputIdParam);

        //            conn.Open();
        //            cmd.ExecuteNonQuery();

        //            insertedId = Convert.ToInt32(outputIdParam.Value);
        //        }
        //    }

        //    return insertedId;
        //}
        public static bool UpdateBookingStatus(int BookingID, int BookingStatusID)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdateBookingStatusByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@BookingID", BookingID);
                    cmd.Parameters.AddWithValue("@BookingStatusID", BookingStatusID);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
        public static List<ConstantBookingDTO> GetConstantBookingsByUserIDAndStatus(int userID, int statusID)
        {
            var bookingsList = new List<ConstantBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetConstantBookingsByUserIDAndStatus", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userID);
                    cmd.Parameters.AddWithValue("@StatusID", statusID);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(new ConstantBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                StadiumID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                WeekDay = reader.GetString(reader.GetOrdinal("WeekDay")),
                                WeekNumber = reader.IsDBNull(reader.GetOrdinal("WeekNumber")) ? null : reader.GetInt32(reader.GetOrdinal("WeekNumber")),
                                StartDate = reader.IsDBNull(reader.GetOrdinal("StartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                IsPermanent = reader.GetBoolean(reader.GetOrdinal("IsPermanent")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                            });
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<OneTimeBookingDTO> GetOneTimeBookingsByUserIDAndStatus(int userID, int statusID)
        {
            var bookingsList = new List<OneTimeBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetOneTimeBookingsByUserIDAndStatus", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userID);
                    cmd.Parameters.AddWithValue("@StatusID", statusID);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(new OneTimeBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                StadiumID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                            });
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<OneTimeBookingDTO> GetOneTimeBookingsByStadiumIDAndDate(int stadiumID, DateTime date, int? bookingStatusID = null)
        {
            var bookingsList = new List<OneTimeBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_OneTime_GetByDateAndStatus", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
                    cmd.Parameters.AddWithValue("@Date", date);

                    if (bookingStatusID.HasValue)
                        cmd.Parameters.AddWithValue("@BookingStatusID", bookingStatusID.Value);
                    else
                        cmd.Parameters.AddWithValue("@BookingStatusID", DBNull.Value);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(new OneTimeBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                StadiumID = stadiumID,
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"))
                            });
                        }
                    }
                }
            }

            return bookingsList;
        }
        public static List<ConstantBookingDTO> GetConstantBookingsByStadiumIDWeekDayAndWeekNumber(
    int stadiumID, string weekDay, int? weekNumber = null, int? bookingStatusID = null)
        {
            var bookingsList = new List<ConstantBookingDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_Constant_GetByWeekAndStatus", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", stadiumID);
                    cmd.Parameters.AddWithValue("@WeekDay", weekDay);

                    if (weekNumber.HasValue)
                        cmd.Parameters.AddWithValue("@WeekNumber", weekNumber.Value);
                    else
                        cmd.Parameters.AddWithValue("@WeekNumber", DBNull.Value);

                    if (bookingStatusID.HasValue)
                        cmd.Parameters.AddWithValue("@BookingStatusID", bookingStatusID.Value);
                    else
                        cmd.Parameters.AddWithValue("@BookingStatusID", DBNull.Value);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bookingsList.Add(new ConstantBookingDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("BookingID")),
                                StadiumID = stadiumID,
                                CreatedByUserID = reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                                WeekDay = reader.GetString(reader.GetOrdinal("WeekDay")),
                                WeekNumber = reader.IsDBNull(reader.GetOrdinal("WeekNumber")) ? null : reader.GetInt32(reader.GetOrdinal("WeekNumber")),
                                Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? null : reader.GetDateTime(reader.GetOrdinal("Date")),
                                StartDate = reader.IsDBNull(reader.GetOrdinal("StartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                IsPermanent = reader.GetBoolean(reader.GetOrdinal("IsPermanent")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("StartTime")),
                                Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                                BookingStatus = reader.GetString(reader.GetOrdinal("BookingStatus")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"))
                            });
                        }
                    }
                }
            }

            return bookingsList;
        }

    }
}

