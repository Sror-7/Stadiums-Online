using FootballStadiumAPIDataAccess;
using Helpers.Helpers;
using FootballStadiumAPIDataAccess.DTOs;

namespace FootballStadiumAPIBusiness
{
    public class AuthBusiness
    {
        //public enum enRoles { Admin=1,StadiumOnwer=2,Player=3,Guest=4 }
        //enRoles Roles = enRoles.Guest;
        private static readonly JwtBusiness _jwt = new JwtBusiness(GlobalSettings.Configuration);

        public static string Login(string Identifier, string password)
        {
            if (string.IsNullOrWhiteSpace(Identifier) || string.IsNullOrWhiteSpace(password))
                return null;
            Identifier = Identifier.ToLower();
            UserDTO user = null;

            if(Global.IsValidEmail(Identifier))
            {
                user = UserBusiness.FindByEmail(Identifier);
  
            }
            else
            {
                user = UserBusiness.FindByUsername(Identifier);

            }

            if (user == null)
                return null;


            var hashPassword = UserBusiness.GetPasswordHashByUserID(user.ID);
            if (string.IsNullOrEmpty(hashPassword))
                return null;

            if (PasswordHasher.VerifyPassword(password, hashPassword))
                return _jwt.GenerateToken(user.ID.ToString(), user.Role);

            return null;
        }

        public static string SignIn(SignInDTO newUser)
        {

            var personID = PersonBusiness.AddNewPerson(new NewPersonCreateDTO { Name=newUser.Name});

            var userID = UserBusiness.AddNewUser(new UserCreateDTO { PersonID = personID,Username=newUser.Username.ToLower(),Email =newUser.Email.ToLower(),Password =newUser.Password});

            return _jwt.GenerateToken(userID.ToString(), "Guest");
        }
    }
}
