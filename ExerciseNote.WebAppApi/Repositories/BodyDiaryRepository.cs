using ExerciseNote.WebAppApi.Data;
using ExerciseNote.WebAppApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ExerciseNote.WebAppApi.Repositories
{
    public class BodyDiaryRepository:IBodyDiaryRepository
    {
        private readonly DataContext context;

        public BodyDiaryRepository(DataContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<BodyDiary> AddBodyDiary(BodyDiary bodyDiary)
        {
            context.BodyDiary.Add(bodyDiary);
            await context.SaveChangesAsync();

            return bodyDiary;
        }

        public async Task<BodyDiary> GetLastBodyDiary(string userId)
        {
            return await context.BodyDiary
                .Where(bd => bd.IdUser == userId)
                .OrderByDescending(bd => bd.Created_at)
                .FirstOrDefaultAsync();

        }
    }
}
