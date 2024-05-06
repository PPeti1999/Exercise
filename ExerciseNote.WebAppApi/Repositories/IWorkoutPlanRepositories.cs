using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public interface IWorkoutPlanRepositories
    {
        public Task<IEnumerable<WorkoutPlan>> ListActualWorkoutPlan(string actualidBodyDiary);
        public Task<WorkoutPlan> AddWrokoutPlan(WorkoutPlan workoutPlan);
    }
}
