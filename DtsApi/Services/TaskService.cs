using DtsApi.Data;
using DtsApi.Entities;
using DtsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DtsApi.Services
{
    public class TaskService: ITaskService
    {
        private readonly ApplicationDbContext _dbContext;
   
        public TaskService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<WorkTask> CreateTask(TaskDto taskDto, string userId)
        {
            WorkTask newTask = new (){
                Title = taskDto.Title,
                Description = taskDto.Description,
                Status = taskDto.Status,
                DueDate = taskDto.DueDate,
                UserId = Guid.Parse(userId)
            };

            _dbContext.Tasks.Add(newTask);
            await _dbContext.SaveChangesAsync();
            return newTask;
        }

        public async Task<List<WorkTask>> GetAllTaskAsync(string userId)
        {
            return await _dbContext.Tasks.Where(t => t.UserId == Guid.Parse(userId)).ToListAsync();
        }

        public async Task<WorkTask> GetTaskAsync(int taskId, string userId)
        {
           return await _dbContext.Tasks.SingleOrDefaultAsync(t => t.Id == taskId && t.UserId == Guid.Parse(userId));
        }

        public async Task<WorkTask> UpdateTaskAsync(TaskDto taskDto, int taskId, string userId)
        {
            var existingTask = await _dbContext.Tasks.SingleOrDefaultAsync(t => t.Id == taskId && t.UserId == Guid.Parse(userId));

            if (existingTask == null) 
            {
                return null;
            }

            existingTask.Title = taskDto.Title;
            existingTask.Description = taskDto.Description;
            existingTask.Status = taskDto.Status;
            existingTask.DueDate = taskDto.DueDate;

            await _dbContext.SaveChangesAsync();

            return existingTask;
        }

        public async Task DeleteTaskAsync(WorkTask task)
        {
            _dbContext.Tasks.Remove(task);
            await _dbContext.SaveChangesAsync();
        }
    }
}
