using System.Security.Claims;
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
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            if (userProfile.FacebookUserId == null )
            {
                userProfile.FacebookUserId = "NA";
            }
            if (userProfile.Company == null )
            {
                userProfile.Company = "NA";
            }
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
