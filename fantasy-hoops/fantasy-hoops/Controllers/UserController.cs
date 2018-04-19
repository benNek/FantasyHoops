﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IO;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly GameContext context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            context = new GameContext();
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            model.UserName = context.Users.Where(x => x.UserName.ToLower().Equals(model.UserName.ToLower())).Select(x => x.UserName).FirstOrDefault();
            if (model.UserName == null)
                return StatusCode(401, "You have entered an invalid username or password!");

            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return RequestToken(model.UserName);
            }
            return StatusCode(401, "You have entered an invalid username or password!");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            // Checking for duplicates usernames
            if (context.Users.Where(x => x.UserName.ToLower().Equals(user.UserName.ToLower())).Any())
                return StatusCode(422, "Username is already taken!");

            // Checking for duplicate email addresses
            if (context.Users.Where(x => x.Email.ToLower().Equals(user.Email.ToLower())).Any())
                return StatusCode(422, "Email already has an user associated to it!");

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok("You have registered successfully!");
            }
            return BadRequest(result.ToString());
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("You have signed out successfully!");
        }

        public IActionResult RequestToken(String username)
        {
            var user = context.Users.Where(x => x.UserName.ToLower().Equals(username.ToLower())).FirstOrDefault();
            var claims = new[]
            {
                new Claim("id", user.Id),
                new Claim("username", user.UserName),
                new Claim("email", user.Email),
                new Claim("description", user.Description ??""),
                new Claim("team", user.Team != null ? user.Team.Name : "")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Tai yra raktas musu saugumo sistemai, kuo ilgesnis tuo geriau?"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "nekrosius.com",
                audience: "nekrosius.com",
                claims: claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: creds);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        [HttpGet("{id}")]
        public IActionResult Get(String id)
        {
            var team = context.Teams
                .Where(x => x.TeamID == context.Users
                    .Where(y => y.Id.Equals(id))
                    .Select(y => y.FavoriteTeamId)
                    .FirstOrDefault())
                .FirstOrDefault();
            if (team == null)
            {
                team = new Team()
                {
                    City = "Seattle",
                    Name = "Supersonics",
                    Color = "#FFC200"
                };
            }

            var user = context.Users
                .Where(x => x.Id.Equals(id))
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    x.Email,
                    x.Description,
                    x.FavoriteTeamId,

                    Team = new
                    {
                        Name = team.City + " " + team.Name,
                        team.Color
                    }
                })
            .FirstOrDefault();
            if (user == null)
                return NotFound(String.Format("User with id {0} has not been found!", id));
            return Ok(user);
        }

        [HttpPut("editprofile")]
        public async Task<IActionResult> EditProfile([FromBody]EditProfileView model)
        {
            // No duplicate usernames
            if (context.Users.Where(x => x.UserName.ToLower().Equals(model.UserName.ToLower()) && !x.Id.Equals(model.Id)).Any())
                return StatusCode(409, "Username is already taken!");
            // No duplicate emails
            if (context.Users.Where(x => x.Email.ToLower().Equals(model.Email.ToLower()) && !x.Id.Equals(model.Id)).Any())
                return StatusCode(409, "Email already has an user associated to it!");

            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return NotFound("User has not been found!");
            }

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Description = model.Description;
            user.FavoriteTeamId = model.FavoriteTeamId;

            await _userManager.UpdateAsync(user);
            if (model.CurrentPassword.Length > 0 && model.NewPassword.Length > 0)
            {
                var result = _userManager.CheckPasswordAsync(user, model.CurrentPassword);
                if (!result.Result)
                    return StatusCode(401, "Wrong current password!");
                await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            }
            return Ok(RequestToken(user.UserName));
        }

        [HttpPost("uploadAvatar")]
        public IActionResult UploadAvatar([FromBody]AvatarViewModel model)
        {
            string avatarDir = @"./ClientApp/content/images/avatars";
            if (!Directory.Exists(avatarDir))
                Directory.CreateDirectory(avatarDir);
            var filePath = avatarDir + "/" + model.Id + ".png";
            if (model.Avatar == null || model.Avatar.Length < 15)
                return StatusCode(400, "Please select a file!");

            var fileType = model.Avatar.Substring(11, 3);
            if (!(fileType.Equals("png") || fileType.Equals("jpg")))
                return StatusCode(415, "Only .png and .jpg extensions are allowed!");
            model.Avatar = model.Avatar.Substring(22);
            try
            {
                System.IO.File.WriteAllBytes(filePath, Convert.FromBase64String(model.Avatar));
            }
            catch
            {
                return StatusCode(500, "Avatar cannot be uploaded!");
            }
            return Ok("Avatar updated successfully!");
        }

        [HttpPost("clearAvatar")]
        public IActionResult ClearAvatar([FromBody]AvatarViewModel model)
        {
            string avatarDir = @"./ClientApp/content/images/avatars";
            if (Directory.Exists(avatarDir))
            {
                var filePath = avatarDir + "/" + model.Id + ".png";
                if (System.IO.File.Exists(filePath))
                {
                    try
                    {
                        System.IO.File.Delete(filePath);
                    }
                    catch
                    {
                        return StatusCode(500, "Avatar cannot be cleared!");
                    }
                    return Ok("Avatar cleared successfully!");
                }
                return StatusCode(404, "Your avatar is already cleared!");
            }
            return StatusCode(404, "Your avatar is already cleared!");
        }
    }
}