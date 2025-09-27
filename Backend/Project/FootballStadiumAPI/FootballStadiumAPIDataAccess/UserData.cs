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
    public class UserData
    {
        

        public static int AddNewUser(UserCreateDTO newUser)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_AddNewUser", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@PersonID", newUser.PersonID.HasValue ? newUser.PersonID.Value : DBNull.Value);
                    cmd.Parameters.AddWithValue("@Username", newUser.Username);
                    cmd.Parameters.AddWithValue("@Email", newUser.Email);
                    cmd.Parameters.AddWithValue("@Password", newUser.Password);

                    SqlParameter outputIdParam = new SqlParameter("@NewUserID", SqlDbType.Int)
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
        public static UserDTO GetUserInfoByID(int id)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetUserInfoByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int? personID = reader.IsDBNull(reader.GetOrdinal("PersonID")) ? null : reader.GetInt32(reader.GetOrdinal("PersonID"));
                            string Username = reader.GetString(reader.GetOrdinal("Username"));
                            string Email = reader.GetString(reader.GetOrdinal("Email"));
                            string Role = reader.GetString(reader.GetOrdinal("Role"));
                            DateTime CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"));

                            return new UserDTO(id, personID, Username, Email, Role, CreatedDate);
                        }
                    }
                }
            }
            return null;
        }
        public static string GetPasswordHashByUserID(int id)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            using (SqlCommand cmd = new SqlCommand("SP_GetUserPasswordByID", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);

                conn.Open();
                return cmd.ExecuteScalar() as string;
            }
        }

        public static UserDTO GetUserInfoByUsername(string Username)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetUserInfoByUsername", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", Username);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int ID =reader.GetInt32(reader.GetOrdinal("ID"));
                            int? personID = reader.IsDBNull(reader.GetOrdinal("PersonID")) ? null : reader.GetInt32(reader.GetOrdinal("PersonID"));
                            string Email = reader.GetString(reader.GetOrdinal("Email"));
                            string Role = reader.GetString(reader.GetOrdinal("Role"));
                            DateTime CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"));

                            return new UserDTO(ID, personID, Username, Email, Role, CreatedDate);
                        }
                    }
                }
            }
            return null;
        }
        public static UserDTO GetUserInfoByEmail(string Email)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetUserInfoByEmail", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", Email);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int ID =reader.GetInt32(reader.GetOrdinal("ID"));
                            int? personID = reader.IsDBNull(reader.GetOrdinal("PersonID")) ? null : reader.GetInt32(reader.GetOrdinal("PersonID"));
                            string Username = reader.GetString(reader.GetOrdinal("Username"));
                            string Role = reader.GetString(reader.GetOrdinal("Role"));
                            DateTime CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate"));

                            return new UserDTO(ID, personID, Username, Email, Role, CreatedDate);
                        }
                    }
                }
            }
            return null;
        }
        public static bool UpdateUser(UserUpdateDTO user)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdateUserInfoByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", user.ID);
                    cmd.Parameters.AddWithValue("@PersonID", user.PersonID);
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Email", user.Email);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
        public static bool ChangePassword(int id, string newPassword)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_ChangeUserPassword", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@Password", newPassword);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
        public static bool ChangeUserRoleByID(int id, int RoleID)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_ChangeUserRoleByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@RoleID", RoleID);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
        public static bool IsPasswordCorrect(int id, string password)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_IsPasswordCorrect", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@Password", password);

                    conn.Open();
                    var result = cmd.ExecuteScalar();

                    return result != null && Convert.ToInt32(result) == 1;
                }
            }
        }


        public static bool IsUsernameAvailable(string username, int? userId = null)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_CheckUsernameAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Username", username);

                    if (userId.HasValue)
                        cmd.Parameters.AddWithValue("@UserID", userId.Value);
                    else
                        cmd.Parameters.AddWithValue("@UserID", DBNull.Value);

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
        public static bool IsEmailAvailable(string email, int? userId = null)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_CheckEmailAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Email", email);

                    if (userId.HasValue)
                        cmd.Parameters.AddWithValue("@UserID", userId.Value);
                    else
                        cmd.Parameters.AddWithValue("@UserID", DBNull.Value);

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



    }
}
