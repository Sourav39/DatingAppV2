namespace API.Errors
{
    public class ApiExceptions
    {
        public ApiExceptions(int statusCode, string Message, string details)
        {
            this.Message = Message;
            this.StatusCode = statusCode;
            this.Details = details;

        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}