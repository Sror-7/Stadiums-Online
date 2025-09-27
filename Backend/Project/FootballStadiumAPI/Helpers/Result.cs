public class Result<T>
{
    public bool Success { get; private set; }    // هل العملية نجحت
    public string Message { get; private set; }  // رسالة نجاح أو فشل
    public T? Data { get; private set; }         // البيانات الناتجة (اختياري)

    private Result(bool success, string message, T? data = default)
    {
        Success = success;
        Message = message;
        Data = data;
    }

    // طريقة لإنشاء نتيجة ناجحة
    public static Result<T> Ok(T data, string message = "")
    {
        return new Result<T>(true, message, data);
    }

    // طريقة لإنشاء نتيجة فاشلة
    public static Result<T> Fail(string message)
    {
        return new Result<T>(false, message, default);
    }
}
