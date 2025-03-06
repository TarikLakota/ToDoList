using System.ComponentModel.DataAnnotations;

namespace ToDoListAPI.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }//this is my primary key and it is auto-incremented

        [Required]//only makes the prop that is above it required in this case Name
        public string Name { get; set; } = string.Empty;
        [Required]
        public string? Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;//default value is false
    }
}
