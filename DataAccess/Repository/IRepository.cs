using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repository
{
    public interface IRepository<T>
    {
        int Create(T item);
        bool Update(T item);
        T Get(int id);
        List<T> GetAll();
        bool Delete(T item);
    }
}
