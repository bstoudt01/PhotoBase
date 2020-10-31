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
    public class UserProfileController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }


        //REPO METHODS NOT YET ADDED TO CONTROLLER
        //void DeactivateProfile(int id);
        //List<UserProfile> GetAllDeactivatedUserProfiles();
        //List<UserProfile> GetAllUserProfiles();
        //void ReactivateProfile(int id);



        //Get User by UserProfile.FirebaseId
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        //Get User by UserProfile.Id
        [HttpGet("details/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.Id != id)
            {
                return Unauthorized();
            }

            return Ok(_userProfileRepository.GetUserProfileById(id));
        }


        //Create new UserProfile
        //Added  userTypeId  for when post returns userProfile, also set to default to 2 "user" in the database when creating a new instance, but I needed that info here 
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {

            userProfile.UserTypeId = 2;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
