using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public abstract class IRepository<T>
    {
        public DbContextOptions<GisContext> options;

        public IRepository() {
            var optionsBuilder = new DbContextOptionsBuilder<GisContext>();
            options = optionsBuilder.UseSqlServer("Server=webgisispu.database.windows.net;Database=WebGis;User Id=adminGis;Password=12345678aA;").Options;

        }

        public abstract int Create(T item);
        public abstract bool Update(T item);
        public abstract T Get(int id);
        public abstract List<T> GetAll();
        public abstract bool Delete(T item);
    }
}
