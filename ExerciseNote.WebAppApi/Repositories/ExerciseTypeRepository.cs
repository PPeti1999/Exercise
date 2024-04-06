using ExerciseNote.WebAppApi.Data;
using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
namespace ExerciseNote.WebAppApi.Repositories
{
    public class ExerciseTypeRepository : IExerciseTypeRepository
    {
        private readonly DataContext context;

        public ExerciseTypeRepository(DataContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<ExerciseType> AddType(ExerciseType type)
        {
            context.ExerciseType.Add(type);
            await context.SaveChangesAsync();
            return type;
        }

        public async Task<ExerciseType> GetTypeByName(string name)
        {
            var type = await context.ExerciseType
                .FirstOrDefaultAsync(c => c.Name == name);

            return type;
        }

        public async Task<IEnumerable<ExerciseType>> ListType()
        {
            var type = await context.ExerciseType.ToListAsync();

            return type;
        }
    }
}
