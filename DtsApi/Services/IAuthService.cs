using DtsApi.Entities;
using DtsApi.Models;

namespace DtsApi.Services
{
    public interface IAuthService
    {
        public Task<string?> LoginAsync(UserLoginDto loginDto);
        public Task<User?> RegisterAsync(UserRegisterDto registerDto);
    }
}
