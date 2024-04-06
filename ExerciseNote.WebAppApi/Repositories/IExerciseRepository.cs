using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public interface IExerciseRepository
    {
        public Task<IEnumerable<Exercise>> ListExercise();
        // public Task<IEnumerable<Exercise>> ListExercise(); lapozás?
        public Task<Exercise> GetExercise(string id);
        public Task<Exercise> AddExercise(Exercise exercise);
        public Task<Exercise> UpdateExercise(Exercise exercise);
        public Task<bool> DeleteExercise(string id);
    }
}
