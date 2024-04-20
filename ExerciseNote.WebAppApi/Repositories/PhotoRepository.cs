using ExerciseNote.WebAppApi.Data;
using ExerciseNote.WebAppApi.Models;
using System.Threading.Tasks;
using System;

namespace ExerciseNote.WebAppApi.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext context;
        public PhotoRepository(DataContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Photo> UploadPhoto(Photo photo)
        {
            context.Photos.Add(photo);
            await context.SaveChangesAsync();

            return photo;
        }

        public async Task<Photo> GetPhoto(string id)
        {
            var photo = await context.Photos.FindAsync(id);

            return photo;
        }

        public async Task<bool> DeletePhoto(string id)
        {
            var photo = await context.Exercise.FindAsync(id);

            if (photo == null)
            {
                return false;
            }

            context.Exercise.Remove(photo);
            await context.SaveChangesAsync();

            return true;
        }
    }
}
