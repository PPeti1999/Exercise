using ExerciseNote.WebAppApi.Data;
using ExerciseNote.WebAppApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public class BodyDiaryWeeklyRepository : IBodyDiaryWeeklyRepository
    {
        private readonly DataContext context;
        public BodyDiaryWeeklyRepository(DataContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<BodyDiaryWeekly> AddBodyDiaryWeekly(BodyDiaryWeekly bodyDiaryWeekly)
        {
            context.BodyDiaryWeekly.Add(bodyDiaryWeekly);
            await context.SaveChangesAsync();

            return bodyDiaryWeekly;
        }

        public async Task<IEnumerable<BodyDiaryWeekly>> ListActualBodyDiaryWeekly(string actualidBodyDiary)
        {
            var bodyDiary = await context.BodyDiary
                .Where(bd => bd.Id == actualidBodyDiary)
                .FirstOrDefaultAsync();

            if (bodyDiary == null)
            {
                // Handle the case where bodyDiary is not found
                return Enumerable.Empty<BodyDiaryWeekly>();
            }

            return await context.BodyDiaryWeekly
                .Where(bdw => bdw.IdBodyDairy == bodyDiary.Id)
                .OrderBy(bdw => bdw.Created_at)
                 .Include(n => n.Photo)
                .ToListAsync();

             
        }
    }
}
