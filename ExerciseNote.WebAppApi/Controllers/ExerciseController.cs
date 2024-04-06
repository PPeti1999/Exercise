using ExerciseNote.WebAppApi.Models;
using ExerciseNote.WebAppApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ExerciseNote.WebAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ExerciseController : Controller
    {
        private readonly IExerciseRepository exerciseRepository;
        private readonly IExerciseTypeRepository exerciseTypeRepository;
        private readonly IPhotoRepository photoRepository;
        private readonly ILogger<ExerciseController> _logger;

        public ExerciseController(ILogger<ExerciseController> _logger, IExerciseRepository exerciseRepository,
           IExerciseTypeRepository exerciseTypeRepository, IPhotoRepository photoRepository)
        {
            this._logger = _logger ?? throw new ArgumentNullException(nameof(_logger));

            this.exerciseRepository = exerciseRepository ?? throw new ArgumentNullException(nameof(exerciseRepository));
            this.exerciseTypeRepository = exerciseTypeRepository ?? throw new ArgumentNullException(nameof(exerciseTypeRepository));
            this.photoRepository = photoRepository ?? throw new ArgumentNullException(nameof(photoRepository));

        }

        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<Exercise>> GetExercise(string id)
        {
            var exercise = await exerciseRepository.GetExercise(id);

            if (exercise == null)
                return NotFound();

            return Ok(exercise);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetAllExercise()
        {
            var exerciseList = await exerciseRepository.ListExercise();

            return Ok(exerciseList);
        }


        [HttpPost]
        //  [Authorize(Policy = "Admin")]
        public async Task<ActionResult<Exercise>> AddExercise([FromBody] Exercise exercise)
        {
            if (exercise?.Type?.Name == null || exercise.Photo == null) return BadRequest();

            var type = await exerciseTypeRepository.GetTypeByName(exercise.Type.Name);

            if (type == null) return BadRequest();

            exercise.Type = type;

            var uploadedPhoto = await photoRepository.UploadPhoto(exercise.Photo);
            exercise.PhotoId = uploadedPhoto.Id;

            var create = await exerciseRepository.AddExercise(exercise);

            return Ok(create);
        }
        [HttpPut]
        // [Authorize(Policy = "Admin")]
        public async Task<ActionResult<Exercise>> UpdateExercise([FromBody] Exercise exercise)
        {
            if (exercise == null) return BadRequest();

            var type = await exerciseTypeRepository.GetTypeByName(exercise.Type.Name);

            exercise.ExerciseTypeId = type.Id;
            exercise.Type = null;
            var updated = await exerciseRepository.UpdateExercise(exercise);

            return Ok(updated);
        }


        [HttpDelete("{id}")]
        // [Authorize(Policy = "Admin")]
        public async Task<ActionResult<bool>> DeleteExercise(string id)
        {
            var exercise = await exerciseRepository.GetExercise(id);

            if (exercise == null)
            {
                return NotFound();
            }

            var isSuccess = await exerciseRepository.DeleteExercise(id);

            if (!isSuccess)
            {
                return NotFound();
            }
            await photoRepository.DeletePhoto(exercise.Id);// gyakorlathoztartozó kép törlése
            return NoContent();
        }
    }
}
