using DtsApi.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DtsApi.Entities
{
    public class WorkTask
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public WorkTaskStatus Status { get; set; }

        [Required]
        [Column("due_date")]
        public DateTime DueDate { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("User")]
        public Guid UserId { get; set; }
    }
}
