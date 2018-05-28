using System;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using fantasy_hoops.Services;
using fantasy_hoops.Repositories;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly GameContext _context;
        private readonly UserRepository _repository;
        private readonly UserService _service;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = new GameContext();
            _repository = new UserRepository(_context);
            _service = new UserService(_context, userManager, signInManager);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!_repository.UserExists(model.UserName))
                return StatusCode(401, "You have entered an invalid username or password!");

            if (await _service.Login(model))
                return Ok(_service.RequestToken(model.UserName));
            return StatusCode(401, "You have entered an invalid username or password!");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            // Checking for duplicates usernames
            if (_repository.UserExists(model.UserName))
                return StatusCode(422, "Username is already taken!");

            // Check for username length
            if (!Regex.IsMatch(model.UserName, @"^.{4,11}$"))
                return StatusCode(422, "Username must be between 4 and 11 symbols long!");

            // Password validation
            if (!Regex.IsMatch(model.Password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$"))
                return StatusCode(422, "Password must contain: 8-20 characters. At least one uppercase letter. At least one number.");

            // Checking for duplicate email addresses
            if (_repository.EmailExists(model.Email))
                return StatusCode(422, "Email already has an user associated to it!");

            // Check if email is valid
            if (!Regex.IsMatch(model.Email, @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"))
                return StatusCode(422, "Entered email is invalid!");

            if (await _service.Register(model))
                return Ok("You have registered successfully!");
            return StatusCode(500, "Registration has failed!");
        }

        [Authorize]
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            _service.Logout();
            return Ok("You have signed out successfully!");
        }

        [HttpGet("{id}")]
        public IActionResult Get(String id, int start = 0, int count = 0)
        {
            var profile = _repository.GetProfile(id, start, count).FirstOrDefault();
            if(profile == null)
                return NotFound(String.Format("User with id {0} has not been found!", id));
            return Ok(profile);
        }

        [HttpGet("name/{name}")]
        public IActionResult GetByName(String name, int start = 0, int count = 0)
        {
            User user = _repository.GetUserByName(name);
            if (user == null)
                return NotFound(String.Format("User with name {0} has not been found!", name));
            return Get(user.Id);
        }

        [HttpGet("friends/{id}")]
        public IActionResult GetFriends(String id)
        {
            return Ok(_repository.GetFriends(id).ToList());
        }

        [HttpPut("editprofile")]
        public async Task<IActionResult> EditProfile([FromBody]EditProfileViewModel model)
        {
            // No duplicate usernames
            if (_context.Users.Where(x => x.UserName.ToLower().Equals(model.UserName.ToLower()) && !x.Id.Equals(model.Id)).Any())
                return StatusCode(409, "Username is already taken!");

            // Check for username length
            if (!Regex.IsMatch(model.UserName, @"^.{4,11}$"))
                return StatusCode(422, "Username must be between 4 and 11 symbols long!");

            // No duplicate emails
            if (_context.Users.Where(x => x.Email.ToLower().Equals(model.Email.ToLower()) && !x.Id.Equals(model.Id)).Any())
                return StatusCode(409, "Email already has an user associated to it!");

            // Check if email is valid
            if (!Regex.IsMatch(model.Email, @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"))
                return StatusCode(422, "Entered email is invalid!");

            // Password validation
            if (model.CurrentPassword.Length > 0 && model.NewPassword.Length > 0
                && !Regex.IsMatch(model.NewPassword, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$"))
                return StatusCode(422, "Password must contain: 8-20 characters. At least one uppercase letter. At least one number.");

            User user = _repository.GetUser(model.Id);
            if (user == null)
                return NotFound("User has not been found!");

            if(!(await _service.UpdateProfile(model)))
               return StatusCode(401, "Wrong current password!");

            return Ok(_service.RequestToken(model.UserName));
        }

        [HttpPost("uploadAvatar")]
        public IActionResult UploadAvatar([FromBody]AvatarViewModel model)
        {
            if (model.Avatar == null || model.Avatar.Length < 15)
                return StatusCode(400, "Please select a file!");

            if (model.Avatar == null || model.Avatar.Length < 15)
                return StatusCode(400, "Please select a file!");

            var fileType = model.Avatar.Substring(11, 3);
            if (!(fileType.Equals("png") || fileType.Equals("jpg")))
                return StatusCode(415, "Only .png and .jpg extensions are allowed!");

            if(!_service.UploadAvatar(model))
                return StatusCode(500, "Avatar cannot be uploaded!");
            return Ok("Avatar updated successfully!");
        }

        [HttpPost("clearAvatar")]
        public IActionResult ClearAvatar([FromBody]AvatarViewModel model)
        {
            if(!_service.ClearAvatar(model))
                return StatusCode(500, "Avatar cannot be cleared!");
            return Ok("Avatar cleared successfully!");
        }

        [HttpGet]
        public IActionResult GetUserPool()
        {
            return Ok(_repository.GetUserPool());
        }
    }
}