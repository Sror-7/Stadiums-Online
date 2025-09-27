using FootballStadiumAPIDataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using FootballStadiumAPIDataAccess.DTOs;

namespace FootballStadiumAPIBusiness
{
    public class StadiumBusiness
    {
        public readonly CloudinaryService _cloudinaryService;
        public StadiumBusiness(CloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }
        public StadiumBusiness ()
        {

        }
        public static List<StadiumDTO> GetAllStadiums()
        {
            return StadiumData.GetAllStadiums();
        }
        public static List<StadiumInfoWithSettingsDTO> GetAllStadiumsWithSettings()
        {
            return StadiumData.GetAllStadiumsWithSettings();
        }
        public static StadiumDTO Find(int StadiumID)
        {
            return StadiumData.GetStadiumInfoByID(StadiumID);
        }
        public static StadiumDTO FindByOwnerID(int OwnerID)
        {
            return StadiumData.GetStadiumInfoByOwnerID(OwnerID);
        }
        public static StadiumBookingSettingsDTO GetStadiumSettings(int StadiumID)
        {
            return StadiumData.GetBookingSettingsByStadiumID(StadiumID);
        }
        public static StadiumInfoWithSettingsDTO GetStadiumInfoWithSettingsSettingsByID(int StadiumID)
        {
            StadiumDTO stadium = StadiumData.GetStadiumInfoByID(StadiumID);
            StadiumBookingSettingsDTO bookingSettingsDTO = StadiumData.GetBookingSettingsByStadiumID(StadiumID);

            StadiumInfoWithSettingsDTO stadiumInfoWithSettings = new StadiumInfoWithSettingsDTO
            {
                StadiumInfo = stadium,
                SettingsInfo = bookingSettingsDTO,
            };
            return stadiumInfoWithSettings;
        }
        public static bool UpdateStadiumBookingSettings(StadiumBookingSettingsDTO Settings)
        {
            return StadiumData.UpdateStadiumBookingSettings(Settings);
        }
        public async Task<Result<bool>> UpdateStadiumImage(int id, IFormFile? StadiumImage)
        {
            string pictureUrl = null;

            if (StadiumImage != null)
            {
                pictureUrl = await _cloudinaryService.UploadImageAsync(StadiumImage);

            }

            var updated = StadiumData.UpdateStadiumImage(id, pictureUrl);

            return updated
                ? Result<bool>.Ok(true)
                : Result<bool>.Fail("Update failed");
        }

        public async Task<int> AddNewStadium(StadiumCreateDTO newStadium)
        {
            var user = UserBusiness.Find(newStadium.OwnerID);
            if (user == null)
                return -1;

            int stadiumId = StadiumData.AddNewStadium(newStadium);
            if (stadiumId == -1)
                return -1;

            UserBusiness.ChangeUserRole(user.ID, UserBusiness.enRoles.StadiumOwner);
            return stadiumId;

        }
        public static bool IsStadiumNameAvailable(string StadiumName, int? StadiumID)
        {
            return StadiumData.IsStadiumNameAvailable(StadiumName, StadiumID);
        }
        public async Task<Result<bool>> PatchStadiumBookingSettingsAsync(int stadiumID, JsonPatchDocument<StadiumBookingSettingsDTO> patchDoc)
        {

            var stadiumBookingSettings = StadiumData.GetBookingSettingsByStadiumID(stadiumID);
            
            if (stadiumBookingSettings == null)
                return Result<bool>.Fail("Booking Settings not found!");


            var dto = new StadiumBookingSettingsDTO
            {
                ID = stadiumBookingSettings.ID,
                StadiumID = stadiumID,
                IsAvailableForBookings = stadiumBookingSettings.IsAvailableForBookings,
                PricePerHour = stadiumBookingSettings.PricePerHour
            };


            patchDoc.ApplyTo(dto);


            stadiumBookingSettings.IsAvailableForBookings = dto.IsAvailableForBookings;
            stadiumBookingSettings.PricePerHour = dto.PricePerHour;


            var updated = StadiumData.UpdateStadiumBookingSettings(stadiumBookingSettings);

            return updated
                ? Result<bool>.Ok(true)
                : Result<bool>.Fail("Update failed");
        }
        public async Task<Result<bool>> PatchStadiumAsync(int ID, JsonPatchDocument<StadiumUpdateDTO> patchDoc)
        {

            var stadium = StadiumData.GetStadiumInfoByID(ID);
            if (stadium == null)
                return Result<bool>.Fail("Stadium not found!");


            var dto = new StadiumUpdateDTO
            {
                Name = stadium.Name,
                Country = stadium.Country,
                City = stadium.City,
                Description = stadium.Description,
                Email = stadium.Email,
                Phone = stadium.Phone,
                PhoneCode = stadium.PhoneCode,
                

            };


            patchDoc.ApplyTo(dto);



            var updated = StadiumData.UpdateStadiumInfo(ID,dto);

            return updated
                ? Result<bool>.Ok(true)
                : Result<bool>.Fail("Update failed");
        }



    }
}
