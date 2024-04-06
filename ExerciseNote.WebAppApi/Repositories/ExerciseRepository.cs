using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using ExerciseNote.WebAppApi.Data;
using Microsoft.EntityFrameworkCore;
namespace ExerciseNote.WebAppApi.Repositories
{
    public class ExerciseRepository : IExerciseRepository
    {
        private readonly DataContext context;

        public ExerciseRepository(DataContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Exercise> AddExercise(Exercise exercise)
        {
            context.Exercise.Add(exercise);
            await context.SaveChangesAsync();

            return exercise;
        }

        public async Task<bool> DeleteExercise(string id)
        {
            var exercise = await context.Exercise.FindAsync(id);

            if (exercise == null)
            {
                return false;
            }

            context.Exercise.Remove(exercise);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<Exercise> GetExercise(string id)
        {
            var exercise = await context.Exercise
                 .Include(n => n.Type)//típus egyezés
                 .Include(n => n.Photo)// photo egyezés
                 .FirstOrDefaultAsync(n => n.Id == id);//id egyezés

            return exercise;
        }

        public async Task<IEnumerable<Exercise>> ListExercise()
        {
            return await context.Exercise
                .Include(n => n.Type) // Típus betöltése
                .Include(n => n.Photo) // Fotó betöltése
                .ToListAsync();
        }


        public async Task<Exercise> UpdateExercise(Exercise exercise)
        {
            if (exercise == null)
            {
                return exercise;
            }


            context.Exercise.Update(exercise);
            await context.SaveChangesAsync();

            return exercise;
        }
    }
}
