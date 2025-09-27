using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIDataAccess.DTO
{
    public class BookingDTO
    {
    }
        public class TimeSlot
        {
            public TimeSpan StartTime { get; set; }
            public int Duration { get; set; }
        }
        public class BookingsBookingStatusDTO()
        {
            public int StatusID { get; set; }
            public string Status { get; set; }
        }
        public class BookingStatusUpdateDTO
        {
            public int BookingID { get; set; }
            public int StatusID { get; set; }
        }
        public interface IBooking
        {
            int ID { get; set; }
            string BookingType { get; set; }
            TimeSpan StartTime { get; set; }
            int Duration { get; set; }
            int StadiumID { get; set; }
            string BookingStatus { get; set; }
            int CreatedByUserID { get; set; }
            DateTime CreatedDate { get; set; }
        }
        public class ConstantBookingDTO : IBooking
        {
            public int ID { get; set; }
            public string BookingType { get; set; }
            public TimeSpan StartTime { get; set; }
            public int Duration { get; set; }
            public int StadiumID { get; set; }
            public string BookingStatus { get; set; }
            public int CreatedByUserID { get; set; }
            public DateTime CreatedDate { get; set; }

            // خصائص إضافية للـ ConstantBooking
            public string WeekDay { get; set; }
            public int? WeekNumber { get; set; }
            public DateTime? Date { get; set; }
            public DateTime? StartDate { get; set; }
            public bool IsPermanent { get; set; }
        }

        public class OneTimeBookingDTO : IBooking
        {
            public int ID { get; set; }
            public string BookingType { get; set; }
            public TimeSpan StartTime { get; set; }
            public int Duration { get; set; }
            public int StadiumID { get; set; }
            public string BookingStatus { get; set; }
            public int CreatedByUserID { get; set; }
            public DateTime CreatedDate { get; set; }

            // خصائص إضافية للـ OneTimeBooking
            public DateTime Date { get; set; }
        }

        public interface IBookingCreate
        {
            int StadiumID { get; set; }
            TimeSpan StartTime { get; set; }
            int Duration { get; set; }
        }
        public class OneTimeBookingCreateDTO : IBookingCreate
        {
            public int StadiumID { get; set; }
            public DateTime Date { get; set; }
            public TimeSpan StartTime { get; set; }
            public int Duration { get; set; }
        }
        public class ConstantBookingCreateDTO : IBookingCreate
        {
            public int StadiumID { get; set; }
            public string WeekDay { get; set; }
            public DateTime? Date { get; set; }
            public int? WeekNumber { get; set; }
            public bool IsPermanent { get; set; }
            public TimeSpan StartTime { get; set; }

            public int Duration { get; set; }
        }
    }

