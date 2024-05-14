using ExerciseNote.WebAppApi.Models;
using ExerciseNote.WebAppApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExerciseNote.WebAppApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BodyDairyController : ControllerBase
    {
        private readonly IBodyDiaryRepository _bodyDiaryRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly ILogger<BodyDairyController> _logger;

        public BodyDairyController(ILogger<BodyDairyController> _logger, IBodyDiaryRepository bodyDiaryRepository
           , IPhotoRepository photoRepository)
        {
            this._logger = _logger ?? throw new ArgumentNullException(nameof(_logger));

            this._bodyDiaryRepository = bodyDiaryRepository ?? throw new ArgumentNullException(nameof(bodyDiaryRepository));
            this._photoRepository = photoRepository ?? throw new ArgumentNullException(nameof(photoRepository));

        }
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BodyDiary>>> GetLastBodyDiary(string id)
        {
            var bodyDiary = await _bodyDiaryRepository.GetLastBodyDiary(id);

            if (bodyDiary == null)
                return NotFound();

            return Ok(bodyDiary);
        }
       

        [HttpPost]
        public async Task<ActionResult<BodyDiary>> AddBodyDiary([FromBody] BodyDiary bodyDiary)
        {
            if ( bodyDiary.Photo == null) return BadRequest();

         

            var uploadedPhoto = await _photoRepository.UploadPhoto(bodyDiary.Photo);
            bodyDiary.PhotoId = uploadedPhoto.Id;

            var create = await _bodyDiaryRepository.AddBodyDiary(bodyDiary);

            return Ok(create);
        }
    }
}
