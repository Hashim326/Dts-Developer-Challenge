using DtsApi.Data;
using DtsApi.Models;
using DtsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DtsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TaskService _taskService;

        public TaskController(ApplicationDbContext applicationDbContext) 
        {
            _context = applicationDbContext;
            _taskService = new TaskService(_context);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var _userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_userId == null) 
            {
                return Unauthorized();
            }

            var allTasks = await _taskService.GetAllTaskAsync(_userId);
            return Ok(new {success = true, data = allTasks});
        }

        [HttpGet]
        [Route("{taskId}")]
        public async Task<IActionResult> GetTaskById(int taskId)
        {
            var _userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (_userId == null)
            {
                return Unauthorized();
            }

            var task = await _taskService.GetTaskAsync(taskId, _userId);
            return Ok(new { success = true, data = task });
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewTask([FromBody] TaskDto taskDto)
        {
            var _userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (_userId == null)
            {
                return Unauthorized();
            }

            var task = await _taskService.CreateTask(taskDto, _userId);
            return Ok(new {success = true, data = task});
        }

        [HttpPut("{taskId}")]
        public async Task<IActionResult> UpdateTask(int taskId, [FromBody] TaskDto taskDto)
        {
            var _userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (_userId == null)
            {
                return Unauthorized();
            }

            var task = await _taskService.UpdateTaskAsync(taskDto, taskId, _userId);

            if (task is null)
            {
                return BadRequest("Task could not be found");
            }

            return Ok(new { success = true, data = task });
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(int taskId) 
        {
            var _userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (_userId == null)
            {
                return Unauthorized();
            }

            var task = await _taskService.GetTaskAsync(taskId, _userId);

            if (task is null)
            {
                return BadRequest("Task could not be found");
            }

            await _taskService.DeleteTaskAsync(task);

            return Ok(new { success = true });
        }


    }
}
