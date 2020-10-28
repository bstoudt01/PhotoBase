using PhotoPromo.Models;
using System.Collections.Generic;

namespace PhotoPromo.Repositories
{
    public interface IGalleryRepository
    {
        List<Gallery> GetAllGalleriesbyUserProfileId(int userProfileId);
       
        Gallery GetGalleryById(int id);
        
        void Add(Gallery gallery);
        
        void Update(Gallery gallery);
        
        void Delete(int id);
    }
}