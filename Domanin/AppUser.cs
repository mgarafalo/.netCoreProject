using Microsoft.AspNetCore.Identity;

namespace Domanin
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }
}