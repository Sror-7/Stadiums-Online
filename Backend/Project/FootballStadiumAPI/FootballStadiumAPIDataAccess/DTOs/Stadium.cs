using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIDataAccess.DTOs
{
    public class StadiumDTO
    {
        public int ID { get; set; }

        public int OwnerID { get; set; }
        public string Name { get; set; }

        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public string Description { get; set; }
        public string Phone { get; set; }
        public string PhoneCode { get; set; }
        public string Email { get; set; }

        public string? ImageUrl { get; set; }
        public DateTime CreatedDate { get; set; }
    }
    public class StadiumBookingSettingsDTO
    {
        public int ID { get; set; }
        public int StadiumID { get; set; }
        public bool IsAvailableForBookings { get; set; }
        public decimal PricePerHour { get; set; }
    }
    public class StadiumInfoWithSettingsDTO
    {
        public StadiumDTO StadiumInfo { get; set; }
public StadiumBookingSettingsDTO SettingsInfo { get; set; }
    }
    public class StadiumCreateDTO
    {
        public int OwnerID { get; set; }
        public string Name { get; set; }

        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public string Description { get; set; }

        public string Phone { get; set; }
        public string PhoneCode { get; set; }
        public string Email { get; set; }
    }
    public class StadiumUpdateDTO
    {
        public string Name { get; set; }

        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string Phone { get; set; }
        public string PhoneCode { get; set; }
        public string Email { get; set; }
    }


}
