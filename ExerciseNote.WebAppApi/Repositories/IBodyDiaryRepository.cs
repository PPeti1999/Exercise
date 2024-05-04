using ExerciseNote.WebAppApi.Models;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public interface IBodyDiaryRepository
    {
        public Task<BodyDiary> GetLastBodyDiary(string userId);
        public Task<BodyDiary> AddBodyDiary(BodyDiary bodyDiary);
    }
}
