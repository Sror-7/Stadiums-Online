using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;

using FootballStadiumAPIDataAccess.DTOs;
namespace FootballStadiumAPIDataAccess
{

    public class PersonData
    {
        public static PersonDTO GetPersonInfoByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_GetPersonInfoByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            string GetStringSafe(string columnName) =>
                                reader.IsDBNull(reader.GetOrdinal(columnName)) ? null : reader.GetString(reader.GetOrdinal(columnName));

                            DateTime GetDateTimeSafe(string columnName) =>
                                reader.IsDBNull(reader.GetOrdinal(columnName)) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal(columnName));

                            return new PersonDTO
                            {
                                ID = id,
                                Name = GetStringSafe("Name"),
                                Address = GetStringSafe("Address"),
                                Gender = GetStringSafe("Gender"),
                                ImageURL = GetStringSafe("ImageURL"),
                                Phone = GetStringSafe("Phone"),
                                DateOfBirth = GetDateTimeSafe("DateOfBirth"),
                                CreatedDate = GetDateTimeSafe("CreatedDate")
                            };
                        }
                    }
                }
            }
            return null;
        }
        public static bool UpdatePerson(PersonDTO person)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdatePersonInfoByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", person.ID);
                    cmd.Parameters.AddWithValue("@Name", person.Name);
                    cmd.Parameters.AddWithValue("@DateOfBirth", person.DateOfBirth);
                    cmd.Parameters.AddWithValue("@Gender", person.Gender);
                    cmd.Parameters.AddWithValue("@Phone", person.Phone ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Address", person.Address ?? (object)DBNull.Value);

                    conn.Open();
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
        public static bool UpdatePersonImage(int id, string? imageUrl)
        {
            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_UpdatePersonImageUrlByID", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@ImageUrl", imageUrl ?? (object)DBNull.Value);

                    conn.Open();

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public static int AddNewPerson(PersonDTO newPerson)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_AddNewPerson", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Name", newPerson.Name);
                    //cmd.Parameters.AddWithValue("@SecondName", newPerson.SecondName);
                    //cmd.Parameters.AddWithValue("@LastName", newPerson.LastName);
                    cmd.Parameters.AddWithValue("@Gender", newPerson.Gender);
                    cmd.Parameters.AddWithValue("@Phone", newPerson.Phone ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Address", newPerson.Address ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@ImageURL", newPerson.ImageURL ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@DateOfBirth", newPerson.DateOfBirth);

                    SqlParameter outputIdParam = new SqlParameter("@NewPersonID", SqlDbType.Int)
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
        public static int AddNewPerson(NewPersonCreateDTO newPerson)
        {
            int insertedId = -1;

            using (SqlConnection conn = new SqlConnection(SettingsData.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_AddNewPerson", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Name", newPerson.Name); 
                    cmd.Parameters.AddWithValue("@Gender",  (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Phone", (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Address",  (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@ImageURL",  (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@DateOfBirth",  (object)DBNull.Value);

                    SqlParameter outputIdParam = new SqlParameter("@NewPersonID", SqlDbType.Int)
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
