using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoPromoApp.Services;
using static PhotoPromoApp.Services.S3Service;

namespace PhotoPromoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3BucketController : ControllerBase
    {

        private readonly IS3Service _service;

        public S3BucketController(IS3Service service)
        {
            _service = service;
        }

        [HttpPost("{bucketName}")]
        public async Task<IActionResult> CreateBucket([FromRoute]string bucketName)
        {
            var response = await _service.CreateBucketAsync(bucketName);
            return Ok(response);
        }

        [HttpPost]
        [Route("AddImage")]
               public async Task<IActionResult> AddFile([FromRoute] string filePath)
        //public async Task<IActionResult> AddFile(IFormFile file)
        {

            await _service.UploadFileAsync(filePath);
            return Ok();
        }

        [HttpGet]
        [Route("GetFile/{keyName}")]
        public async Task<IActionResult> GetFileFromS3Async([FromRoute] string keyName)
        {
            await _service.ReadObjectDataAsync(keyName);
            
            return Ok();


        }
    }
}
