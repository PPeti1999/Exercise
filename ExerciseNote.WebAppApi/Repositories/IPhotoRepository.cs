using ExerciseNote.WebAppApi.Models;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public interface IPhotoRepository
    {
        public Task<Photo> UploadPhoto(Photo photo);

        public Task<Photo> GetPhoto(string id);

        public Task<bool> DeletePhoto(string id);
    }
}
