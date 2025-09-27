using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIDataAccess.DTOs
{
    public class LoginDto
    {
        public string Identifier { get; set; }
        public string Password { get; set; }
    }
    public class SignInDTO
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
