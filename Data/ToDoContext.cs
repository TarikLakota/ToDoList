//here we applied entetyframework package that we added and made conection with class models
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Models;


namespace ToDoListAPI.Data
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }//connected db table and program trough entityframework
    }
}
