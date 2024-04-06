using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExerciseNote.WebAppApi.Models
{
    public class Photo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]// szöveges id generálás
        public string Id { get; set; }
        public string PhotoData { get; set; }// a kép url tömbben való tárolásásra 
    }
}
