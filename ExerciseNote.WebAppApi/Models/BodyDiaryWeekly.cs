using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace ExerciseNote.WebAppApi.Models
{
    public class BodyDiaryWeekly
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]// szöveges id generálás
        public string Id { get; set; }
        public string IdBodyDairy { get; set; }
        public int Weight { get; set; }
        public DateTime Created_at { get; set; }
        public string PhotoId { get; set; }
        public Photo Photo { get; set; }
    }
}
