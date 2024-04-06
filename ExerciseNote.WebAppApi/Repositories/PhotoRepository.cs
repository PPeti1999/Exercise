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
            var image = await context.Photos.FindAsync(id);

            return image;
        }

        public async Task<bool> DeletePhoto(string id)
        {
            var image = await context.Exercise.FindAsync(id);

            if (image == null)
            {
                return false;
            }

            context.Exercise.Remove(image);
            await context.SaveChangesAsync();

            return true;
        }
    }
}
