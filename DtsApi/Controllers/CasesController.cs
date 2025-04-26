using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DtsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetAllCases()
        {
            return Ok(new {success = true, message = "Success"});
        }
    }
}
