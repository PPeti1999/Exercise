using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExerciseNote.WebAppApi.Models
{
    public class WorkoutPlan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]// szöveges id generálás
        public string Id { get; set; }
        public string IdBodyDiary { get; set; }
        public List<string> ExerciseIdList { get; set; }
        public int WorkoutTime { get; set; }
        public int BurnedCalories { get; set; }
        public DateTime Created_at { get; set; }
    }
}
