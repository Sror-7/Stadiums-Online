using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballStadiumAPIDataAccess.DTOs
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserID { get; set; }            // المستخدم المستلم
        public int? SourceID { get; set; }         // رقم الحجز أو الملعب أو أي كائن مرتبط
        public string? SourceType { get; set; }     // نوع الكائن المرتبط
        public string Type { get; set; }           // نوع الإشعار
        public string Content { get; set; }        // نص الإشعار النهائي بعد استبدال placeholders
        public bool IsRead { get; set; }             // مقروء / غير مقروء
        public bool Trash { get; set; }            // محذوف / سلة المهملات
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
    public class NotificationTemplate
    {
        public int ID { get; set; }                // معرف القالب
        public string Title { get; set; }          // اسم القالب (مثلاً: "Booking Accepted")
        public string? Description { get; set; }    // وصف القالب
        public string Type { get; set; }           // نوع الإشعار (مثلاً: "Booking")
        public string? SourceType { get; set; }     // نوع الكائن المرتبط (Booking, Stadium, etc.)
        public string Content { get; set; }        // نص القالب مع placeholders
        public DateTime CreatedAt { get; set; }    // تاريخ الإنشاء
        public DateTime? UpdatedAt { get; set; }    // تاريخ آخر تعديل
    }

}
