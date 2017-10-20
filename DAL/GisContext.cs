
using DAL.Model;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace DAL
{
    public class GisContext : DbContext
    {
        public GisContext() : base("DBConnection")
        {
            Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);
        }


        public DbSet<Road> Roads { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

     
            modelBuilder.Entity<Road>().Property(x => x.Length).HasColumnType("numeric");
            
        }

      


      
    }
}
