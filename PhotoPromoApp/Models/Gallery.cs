using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoPromo.Models
{
    public class Gallery
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int PhotoCount { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

    }
}
