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
        public DbSet<BodyDiary> BodyDiary { get; set; } = default!;
        public DbSet<ExerciseType> ExerciseType { get; set; }
        //public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        /*
        private void InitializeData()
        {
            if (!Exercise.Any() && !ExerciseType.Any() && !Photos.Any())
            {
                // Példa ExerciseType hozzáadása
                var exerciseTypes = new ExerciseType[]
                {
                     new ExerciseType { Id = "1", Name = "Back" },
                    new ExerciseType { Id = "2", Name = "Chest" },
                    new ExerciseType { Id = "3", Name = "Legs" }
                };
                ExerciseType.AddRange(exerciseTypes);

                // Példa Photo hozzáadása
                var photos = new Photo[]
                {
                    new Photo { Id = "1", PhotoData = "https://picsum.photos/200/300" },
                    new Photo { Id = "2", PhotoData = "https://picsum.photos/id/237/200/300" },
                    new Photo { Id = "3", PhotoData = "https://picsum.photos/seed/picsum/200/300" },
                    new Photo { Id = "4", PhotoData = "https://picsum.photos/200/300?grayscale" },
                    new Photo { Id = "5", PhotoData = "https://picsum.photos/200/300/?blur" },
                    new Photo { Id = "6", PhotoData = "https://picsum.photos/id/870/200/300?grayscale&blur=2" }
                };
                Photos.AddRange(photos);

                // Példa Exercise hozzáadása
                var exercises = new Exercise[]
                {
                    new Exercise { Id = "1", Title = "Lehúzás", ExerciseTypeId = "1", Body= "Just Do it.", PhotoId= "1" },
                    new Exercise { Id = "2", Title = "Húzódzkodás", ExerciseTypeId = "2", Body = "Hurry Up!", PhotoId = "2" },
                    new Exercise { Id = "3", Title = "Lehúzás1", ExerciseTypeId = "1", Body = "Just Do it.1", PhotoId = "3" },
                    new Exercise { Id = "4", Title = "Húzódzkodás1", ExerciseTypeId = "2", Body = "Hurry Up!1", PhotoId = "4" },
                    new Exercise { Id = "5", Title = "Lehúzás2", ExerciseTypeId = "1", Body = "Just Do it.2", PhotoId = "5" },
                    new Exercise { Id = "6", Title = "Húzódzkodás2", ExerciseTypeId = "2", Body = "Hurry Up!2", PhotoId = "6" }

                };
                Exercise.AddRange(exercises);

                SaveChanges();
            }
        }*/
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
                new Photo { Id = "1", PhotoData = null},
                new Photo { Id = "2", PhotoData = null },
                new Photo { Id = "3", PhotoData = null },
                new Photo { Id = "4", PhotoData = null },
                new Photo { Id = "5", PhotoData = null },
                new Photo { Id = "6", PhotoData = null }
            );

            modelBuilder.Entity<Exercise>().HasData(
                new Exercise { Id = "1", Title = "Lehúzás", ExerciseTypeId = "1", Body = "Just Do it.", PhotoId = "1" },
                new Exercise { Id = "2", Title = "Húzódzkodás", ExerciseTypeId = "2", Body = "Hurry Up!", PhotoId = "2" },
                new Exercise { Id = "3", Title = "Lehúzás1", ExerciseTypeId = "1", Body = "Just Do it.1", PhotoId = "3" },
                new Exercise { Id = "4", Title = "Húzódzkodás1", ExerciseTypeId = "2", Body = "Hurry Up!1", PhotoId = "4" },
                new Exercise { Id = "5", Title = "Lehúzás2", ExerciseTypeId = "1", Body = "Just Do it.2", PhotoId = "5" },
                new Exercise { Id = "6", Title = "Húzódzkodás2", ExerciseTypeId = "2", Body = "Hurry Up!2", PhotoId = "6" }

                    );
            modelBuilder.Entity<ExerciseType>().HasData(
                new ExerciseType { Id = "1", Name = "Back" },
                new ExerciseType { Id = "2", Name = "Chest" },
                new ExerciseType { Id = "3", Name = "Legs" }
            );
           
        }
    }
}
