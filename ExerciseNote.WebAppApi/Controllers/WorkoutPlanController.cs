using ExerciseNote.WebAppApi.Models;
using ExerciseNote.WebAppApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ExerciseNote.WebAppApi.Controllers
{   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutPlanController : Controller
    {
        private readonly IWorkoutPlanRepositories _workouPlanRepository;
        private readonly IExerciseRepository _exerciseRepository;
        private readonly ILogger<WorkoutPlanController> _logger;

        public WorkoutPlanController(ILogger<WorkoutPlanController> _logger, IWorkoutPlanRepositories workouPlanRepository
           , IExerciseRepository exerciseRepository)
        {
            this._logger = _logger ?? throw new ArgumentNullException(nameof(_logger));

            this._workouPlanRepository = workouPlanRepository ?? throw new ArgumentNullException(nameof(workouPlanRepository));
            this._exerciseRepository = exerciseRepository ?? throw new ArgumentNullException(nameof(exerciseRepository));

        }
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BodyDiaryWeekly>>> ListActualWorkoutPlan(string id)
        {
            var bodyDiaryWeeklies = await _workouPlanRepository.ListActualWorkoutPlan(id);

            if (bodyDiaryWeeklies == null)
                return NotFound();

            return Ok(bodyDiaryWeeklies);
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutPlan>> AddWrokoutPlan([FromBody] WorkoutPlan workoutPlan)
        {
            if (workoutPlan.ExerciseIdList == null) return BadRequest();





            var create = await _workouPlanRepository.AddWrokoutPlan(workoutPlan);

            return Ok(create);
        }
    }
}

