using System;
using System.Collections.Generic;
using System.Text;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using DataAccess.Model;
 
namespace DataAccess
{
    class GisContext : DbContext
    {       
        public GisContext() : base("DBConnectionString") {}

        public DbSet<Road> Roads { get; set; }
        public DbSet<Point> Points { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new CustomConfiguration());
            modelBuilder.Entity<Task>().ToTable("Tasks");
            modelBuilder.Entity<Road>().ToTable("Roads");
            modelBuilder.Entity<Point>().ToTable("Points");
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }

    class CustomConfiguration : EntityTypeConfiguration<Road>
    {
        internal CustomConfiguration()
        {
            Property(x => x.Length).HasColumnType("numeric(38,8)");
        }
    }
}
