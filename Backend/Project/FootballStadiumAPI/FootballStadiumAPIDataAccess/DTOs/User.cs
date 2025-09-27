using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIDataAccess.DTOs
{
    public class UserDTO
    {
        public int ID { get; set; }
        public int? PersonID { get; set; }
        public PersonDTO Person { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime CreatedDate { get; set; }
        public UserDTO(int id, int? perosnID, string username, string email, string Role, DateTime createdDate)
        {
            this.ID = id;
            this.PersonID = perosnID;
            if (perosnID != null)
            {
                this.Person = PersonData.GetPersonInfoByID(perosnID.Value);
            }
            this.Username = username;
            this.Email = email;
            this.Role = Role;
            this.CreatedDate = createdDate;
        }
    }
    public class UserCreateDTO
    {
        public int? PersonID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class UserUpdateDTO
    {
        public int ID { get; set; }
        public int? PersonID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        //public string Password { get; set; }
    }
    public class UpdateUserAndPersonDTO
    {
        public UserUpdateDTO User { get; set; }
        public PersonUpdateDTO Person { get; set; }
    }
    public class ChangePasswordDTO
    {
        public string Current { get; set; }
        public string NewPassword { get; set; }
    }
}
