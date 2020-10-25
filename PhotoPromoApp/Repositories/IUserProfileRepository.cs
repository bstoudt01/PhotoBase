using PhotoPromo.Models;
using System.Collections.Generic;

namespace PhotoPromo.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void DeactivateProfile(int id);
        List<UserProfile> GetAllDeactivatedUserProfiles();
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        void ReactivateProfile(int id);
    }
}