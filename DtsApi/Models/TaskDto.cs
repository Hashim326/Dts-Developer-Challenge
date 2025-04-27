using DtsApi.Enums;
using System.ComponentModel.DataAnnotations;

namespace DtsApi.Models
{
    public class TaskDto
    {
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        [Required]
        public WorkTaskStatus Status { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
    }
}
