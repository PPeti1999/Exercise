using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace ExerciseNote.WebAppApi.Models
{
    public class Exercise
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]// szöveges id generálás
        public string Id { get; set; }
        public string Title { get; set; }
        public string ExerciseTypeId { get; set; }
        public string Body { get; set; }
        public DateTime Created_at { get; set; }
        public string PhotoId { get; set; }
        public ExerciseType Type { get; set; }
        public Photo Photo { get; set; }
    }
}
