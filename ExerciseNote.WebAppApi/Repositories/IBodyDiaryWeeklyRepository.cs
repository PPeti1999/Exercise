using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public interface IBodyDiaryWeeklyRepository
    {
        public Task<IEnumerable<BodyDiaryWeekly>> ListActualBodyDiaryWeekly(string actualidBodyDiary);
        public Task<BodyDiaryWeekly> AddBodyDiaryWeekly(BodyDiaryWeekly bodyDiaryWeekly);
    }
}
