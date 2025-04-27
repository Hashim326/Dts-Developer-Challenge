using System.ComponentModel.DataAnnotations;

namespace DtsApi.Models
{
    public class UserRegisterDto
    {
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

    }
}
