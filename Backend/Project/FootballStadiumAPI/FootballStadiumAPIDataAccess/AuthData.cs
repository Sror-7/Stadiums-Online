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

    public class AuthData
    {
        public static UserDTO GetUserInfoByUsernameAndPassword(string Username, string Password)
        {

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetUserInfoByUsernameAndPassword", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", Username);
                    cmd.Parameters.AddWithValue("@Password", Password);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int ID = reader.GetInt32(reader.GetOrdinal("ID"));
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
    }
}
