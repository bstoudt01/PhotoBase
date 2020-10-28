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
            return Ok(_galleryRepository.GetAllGalleriesbyUserProfileId(userProfileId));
        }

        //Get Single Gallery by Id
        [HttpGet("{Id}")]
        public IActionResult GetSingleById(int id)
        {

            //var currentUserProfile = GetCurrentUserProfile();
            //var returnedGalleryById = _galleryRepository.GetGalleryById(id);

            //if (currentUserProfile.Id != returnedGalleryById.UserProfileId)
            //{
            //    return Unauthorized();
            //}
            return Ok(_galleryRepository.GetGalleryById(id));
        }

        //Post Gallery
        //Gallery
        [HttpPost]
        public IActionResult Post(Gallery gallery)
        {

            _galleryRepository.Add(gallery);
            return CreatedAtAction(nameof(GetSingleById), new { id = gallery.Id }, gallery);
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, Gallery gallery)
        {
            //var currentUserProfile = GetCurrentUserProfile();

            //if (currentUserProfile.UserType.Name != "Admin")
            //{
            //    return Unauthorized();
            //}
            //if (category == null)
            //{

            //    return NotFound();

            //}
            //if (id != category.Id)
            //{
            //    return BadRequest();
            //}
            _galleryRepository.Update(gallery);
            return Ok(gallery);
        }



        [HttpDelete("{id}")]
        //// TRY WITH THIS LATER 
        ////[ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            //if (id == 1)
            //{

            //    return NotFound();

            //}
            //try
            //{
                _galleryRepository.Delete(id);

                return Ok(id);
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest();

            //}
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
