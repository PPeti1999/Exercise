using ExerciseNote.WebAppApi.Models;
using ExerciseNote.WebAppApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ExerciseNote.WebAppApi.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BodyDairyWeeklyController : Controller
    {
        private readonly IBodyDiaryWeeklyRepository _bodyDiaryWeeklyRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly ILogger<BodyDairyWeeklyController> _logger;

        public BodyDairyWeeklyController(ILogger<BodyDairyWeeklyController> _logger, IBodyDiaryWeeklyRepository bodyDiaryWeeklyRepository
           , IPhotoRepository photoRepository)
        {
            this._logger = _logger ?? throw new ArgumentNullException(nameof(_logger));

            this._bodyDiaryWeeklyRepository = bodyDiaryWeeklyRepository ?? throw new ArgumentNullException(nameof(bodyDiaryWeeklyRepository));
            this._photoRepository = photoRepository ?? throw new ArgumentNullException(nameof(photoRepository));

        }
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BodyDiaryWeekly>>> ListActualBodyDiaryWeekly(string id)
        {
            var bodyDiaryWeeklies = await _bodyDiaryWeeklyRepository.ListActualBodyDiaryWeekly(id);

            if (bodyDiaryWeeklies == null)
                return NotFound();

            return Ok(bodyDiaryWeeklies);
        }

        [HttpPost]
   
        public async Task<ActionResult<BodyDiaryWeekly>> AddBodyDiaryWeekly([FromBody] BodyDiaryWeekly bodyDiaryWeekly)
        {
            if (bodyDiaryWeekly.Photo == null) return BadRequest();



            var uploadedPhoto = await _photoRepository.UploadPhoto(bodyDiaryWeekly.Photo);
            bodyDiaryWeekly.PhotoId = uploadedPhoto.Id;

            var create = await _bodyDiaryWeeklyRepository.AddBodyDiaryWeekly(bodyDiaryWeekly);

            return Ok(create);
        }
    }
}
