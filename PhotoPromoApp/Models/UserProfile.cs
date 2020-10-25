using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoPromo.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        public string FirebaseUserId { get; set; }

        public string FacebookUserId { get; set; }

        public int IsDeactivated { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public string LogoLocation { get; set; }

        public string Email { get; set; }

        public string Company { get; set; }

        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

    }
}
