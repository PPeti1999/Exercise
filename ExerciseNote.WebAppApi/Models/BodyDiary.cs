using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace ExerciseNote.WebAppApi.Models
{
    public class BodyDiary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]// szöveges id generálás
        public string Id { get; set; }
        public string IdUser { get; set; }
        public int Age { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public int BodyFat { get; set; }
      
        public int MaintainWeight { get; set; }
        public int WeightLoss { get; set; }
        public int WeightGain { get; set; }
        public DateTime Created_at { get; set; }
        public string PhotoId { get; set; }
        public Photo Photo { get; set; }

    }
}
