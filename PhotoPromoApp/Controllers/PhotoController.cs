using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoPromo.Repositories;

namespace PhotoPromo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {

        private readonly IPhotoRepository _photoRepository;
        public PhotoController(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }


        //Get ALL Photo by UserProfileId
        [HttpGet("UserProfile/{UserProfileId}")]
        public IActionResult GetAllByUser(int userProfileId)
        {
            return Ok(_photoRepository.GetAllPhotosByUserProfileId(userProfileId));
        }

        //Get All Photo by GalleryId
        //implement checking userId before get photos from wisdomgrace / dog go
        [HttpGet("Gallery/{GalleryId}")]
        public IActionResult GetAllByGallery(int galleryId)
        {
            return Ok(_photoRepository.GetPhotosByGalleryId(galleryId));
        }

        //Get Single Photo by Id
        //implement checking userId before get photos from wisdomgrace / dog go
        [HttpGet("{Id}")]
        public IActionResult GetSingleById(int id)
        {
            return Ok(_photoRepository.GetSinglePhotobyId(id));
        }


    }
}
