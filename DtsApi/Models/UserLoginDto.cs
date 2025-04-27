using System.ComponentModel.DataAnnotations;

namespace DtsApi.Models
{
    public class UserLoginDto
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
