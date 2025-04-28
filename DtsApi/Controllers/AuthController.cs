using DtsApi.Models;
using DtsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DtsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterNewUser(UserRegisterDto userRegisterDto)
        {
            var newUser = await _authService.RegisterAsync(userRegisterDto);

            if (newUser == null) 
            {
                return BadRequest("This email is already taken");
            }

            return Ok( new { success = true, data = newUser } );

        }

        [HttpPost("login")]
        public async Task<IActionResult> login(UserLoginDto userLoginDto)
        {
            var jwtToken = await _authService.LoginAsync(userLoginDto);

            if (jwtToken == null)
            {
                return BadRequest("Invalid email or password");
            }

            return Ok(new { success = true, data = jwtToken });

        }
    }
}
