using ExerciseNote.WebAppApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ExerciseNote.WebAppApi.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options)
          : base(options)
        {
          //  InitializeData();
        } 
        public DbSet<Exercise> Exercise { get; set; } = default!;
        
        public DbSet<BodyDiaryWeekly> BodyDiaryWeekly { get; set; } = default!;
        public DbSet<WorkoutPlan> WorkoutPlan { get; set; } = default!;
        public DbSet<BodyDiary> BodyDiary { get; set; } = default!;
        public DbSet<ExerciseType> ExerciseType { get; set; }
        //public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Identity tables
            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("AspNetRoleClaims");
            modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("AspNetUserClaims");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("AspNetUserLogins").HasKey(x => x.UserId); // Define primary key
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles");
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("AspNetUserTokens").HasKey(x => x.UserId); // Define primary key
            modelBuilder.Entity<Exercise>()
            .Property(n => n.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<ExerciseType>()
                .Property(n => n.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Photo>()
                .Property(i => i.Id)
                .ValueGeneratedOnAdd();


            modelBuilder.Entity<Exercise>()
                .Navigation(x => x.Type)
                .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder.Entity<Exercise>()
                .Navigation(x => x.Photo)
                .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder.Entity<ExerciseType>()
                .HasIndex(u => u.Name)
                .IsUnique();

            modelBuilder.Entity<Photo>().HasData(
                new Photo { Id = "06bc94a6-91c0-4e60-9048-b68970dd8036", PhotoData = null}
            );

            modelBuilder.Entity<Exercise>().HasData(
                new Exercise { Id = "1", Title = "Deadlift", ExerciseTypeId = "1", Body = "What are the 3 keys to proper deadlift technique? Three important keys to proper dead lift technique are maintaining a neutral spine (not rounded), keep the core tight and pushing down through the legs and feet to create more leg muscle activity.", PhotoId = null, Created_at= DateTime.Now },
                 new Exercise { Id = "1aa17f7b-ba9d-4ff2-9d1d-41ae2be92d0d", Title = "Cable Crossover", ExerciseTypeId = "2", Body = "Cable Crossover\r\nWhy do it: “Cable machines provide constant tension throughout the range of motion, so you get similar hypertrophy at lower loads compared with free weights,” says Caine. “The cable crossover is particularly great at isolating the chest muscles.”\r\n\r\nHow to do it:\r\n\r\nAttach a D-handle to your cable machine and set the pulley to the highest position.\r\nGrab a handle with each hand, using a neutral grip, then position yourself so that you are standing dead center of the cable machine. Step forward to create tension.\r\nLean your upper body forward, maintaining a slight bend in the elbow.\r\nPull the handles down and across your body, squeezing your chest muscles at lockout.\r\nSlowly guide the handles back to the starting position.\r\nReset and repeat for reps.", PhotoId = null, Created_at = DateTime.Now },
                  new Exercise { Id = "7ab7aac2-a6fd-4bd6-b445-fcacb3b88a6f", Title = "Lat pulldown", ExerciseTypeId = "1", Body = "Why it’s on the list: The lat pulldown is a great staple exercise for building a strong back. You can complete a lat pulldown on a machine at the gym or with a resistance band.\r\n\r\nMuscles worked: As you can probably guess, lat pulldowns mainly target the latissimus dorsi, a large muscle located in the middle and lower back. This exercise also targets the trapezius, rotator cuff, posterior deltoids, rhomboids, biceps, and forearms.\r\nDirections:\r\n\r\nIf you’re using a machine, position the pad so it’s touching your thighs. Stand up and grab the bar with hands wider than shoulder-width apart, then sit back down.\r\nBegin to pull the bar down toward your chest, bending your elbows and pointing them toward the floor. Engage your upper back and mid-back throughout the move. Keep your torso straight, and don’t allow yourself to lean back.\r\nComplete 1–3 sets of 8–12 reps.", PhotoId = null, Created_at = DateTime.Now },
                   new Exercise { Id = "ba389e77-5f31-410b-bd1c-15692a7faadd", Title = " Incline Dumbbell Row", ExerciseTypeId = "1", Body = "The incline row is a supported row movement that allows you to isolate the back muscles without having to worry about holding yourself in a bent-over position.\r\n\r\nThis variation can be helpful for beginners who struggle to keep their back flat during bent-over rows, or more advanced lifters who want to train back row intensity but do not want to have the lower back or hamstrings limit them.\r\n\r\nHow To Do It\r\nSet an incline bench on a low angle, and lie face down on the bench. Your chest and head should be hanging off the end of the bench.\r\nWith your arms fully extended below you (while holding dumbbells), row the weights to the sides of your body (to your ribcage/hips), without lifting the chest more than a few inches off the bench.\r\nPause at the top of the movement, then lower theri weights slowly, making sure to fully straighten the arms at the bottom (and spread your shoulder blades apart).\r\n\r\n\r\nPro Tip\r\nThink about pulling your elbows to your hips, as this will help you use more of your back muscles than if you think about pulling your hands to your body (people tend to then use more biceps).", PhotoId = null, Created_at = DateTime.Now },
                    new Exercise { Id = "c8157b93-a3ec-47f8-adf1-3aa874dfdc5b", Title = "Barbell Bench Press", ExerciseTypeId = "2", Body = "Why do it: The barbell bench press is ostensibly the most popular lift in the world, and for good reason. Few exercises provide as much upper body muscle activation, meaning you should see substantial increases in your chest muscle size and strength by bench pressing regularly.\r\n\r\nHow to do it:\r\n\r\nLie on a flat bench beneath a racked and loaded barbell.\r\nGrip the bar with your hands slightly outside of shoulder-width.\r\nInhale deeply, brace your core, pinch your shoulder blades together, and exhale as you unrack the bar, positioning it directly over your chest muscles.\r\nInhale again as you lower the bar to your chest, lightly touching at the bottom.\r\nExhale as you push the bar back to the starting position.\r\nContinue for reps then rerack before the next set. ", PhotoId = null, Created_at = DateTime.Now },
                     new Exercise { Id = "cfcb7b9f-d4c3-47e4-8633-03db75bacb0e", Title = "Push-Up", ExerciseTypeId = "2", Body = "Why do it: We all know push-ups are the quintessential bodyweight movement, but what does exercise science say? According to the Journal of Exercise Science and Fitness3, push-ups are “comparably effective for muscle hypertrophy and strength gain” as a low-load bench press.\r\n\r\nHow to do it:\r\n\r\nPlace your hands shoulder-width apart on the floor, then step both feet back to get into a high plank position. Your body should form a straight line from head to feet.\r\nBend your elbows to lower yourself to the floor.\r\nLightly touch the floor with your chest, then push yourself back up.\r\nRepeat for reps.", PhotoId = null, Created_at = DateTime.Now }


                    );
            modelBuilder.Entity<ExerciseType>().HasData(
                new ExerciseType { Id = "1", Name = "Back" },
                new ExerciseType { Id = "2", Name = "Chest" },
                new ExerciseType { Id = "3", Name = "Legs" }
            );
            modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = "085771b8-55d6-4b2b-91f3-2accdfd12073",
                UserName = "pasztoripeti@hotmail.com",
                NormalizedUserName = "PASZTORIPETI@HOTMAIL.COM",
                Email = "pasztoripeti@hotmail.com",
                NormalizedEmail = "PASZTORIPETI@HOTMAIL.COM",
                EmailConfirmed = true,
                PasswordHash = "AQAAAAIAAYagAAAAECBoaNB2n8ZVobY/CDh3gaTdUpyxKLBgSrspHHPEKiQmCO/BSI1w+7jYo6Ty7IFwEA==", // Jelszó: password
                SecurityStamp = "XF45CN4VBWDFSIA7BPSS74QZUYHP2JNN",
                ConcurrencyStamp = "fef26f8a-120b-4e7f-b37e-d844c5871a35",
                FirstName = "pásztori",
                LastName = "péter",
                DateCreated = DateTime.UtcNow
            }
        );

        }
    }
}
