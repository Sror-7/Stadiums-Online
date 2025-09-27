using FootballStadiumAPIDataAccess;
using FootballStadiumAPIDataAccess.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
namespace FootballStadiumAPIBusiness
{
    public class BookingBusiness
    {
        public static List<IBooking> GetUpcomingBookingsByUserID(int userID)
    {
        var allBookings = new List<IBooking>();

        // جلب الحجوزات الثابتة
        var constantBookings = BookingData.GetUpcomingConstantBookingsByUserID(userID);
        allBookings.AddRange(constantBookings);

        // جلب الحجوزات لمرة واحدة
        var oneTimeBookings = BookingData.GetUpcomingOneTimeBookingsByUserID(userID);
        allBookings.AddRange(oneTimeBookings);

        // يمكن ترتيبهم حسب الوقت إذا بدك
        allBookings = allBookings.OrderBy(b => b.StartTime).ToList();

        return allBookings;
    }
        public static List<OneTimeBookingDTO> GetOneTimeBookingsListByStadiumIDAndDate(
            int stadiumID, DateTime date, int duration)
        {
            var bookings = BookingData.GetOneTimeBookingsListByStadiumIDAndDate(stadiumID, date);
            //var constantBookings = BookingData.GetConstantBookingsListByStadiumIDAndDate(stadiumID, date);
            var constantBookings = BookingData.GetConstantBookingsListByStadiumIDAndWeekDay(stadiumID, date.DayOfWeek.ToString());

            var bookedSlots = new List<TimeSlot>();


            bookedSlots.AddRange(bookings.Select(b => new TimeSlot
            {
                StartTime = b.StartTime,
                Duration = b.Duration
            }));


            bookedSlots.AddRange(constantBookings
                .Where(c => c.IsPermanent || (!c.IsPermanent && c.Date == date.Date))
                .Select(c => new TimeSlot
                {
                    StartTime = c.StartTime,
                    Duration = c.Duration
                }));





            var availableTimes = GenerateAvailableTimeSlots(bookedSlots, date, duration);

            var availableBookings = availableTimes.Select(t => new OneTimeBookingDTO
            {
                StadiumID = stadiumID,
                BookingType = "OneTime",
                StartTime = t,
                Duration = duration,
                BookingStatus = "Available",
                Date = date
            }).ToList();

            return availableBookings;
        }

        public static List<TimeSpan> GenerateAvailableTimeSlots(
            List<TimeSlot> bookedSlots,
            DateTime? date,
            int duration)
        {
            List<TimeSpan> availableSlots = new List<TimeSpan>();

            var ordered = bookedSlots
                .OrderBy(b => b.StartTime)
                .ToList();

            TimeSpan startOfDay = TimeSpan.Zero;
            TimeSpan endOfDay = new TimeSpan(24, 0, 0);


            if (date.HasValue)
            {
                if (date.Value.Date == DateTime.Now.Date)
                {
                    startOfDay = new TimeSpan(DateTime.Now.Hour, 0, 0)
                                    .Add(TimeSpan.FromMinutes(30));
                    ordered = ordered.Where(b => b.StartTime.Add(TimeSpan.FromMinutes(b.Duration)) > startOfDay)
                 .ToList();

                }
            }


            if (!ordered.Any())
            {
                for (TimeSpan slot = startOfDay;
                     slot.Add(TimeSpan.FromMinutes(duration)) <= endOfDay;
                     slot = slot.Add(TimeSpan.FromMinutes(duration)))
                {
                    availableSlots.Add(slot);
                }
                return availableSlots;
            }

            TimeSpan current = startOfDay;

            foreach (var booking in ordered)
            {

                while (current.Add(TimeSpan.FromMinutes(duration)) <= booking.StartTime)
                {
                    availableSlots.Add(current);
                    current = current.Add(TimeSpan.FromMinutes(duration));
                }


                current = booking.StartTime.Add(TimeSpan.FromMinutes(booking.Duration));
            }


            while (current.Add(TimeSpan.FromMinutes(duration)) <= endOfDay)
            {
                availableSlots.Add(current);
                current = current.Add(TimeSpan.FromMinutes(duration));
            }

            return availableSlots;
        }


        public static List<ConstantBookingDTO> GetConstantBookingsListByStadiumIDAndWeekDay(
            int stadiumID, string weekDay, int duration)
        {

            var bookings = BookingData.GetConstantBookingsListByStadiumIDAndWeekDay(stadiumID, weekDay);


            var bookedSlots = bookings.Select(b => new TimeSlot
            {
                StartTime = b.StartTime,
                Duration = b.Duration
            }).ToList();


            var availableTimes = GenerateAvailableTimeSlots(bookedSlots, null, duration);

            var availableBookings = availableTimes.Select(t => new ConstantBookingDTO
            {
                StadiumID = stadiumID,
                BookingType = "Constant",
                StartTime = t,
                IsPermanent = true,
                Duration = duration,
                WeekDay = weekDay,
                BookingStatus = "Available"  
            }).ToList();

            return availableBookings;
        }
        public static List<ConstantBookingDTO> GetConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber(
            int stadiumID, string weekDay,int WeekNumber, int duration)
        {

            var bookingsByWeekDay = BookingData.GetConstantBookingsListByStadiumIDAndWeekDay(stadiumID, weekDay);

            
            DateTime dt = GetDateByWeekAndDay(weekDay, WeekNumber);
            var bookedSlots = new List<TimeSlot>();


            bookedSlots.AddRange(bookingsByWeekDay
                .Where(c => c.IsPermanent || (!c.IsPermanent && c.Date == dt.Date))
                .Select(c => new TimeSlot
                {
                    StartTime = c.StartTime,
                    Duration = c.Duration
                }));




            var availableTimes = GenerateAvailableTimeSlots(bookedSlots, null, duration);

            var availableBookings = availableTimes.Select(t => new ConstantBookingDTO
            {
                StadiumID = stadiumID,
                BookingType = "Constant", 
                StartTime = t,
                Duration = duration,
                WeekDay = weekDay,
                WeekNumber = WeekNumber,
                BookingStatus = "Available"  
            }).ToList();

            return availableBookings;
        }
        //public static int AddNewOneTimeBooking(OneTimeBookingCreateDTO newBooking, int userID)
        //{
        //    return BookingData.AddNewOneTimeBooking(newBooking, userID);
        //}
        public static int AddNewOneTimeBooking(OneTimeBookingCreateDTO newBooking, int userID)
        {
            // التحقق من التوفر قبل الإضافة
            bool available = BookingData.IsOneTimeBookingAvailable(
                newBooking.StadiumID,
                newBooking.Date,
                newBooking.StartTime,
                newBooking.Duration);

            if (!available)
                return -1; // أو Exception حسب سياستك

            int insertedID = BookingData.AddNewOneTimeBooking(newBooking, userID);

            if (insertedID != -1)
            {
                var placeholders = new Dictionary<string, string>
        {
            { "BookingID", insertedID.ToString() },
        };

                SendBookingNotification(
                    userId: userID,
                    bookingNotificationTitle: NotificationBusiness.enNotificationTitles.BookingAdded,
                    sourceId: insertedID,
                    placeholders: placeholders
                );
            }

            return insertedID;
        }

        public static int AddNewConstantBooking(ConstantBookingCreateDTO newBooking, int userID)
        {
            if (!newBooking.IsPermanent)
                newBooking.Date = GetDateByWeekAndDay(newBooking.WeekDay, (int)newBooking.WeekNumber);

            // ✅ التحقق من التوفر قبل الإضافة
            bool available = BookingData.IsConstantBookingAvailable(
                newBooking.StadiumID,
                newBooking.WeekDay,
                newBooking.WeekNumber,
                newBooking.StartTime,
                newBooking.Duration,
                newBooking.IsPermanent);

            if (!available)
                return -1; // أو Exception حسب سياستك

            int insertedID = BookingData.AddNewConstantBooking(newBooking, userID);

            if (insertedID != -1)
            {
                var placeholders = new Dictionary<string, string>
        {
            { "BookingID", insertedID.ToString() },
        };

                SendBookingNotification(
                    userId: userID,
                    bookingNotificationTitle: NotificationBusiness.enNotificationTitles.BookingAdded,
                    sourceId: insertedID,
                    placeholders: placeholders
                );
            }

            return insertedID;
        }

        //public static int AddNewConstantBooking(ConstantBookingCreateDTO newBooking, int userID)
        //{

        //    if (!newBooking.IsPermanent)
        //        newBooking.Date = GetDateByWeekAndDay(newBooking.WeekDay, (int)newBooking.WeekNumber);

        //    int insertedID = BookingData.AddNewConstantBooking(newBooking, userID);


        //    if (insertedID != -1)
        //    {

        //        var placeholders = new Dictionary<string, string>
        //{
        //    { "BookingID", insertedID.ToString() },
        //};

        //        SendBookingNotification(
        //            userId: userID,
        //            bookingNotificationTitle: NotificationBusiness.enNotificationTitles.BookingAdded,
        //            sourceId: insertedID,
        //            placeholders: placeholders
        //        );
        //    }

        //    return insertedID;
        //}

        public static bool SendBookingNotification(
            int userId,
            NotificationBusiness.enNotificationTitles bookingNotificationTitle,
            int sourceId,
            Dictionary<string, string> placeholders = null,
            string sourceType = "Booking",
            string defaultIfMissing = "")
        {

            string titleString = bookingNotificationTitle switch
            {
                NotificationBusiness.enNotificationTitles.BookingAdded => "Added",
                NotificationBusiness.enNotificationTitles.BookingAccepted => "Accepted",
                NotificationBusiness.enNotificationTitles.BookingRejected => "Rejected",
                NotificationBusiness.enNotificationTitles.BookingCancelled => "Cancelled",
                NotificationBusiness.enNotificationTitles.BookingReminder => "Reminder",
                _ => "Unknown"
            };

            return NotificationBusiness.SendNotification(
                userId,
                type: "Booking",
                title: titleString,
                sourceId: sourceId,
                sourceType: sourceType,
                placeholders: placeholders,
                defaultIfMissing: defaultIfMissing
            );
        }


        public static bool UpdateBookingStatus(int BookingID, int BookingStatusID)
        {
            return BookingData.UpdateBookingStatus(BookingID, BookingStatusID);
        }

        public static List<ConstantBookingDTO> GetUserConstantBookings(int userID, int statusID )
        {
            return BookingData.GetConstantBookingsByUserIDAndStatus(userID, statusID);
        }
        public static List<OneTimeBookingDTO> GetUserOneTimeBookings(int userID, int statusID)
        {
            return BookingData.GetOneTimeBookingsByUserIDAndStatus(userID, statusID);
        }
        public static DateTime GetDateByWeekAndDay(string dayName, int weekNumber)
        {
            int year = DateTime.Now.Year;
            int month = DateTime.Now.Month;

            DayOfWeek dayOfWeek = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), dayName, true);

            DateTime firstOfMonth = new DateTime(year, month, 1);

            int offsetDays = ((int)dayOfWeek - (int)firstOfMonth.DayOfWeek + 7) % 7;
            DateTime firstOccurrence = firstOfMonth.AddDays(offsetDays);
            DateTime targetDate = firstOccurrence.AddDays((weekNumber - 1) * 7);

            return targetDate;
        }
        public static List<OneTimeBookingDTO> GetOneTimeBookings(int stadiumID, DateTime date, int? bookingStatusID = null)
        {
            return BookingData.GetOneTimeBookingsByStadiumIDAndDate(stadiumID, date, bookingStatusID);
        }
        public static List<ConstantBookingDTO> GetConstantBookings(int stadiumID, string weekDay, int? weekNumber = null, int? bookingStatusID = null)
        {
            return BookingData.GetConstantBookingsByStadiumIDWeekDayAndWeekNumber(stadiumID, weekDay, weekNumber, bookingStatusID);
        }
    }
}
