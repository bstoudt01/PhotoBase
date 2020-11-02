using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoPromo.Models;
using PhotoPromo.Repositories;

namespace PhotoPromo.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {

        private readonly IGalleryRepository _galleryRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public GalleryController(IGalleryRepository galleryRepository, IUserProfileRepository userProfileRepository)
        {
            _galleryRepository = galleryRepository;
            _userProfileRepository = userProfileRepository;
        }


        //Get ALL Galleries by UserProfileId
        [HttpGet("UserProfile/{UserProfileId}")]
        public IActionResult GetAllByUser(int userProfileId)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var allGalleries = _galleryRepository.GetAllGalleriesbyUserProfileId(userProfileId);
            if (currentUserProfile.Id != userProfileId)
            {
                return Unauthorized();
            }
            if (allGalleries == null)
            {
                return NoContent();
            }

            return Ok(allGalleries);
        }

        //Get Single Gallery by Id
        [HttpGet("{Id}")]
        public IActionResult GetSingleById(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var singleGallery = _galleryRepository.GetGalleryById(id);

            if (currentUserProfile.Id != singleGallery.UserProfileId)
            {
                return Unauthorized();
            }
            if (id == singleGallery.Id)
            {
                return NotFound();
            }

            return Ok(singleGallery);
        }

        //Post Gallery
        //Gallery
        [HttpPost]
        public IActionResult Post(Gallery gallery)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != gallery.UserProfileId)
            {
                return Unauthorized();
            }
            if (gallery == null)
            {
                return NotFound();
            }

            _galleryRepository.Add(gallery);

            return CreatedAtAction(nameof(GetSingleById), new { id = gallery.Id }, gallery);
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, Gallery gallery)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != gallery.UserProfileId)
            {
                return Unauthorized();
            }
            if (gallery == null)
            {
                return NotFound();
            }
            if (id != gallery.Id)
            {
                return BadRequest();
            }

            _galleryRepository.Update(gallery);
            
            return Ok(gallery);
        }



        [HttpDelete("{id}")]
        //// TRY WITH THIS LATER 
        ////[ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Gallery gallery)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != gallery.UserProfileId)
            {
                return Unauthorized();
            }
            if (id != gallery.Id)
            {
                return BadRequest();
            }
            if (gallery == null)
            {
                return BadRequest();
            }    
            if (id == 1)
            {
                return NotFound();
            }

            try
            {
                _galleryRepository.Delete(id);

                return Ok(id);
            }
            catch (Exception ex)
            {
                Console.Write("UhOh There was an Exception...", ex);
                return BadRequest();
            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
