using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
            
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-fount")]
        public ActionResult<AppUser> GetNotFount()
        {
           var user = _context.Users.Find(-1);

           if(user == null) return NotFound();

           return user; 
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var user = _context.Users.Find(-1);

            var userReturn = user.ToString();

            return userReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is Bad Request!!");
        }    
    }
}