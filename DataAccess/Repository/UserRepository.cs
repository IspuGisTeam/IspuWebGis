using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataAccess.Model;
namespace DataAccess.Repository
{
    class UserRepository : IRepository<User>
    {
        public int Create(User item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(User item)
        {
            throw new NotImplementedException();
        }

        public User Get(int id)
        {
            User user;
            using (GisContext db = new GisContext())
            {
               user  = (User)db.Users.Where(p => p.Id == id);
            }
            return user;
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public bool Update(User item)
        {
            throw new NotImplementedException();
        }
    }
}
