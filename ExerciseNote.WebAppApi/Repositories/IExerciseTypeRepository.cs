using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public interface IExerciseTypeRepository
    {
        public Task<IEnumerable<ExerciseType>> ListType();

        public Task<ExerciseType> GetTypeByName(string name);

        public Task<ExerciseType> AddType(ExerciseType type);
    }
}
