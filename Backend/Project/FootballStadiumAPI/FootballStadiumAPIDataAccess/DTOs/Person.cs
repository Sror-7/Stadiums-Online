using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIDataAccess.DTOs
{
    public class PersonBaseDTO
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
    }

    public class PersonCreateDTO : PersonBaseDTO
    {
        public IFormFile? ProfilePicture { get; set; }
    }
    public class NewPersonCreateDTO
    {
        public string Name { get; set; }
    }

    public class PersonUpdateDTO : PersonCreateDTO
    {
        public int ID { get; set; }
    }

    public class PersonDTO : PersonBaseDTO
    {
        public int ID { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ImageURL { get; set; }
    }

}
