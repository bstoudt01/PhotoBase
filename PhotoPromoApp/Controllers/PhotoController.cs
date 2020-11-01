using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoPromo.Models;
using PhotoPromo.Repositories;

namespace PhotoPromo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IWebHostEnvironment _webhost;
        private readonly IPhotoRepository _photoRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PhotoController(IPhotoRepository photoRepository, IWebHostEnvironment webhost, IUserProfileRepository userProfileRepository)
        {
            _webhost = webhost;

            _photoRepository = photoRepository;
            _userProfileRepository = userProfileRepository;

        }


        //Get ALL Photo by UserProfileId
        [HttpGet("UserProfile/{UserProfileId}")]
        public IActionResult GetAllByUser(int userProfileId)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var allPhotosByUserId = _photoRepository.GetAllPhotosByUserProfileId(userProfileId);
            if (currentUserProfile.Id != userProfileId)
            {
                return Unauthorized();
            }
            return Ok(allPhotosByUserId);
        }

        //Get All Photo by GalleryId
        //implement checking userId before get photos from wisdomgrace / dog go
        [HttpGet("Gallery/{GalleryId}")]
        public IActionResult GetAllByGallery(int galleryId)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var allPhotosByGallery = _photoRepository.GetPhotosByGalleryId(galleryId);
            var noGalleryContent = "no content";
            if(allPhotosByGallery.Count == 0)
            {
                return Ok(noGalleryContent);
            }
            if (currentUserProfile.Id != allPhotosByGallery[0].UserProfileId)
            {
                return Unauthorized();
            }
            if (allPhotosByGallery == null)
            {
                return NoContent();
            }
            return Ok(allPhotosByGallery);
        }

        //Get Single Photo by Id
        //implement checking userId before get photos from wisdomgrace / dog go
        [HttpGet("{Id}")]
        public IActionResult GetSingleById(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var singlePhoto = _photoRepository.GetSinglePhotobyId(id);

            if (currentUserProfile.Id != singlePhoto.UserProfileId)
            {
                return Unauthorized();
            }
            if (id == singlePhoto.Id)
            {

                return NotFound();

            }
            return Ok(singlePhoto);
        }

        //Post Photo
        //Photo
        [HttpPost]
        public IActionResult Post(Photo photo)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != photo.UserProfileId)
            {
                return Unauthorized();
            }
            if (photo == null)
            {

                return BadRequest();

            }
            photo.ResolutionLevel = 300;
            
            _photoRepository.Add(photo);
            return CreatedAtAction(nameof(GetSingleById), new { id = photo.Id }, photo);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Photo photo)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != photo.UserProfileId)
            {
                return Unauthorized();
            }
            if (photo == null)
            {

                return BadRequest();

            }
            if (id != photo.Id)
            {
                return BadRequest();
            }
            _photoRepository.Update(photo);
            return Ok(photo);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, Photo photo)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var singlePhoto = _photoRepository.GetSinglePhotobyId(id);

            string _highResImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "high_" + photo.PhotoLocation);
            string _lowResImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "low_" + photo.PhotoLocation);
            string _customImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "custom_" + photo.PhotoLocation);


            if (currentUserProfile.Id != singlePhoto.UserProfileId)
            {
                return Unauthorized();
            }
            if (singlePhoto == null)
            {

                return BadRequest();

            }

            _photoRepository.Delete(id);


            if ((System.IO.File.Exists(_highResImageToBeDeleted)))
            {
                System.IO.File.Delete(_highResImageToBeDeleted);
            }
            if ((System.IO.File.Exists(_lowResImageToBeDeleted)))
            {
                System.IO.File.Delete(_lowResImageToBeDeleted);
            }
            if ((System.IO.File.Exists(_customImageToBeDeleted)))
            {
                System.IO.File.Delete(_customImageToBeDeleted);
            }
            return Ok(id);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
