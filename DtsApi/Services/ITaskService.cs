using DtsApi.Entities;
using DtsApi.Models;

namespace DtsApi.Services
{
    public interface ITaskService
    {
        Task<WorkTask> CreateTask(TaskDto taskDto, string userId);
        Task<WorkTask> GetTaskAsync(int taskId, string userId);
        Task<List<WorkTask>> GetAllTaskAsync(string userId);
        Task<WorkTask> UpdateTaskAsync(TaskDto taskDto, int taskId, string userId);
        Task DeleteTaskAsync(WorkTask task);

    }
}
