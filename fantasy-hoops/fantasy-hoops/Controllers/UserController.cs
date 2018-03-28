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
                return RequestToken(model);
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
            return BadRequest("Unknown error");
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("You have signed out successfully!");
        }

        public IActionResult RequestToken(LoginViewModel model)
        {
            var user = context.Users.Where(x => x.UserName.ToLower().Equals(model.UserName.ToLower())).FirstOrDefault();
            var claims = new[]
            {
                new Claim("id", user.Id),
                new Claim("username", user.UserName),
                new Claim("email", user.Email),
                new Claim("description", user.Description != null ? user.Description : ""),
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

        [HttpPost("avatar")]
        public async Task<IActionResult> Post([FromBody]AvatarViewModel model)
        {
            string avatarDir = @"./ClientApp/content/images/avatars";
            if (!Directory.Exists(avatarDir))
                Directory.CreateDirectory(avatarDir);
            var filePath = avatarDir + "/" + model.Id + ".png";
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

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return context.Users
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    x.Email,
                    x.Description,
                    x.Team,
                })
                .ToList();
        }
        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            var user = context.Users
                .Where(x => x.UserName == username)
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    x.Email,
                    x.Description,
                    x.Team,
                })
                .ToList()
                .FirstOrDefault();
            if (user == null)
                return NotFound(new { error = String.Format("User with username {0} has not been found!", username) });
            return Ok(user);
        }

    }
}