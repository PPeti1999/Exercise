using ExerciseNote.WebAppApi.Data;
using ExerciseNote.WebAppApi.Models;
using ExerciseNote.WebAppApi.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using ExerciseNote.WebAppApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*builder.Services.AddCors(options =>
{
    
    var clientAppUrl = builder.Configuration.GetValue<string>("ClientAppUrl");

	options.AddPolicy("AllowOrigin", builder =>
	{
		builder
			.WithOrigins(clientAppUrl)
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});*/


builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

});
// be able inject JWTSERVICES class inside COntroller
builder.Services.AddScoped<JWTService>();
builder.Services.AddIdentityCore<User>(options =>
{
    options.Password.RequiredLength = 6;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;

    options.SignIn.RequireConfirmedEmail = true;
}).AddRoles<IdentityRole>()//abble to add roles
   .AddRoleManager<RoleManager<IdentityRole>>()//abel to make use RoleManager
   .AddEntityFrameworkStores<DataContext>()//providing  context
   .AddSignInManager<SignInManager<User>>()// make use of signin manager
   .AddUserManager<UserManager<User>>()// usermanager create users
   .AddDefaultTokenProviders();// able to create tokens for email confirm 
// able to auth users using JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // validate the token based on the key we have provided inside appsettings.development.json JWT:Key
            ValidateIssuerSigningKey = true,
            // the issuer singning key based on JWT:Key
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
            // the issuer which in here is the api project url we are using
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            // validate the issuer (who ever is issuing the JWT)
            ValidateIssuer = true,
            // don't validate audience (angular side)
            ValidateAudience = false,
           // ValidateLifetime = true,
           // ClockSkew = TimeSpan.Zero
        };
    });



//builder.Services.AddDbContext<DataContext>();
//majd ez kell
builder.Services.AddScoped<IBodyDiaryRepository, BodyDiaryRepository>();
builder.Services.AddScoped<IBodyDiaryWeeklyRepository, BodyDiaryWeeklyRepository>();
builder.Services.AddScoped<IWorkoutPlanRepositories, WorkoutPlanRepositories>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();
builder.Services.AddScoped<IExerciseTypeRepository, ExerciseTypeRepository>();





builder.Services.AddCors();// ez jó

builder.Services.Configure<ApiBehaviorOptions>(options =>// error kuldes ui ra
{
    options.InvalidModelStateResponseFactory = actionContext =>
    {
        var errors = actionContext.ModelState
        .Where(x => x.Value.Errors.Count > 0)
        .SelectMany(x => x.Value.Errors)
        .Select(x => x.ErrorMessage).ToArray();

        var toReturn = new
        {
            Errors = errors
        };

        return new BadRequestObjectResult(toReturn);
    };
});
var app = builder.Build();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(builder.Configuration["JWT:CLientUrl"]);
}

);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseCors("AllowOrigin");
app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();




app.MapControllers();

app.Run();
