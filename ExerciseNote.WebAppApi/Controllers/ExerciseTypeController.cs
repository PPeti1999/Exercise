using ExerciseNote.WebAppApi.Models;
using ExerciseNote.WebAppApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ExerciseNote.WebAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseTypeController : ControllerBase
    {

        private readonly IExerciseTypeRepository exerciseTypeRepository;

        public ExerciseTypeController(IExerciseTypeRepository exerciseTypeRepository)
        {
            this.exerciseTypeRepository = exerciseTypeRepository ?? throw new ArgumentNullException(nameof(exerciseTypeRepository));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseType>>> GetTypes()
        {
            var exercises = await exerciseTypeRepository.ListType();

            return Ok(exercises);
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseType>> AddExerciseType([FromBody] ExerciseType exerciseType)
        {
            if (exerciseType == null || string.IsNullOrWhiteSpace(exerciseType.Name))
            {
                return BadRequest();
            }

            var created = await exerciseTypeRepository.AddType(exerciseType);

            return Ok(created);
        }
    }
}
