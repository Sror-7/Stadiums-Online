using FootballStadiumAPIDataAccess;
using Microsoft.OpenApi.Validations;
using System;
using System.Collections.Generic;
using FootballStadiumAPIDataAccess.DTOs;


namespace FootballStadiumAPIBusiness
{
    public class UserBusiness
    {
        public enum enRoles { Admin = 1, StadiumOwner = 2, Guest = 3 }
        public static int AddNewUser(UserCreateDTO newUser)
        {
            newUser.Password = PasswordHasher.HashPassword(newUser.Password);
            return UserData.AddNewUser(newUser);
        }
        public static UserDTO Find(int id)
        {
            return UserData.GetUserInfoByID(id);
        }
        public static UserDTO FindByUsername(string Username)
        {
            return UserData.GetUserInfoByUsername(Username);
        }
        public static UserDTO FindByEmail(string Email)
        {
            return UserData.GetUserInfoByEmail(Email);
        }
        public static bool UpdateUser(UserUpdateDTO dto)
        {
            return UserData.UpdateUser(dto); ;
        }
        public static bool ChangeUserRole(int UserID, enRoles Role)
        {
            return UserData.ChangeUserRoleByID(UserID, (int)Role);
        }
        public static bool IsUsernameAvailable(string username, int? userID = null)
        {
            return UserData.IsUsernameAvailable(username, userID);
        }
        public static bool IsEmailAvailable(string email, int? userID = null)
        {
            return UserData.IsEmailAvailable(email, userID);
        }
        public bool ChangeUserPassword(int id, ChangePasswordDTO changePassword)
        {
            if (IsPasswordCorrect(id, changePassword.Current))
                return UserData.ChangePassword(id, PasswordHasher.HashPassword(changePassword.NewPassword));

            return false;
          
        }
        public static string GetPasswordHashByUserID(int id)
        {
            return UserData.GetPasswordHashByUserID(id);
        }
        public bool IsPasswordCorrect(int id, string password)
        {
            var hashPassword = UserData.GetPasswordHashByUserID(id);

            if (string.IsNullOrEmpty(hashPassword))
                return false;

            return PasswordHasher.VerifyPassword(password, hashPassword);
        }

    }
}
