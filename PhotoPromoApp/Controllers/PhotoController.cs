using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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

        private readonly IPhotoRepository _photoRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PhotoController(IPhotoRepository photoRepository, IUserProfileRepository userProfileRepository)
        {
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

            _photoRepository.Delete(id);

            return Ok(id);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
