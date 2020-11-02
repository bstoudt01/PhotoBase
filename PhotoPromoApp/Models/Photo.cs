using System;


namespace PhotoPromo.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string PhotoLocation { get; set; }

        public bool IsPublic { get; set; }

        public string Attribute { get; set; }

        public int ResolutionLevel { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public int GalleryId { get; set; }

        public Gallery Gallery { get; set; }


    }
}
