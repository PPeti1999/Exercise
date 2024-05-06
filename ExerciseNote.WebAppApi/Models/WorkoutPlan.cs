using System.Collections.Generic;
using System;

namespace ExerciseNote.WebAppApi.Models
{
    public class WorkoutPlan
    {
        public string Id { get; set; }
        public string IdBodyDiary { get; set; }
        public List<int> ExerciseIdList { get; set; }
        public int WorkoutTime { get; set; }
        public int BurnedCalories { get; set; }
        public DateTime Created_at { get; set; }
    }
}
