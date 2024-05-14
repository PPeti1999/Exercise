using ExerciseNote.WebAppApi.Data;
using ExerciseNote.WebAppApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Repositories
{
    public class WorkoutPlanRepositories : IWorkoutPlanRepositories
    {
        private readonly DataContext context;
        public WorkoutPlanRepositories(DataContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<WorkoutPlan> AddWrokoutPlan(WorkoutPlan workoutPlan)
        {
            context.WorkoutPlan.Add(workoutPlan);
            await context.SaveChangesAsync();

            return workoutPlan;
        }


        public async Task<IEnumerable<WorkoutPlan>> ListActualWorkoutPlan(string actualidBodyDiary)
        {
            var bodyDiary = await context.BodyDiary
               .Where(bd => bd.Id == actualidBodyDiary)
               .FirstOrDefaultAsync();

            if (bodyDiary == null)
            {
                // Handle the case where bodyDiary is not found
                return Enumerable.Empty<WorkoutPlan>();
            }

            return await context.WorkoutPlan
                .Where(bdw => bdw.IdBodyDiary == bodyDiary.Id)
                .OrderBy(bdw => bdw.Created_at)
                .ToListAsync();
          
        }
    }
}

