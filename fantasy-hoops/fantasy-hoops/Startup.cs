using fantasy_hoops.Database;
using fantasy_hoops.Models;
using FluentScheduler;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;

namespace fantasy_hoops
{
    public class Startup
    {
        private GameContext _context;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddDbContext<GameContext>();
            services.AddScoped<GameContext>(); // 'scoped' in ASP.NET means "per HTTP request"

            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.Password.RequireDigit = false;
                config.Password.RequireLowercase = false;
                config.Password.RequireUppercase = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequiredLength = 8;
                config.SignIn.RequireConfirmedEmail = false;
            })
            .AddEntityFrameworkStores<GameContext>()
            .AddDefaultTokenProviders();

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = "nekrosius.com",

                ValidateAudience = true,
                ValidAudience = "nekrosius.com",

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Tai yra raktas musu saugumo sistemai, kuo ilgesnis tuo geriau?")),

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = "nekrosius.com";
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            _context = new GameContext();
            _context.Database.Migrate();

            var task = Seed.InitializeAsync(_context);
            Task.Run(() => Seed.UpdateTeamColors(_context));

            task.Wait();
            Run(_context);
        }

        private static void Run(GameContext _context)
        {
            var registry = new Registry();
            JobManager.Initialize(registry);

            JobManager.AddJob(() => Task.Run(() => InjuriesSeed.Initialize(_context)), s => s
                .ToRunOnceAt(DateTime.Now.AddSeconds(10))
                .AndEvery(30)
                .Minutes());

            JobManager.AddJob(() => Task.Run(() => PhotosSeed.Initialize(_context)), s => s
                .ToRunOnceAt(DateTime.Now.AddSeconds(30))
                .AndEvery(1)
                .Days()
                .At(00, 00));

            JobManager.AddJob(() => Task.Run(() => StatsSeed.Initialize(_context)), s => s
                .ToRunOnceAt(DateTime.Now.AddMinutes(5))
                .AndEvery(1)
                .Days()
                .At(12, 00));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
