using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;
using ToDoListAPI.Models;


namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ToDoContext _context;

        public TaskController (ToDoContext context)
        {
            _context = context;
        }

        [HttpGet]//GET all taska
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            if(tasks == null || !tasks.Any())
                return NotFound("No tasks found");
            return Ok(tasks);
        }

        [HttpGet("{id}")]//get tasks by ID
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if(task == null) return NotFound();
            return task;
        }

        [HttpPost]//create a new task
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new {id = task.Id}, task);
        }

        [HttpPut("{id}")]//update a task
        public async Task<IActionResult> UpdateTask(int id,[FromBody] TaskItem task)
        {
            if (id != task.Id) return BadRequest("Task ID mismatch");

            var existingTask = await _context.Tasks.FindAsync(id);
            if(existingTask == null) return NotFound("Task not found");
            existingTask.IsCompleted = task.IsCompleted;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]//deletes a task 
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
