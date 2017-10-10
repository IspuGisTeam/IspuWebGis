using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.ModelConfiguration;
using DataAccess.Model; 

namespace DataAccess
{
    public class GisContext : DbContext
    {

        public GisContext(DbContextOptions<GisContext> options)
            : base(options)
        { }

        public DbSet<Road> Roads { get; set; }
        public DbSet<Point> Points { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Road>().ToTable("Tasks");
            modelBuilder.Entity<Road>().ToTable("Roads");
            modelBuilder.Entity<Point>().ToTable("Points");
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<Road>().Property(b => b.Length).HasColumnType("numeric(38,8)");
           
        }
    }
}
