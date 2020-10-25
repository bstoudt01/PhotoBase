using PhotoPromo.Models;
using System.Collections.Generic;

namespace PhotoPromo.Repositories
{
    public interface IGalleryRepository
    {
        void Add(Gallery gallery);
        void Delete(int id);
        List<Gallery> GetAllGalleriesbyUserProfileId(int userProfileId);
        Gallery GetGalleryById(int id);
        void Update(Gallery gallery);
    }
}