using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Services
{
    interface IUserService
    {

        Task<bool> Login(LoginViewModel model);
        Task<bool> Register(RegisterViewModel model);
        void Logout();
        string RequestToken(string username);
        Task<bool> UpdateProfile(EditProfileViewModel model);
        bool UploadAvatar(AvatarViewModel model);
        bool ClearAvatar(AvatarViewModel model);

    }
}
