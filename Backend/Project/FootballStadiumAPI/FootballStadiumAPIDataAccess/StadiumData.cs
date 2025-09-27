using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Data;
using FootballStadiumAPIDataAccess.DTOs;
namespace FootballStadiumAPIDataAccess
{

    public class StadiumData
    {

        public static List<StadiumDTO> GetAllStadiums()
        {
            var StadiumList = new List<StadiumDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetAllStadiums", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            StadiumList.Add(new StadiumDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("Id")),
                                OwnerID = reader.GetInt32(reader.GetOrdinal("OwnerID")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Country = reader.GetString(reader.GetOrdinal("Country")),
                                City = reader.GetString(reader.GetOrdinal("City")),
                                Description= reader.GetString(reader.GetOrdinal("Description")),
                                Phone = reader.GetString(reader.GetOrdinal("Phone")),
                                PhoneCode = reader.GetString(reader.GetOrdinal("PhoneCode")),
                                Email=reader.GetString(reader.GetOrdinal("Email")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"))
                            });
                        }
                    }
                }


                return StadiumList;
            }

        }
        public static List<StadiumInfoWithSettingsDTO> GetAllStadiumsWithSettings()
        {
            var stadiumsWithSettings = new List<StadiumInfoWithSettingsDTO>();

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetAllStadiumsWithSettings", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var stadium = new StadiumDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                OwnerID = reader.GetInt32(reader.GetOrdinal("OwnerID")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Country = reader.GetString(reader.GetOrdinal("Country")),
                                City = reader.GetString(reader.GetOrdinal("City")),
                                Address = reader.GetString(reader.GetOrdinal("Address")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                              ? null
                                              : reader.GetString(reader.GetOrdinal("Description")),
                                Phone = reader.GetString(reader.GetOrdinal("Phone")),
                                PhoneCode = reader.GetString(reader.GetOrdinal("PhoneCode")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageUrl = reader.IsDBNull(reader.GetOrdinal("ImageUrl"))
                                           ? null
                                           : reader.GetString(reader.GetOrdinal("ImageUrl")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"))
                            };

                            StadiumBookingSettingsDTO bookingSettings = null;

                            if (!reader.IsDBNull(reader.GetOrdinal("BookingSettingsID")))
                            {
                                bookingSettings = new StadiumBookingSettingsDTO
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("BookingSettingsID")),
                                    StadiumID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                    IsAvailableForBookings = reader.GetBoolean(reader.GetOrdinal("IsAvailableForBookings")),
                                    PricePerHour = reader.GetDecimal(reader.GetOrdinal("PricePerHour"))
                                };
                            }

                            stadiumsWithSettings.Add(new StadiumInfoWithSettingsDTO
                            {
                                StadiumInfo = stadium,
                                SettingsInfo = bookingSettings
                            });
                        }
                    }
                }
            }

            return stadiumsWithSettings;
        }


        public static StadiumBookingSettingsDTO GetBookingSettingsByStadiumID(int StadiumID)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetBookingSettingsByStadiumID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", StadiumID);
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new StadiumBookingSettingsDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                StadiumID = reader.GetInt32(reader.GetOrdinal("StadiumID")),
                                IsAvailableForBookings = reader.GetBoolean(reader.GetOrdinal("IsAvailableForBookings")),
                                PricePerHour = reader.GetDecimal(reader.GetOrdinal("PricePerHour")),


                            };
                        }
                    }
                }


                return null;
            }

        }
        public static StadiumDTO GetStadiumInfoByID(int StadiumID)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetStadiumInfoByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumID", StadiumID);
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new StadiumDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("Id")),
                                OwnerID = reader.GetInt32(reader.GetOrdinal("OwnerID")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Country = reader.GetString(reader.GetOrdinal("Country")),
                                City = reader.GetString(reader.GetOrdinal("City")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? "" : reader.GetString(reader.GetOrdinal("Description")),
                                Phone =  reader.GetString(reader.GetOrdinal("Phone")),
                                PhoneCode = reader.GetString(reader.GetOrdinal("PhoneCode")),
                                Email =  reader.GetString(reader.GetOrdinal("Email")),
                                ImageUrl = reader.IsDBNull(reader.GetOrdinal("ImageUrl")) ? null : reader.GetString(reader.GetOrdinal("ImageUrl")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),


                            };
                        }
                    }
                }


                return null;
            }

        }
        public static StadiumDTO GetStadiumInfoByOwnerID(int OwnerID)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetStadiumInfoByOwnerID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@OwnerID", OwnerID);
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new StadiumDTO
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("Id")),
                                OwnerID = OwnerID,
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Country = reader.GetString(reader.GetOrdinal("Country")),
                                City = reader.GetString(reader.GetOrdinal("City")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? "" : reader.GetString(reader.GetOrdinal("Description")),
                                Phone =  reader.GetString(reader.GetOrdinal("Phone")),
                                PhoneCode =  reader.GetString(reader.GetOrdinal("PhoneCode")),
                                Email =  reader.GetString(reader.GetOrdinal("Email")),
                                ImageUrl = reader.IsDBNull(reader.GetOrdinal("ImageUrl")) ? null : reader.GetString(reader.GetOrdinal("ImageUrl")),
                                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                

                            };
                        }
                    }
                }


                return null;
            }

        }

        public static int AddNewStadium(StadiumCreateDTO newStadium)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_AddNewStadium", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@OwnerID", newStadium.OwnerID);
                    cmd.Parameters.AddWithValue("@Name", newStadium.Name);
                    cmd.Parameters.AddWithValue("@Country", newStadium.Country);
                    cmd.Parameters.AddWithValue("@City", newStadium.City);
                    cmd.Parameters.AddWithValue("@Address", newStadium.Address);
                    cmd.Parameters.AddWithValue("@Description", newStadium.Description);
                    cmd.Parameters.AddWithValue("@Email", newStadium.Email);
                    cmd.Parameters.AddWithValue("@Phone", newStadium.Phone);
                    cmd.Parameters.AddWithValue("@PhoneCode", newStadium.PhoneCode);


                    SqlParameter outputIdParam = new SqlParameter("@NewStadiumID", SqlDbType.Int)
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
        public static bool IsStadiumNameAvailable(string StadiumName, int? StadiumID = null)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_CheckStadiumNameAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StadiumName", StadiumName);

                    if (StadiumID.HasValue)
                        cmd.Parameters.AddWithValue("@UserID", StadiumID.Value);
                    else
                        cmd.Parameters.AddWithValue("@StadiumID", DBNull.Value);

                    conn.Open();

                    object result = cmd.ExecuteScalar();

                    if (result != null && int.TryParse(result.ToString(), out int isAvailable))
                    {
                        return isAvailable == 1;
                    }
                }
                return false;
            }

        }
        public static bool UpdateStadiumInfo(int StadiumID, StadiumUpdateDTO stadium)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdateStadiumInfoByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", StadiumID);
                    cmd.Parameters.AddWithValue("@Name", stadium.Name);
                    cmd.Parameters.AddWithValue("@Country", stadium.Country);
                    cmd.Parameters.AddWithValue("@City", stadium.City);
                    cmd.Parameters.AddWithValue("@Description", stadium.Description);
                    cmd.Parameters.AddWithValue("@Phone", stadium.Phone);
                    cmd.Parameters.AddWithValue("@PhoneCode", stadium.PhoneCode);
                    cmd.Parameters.AddWithValue("@Email", stadium.Email);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
        public static bool UpdateStadiumImage(int id, string? imageUrl)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdateStadiumImageUrlByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@ImageUrl", imageUrl ?? (object)DBNull.Value);

                    conn.Open();
                    
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public static bool UpdateStadiumBookingSettings(StadiumBookingSettingsDTO settings)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdateStadiumBookingSettings", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", settings.ID);
                    //cmd.Parameters.AddWithValue("@StadiumID", settings.StadiumID);
                    cmd.Parameters.AddWithValue("@IsAvailableForBookings", settings.IsAvailableForBookings);
                    cmd.Parameters.AddWithValue("@PricePerHour", settings.PricePerHour);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }


    }
}
