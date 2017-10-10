using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataAccess.Model;
namespace DataAccess.Repository
{
    class UserRepository : IRepository<User>
    {
        public override int Create(User item)
        {
            throw new NotImplementedException();
        }

        public override bool Delete(User item)
        {
            throw new NotImplementedException();
        }

        public override User Get(int id)
        {
            User user;
            using (GisContext db = new GisContext(options))
            {
               user  = (User)db.Users.Where(p => p.Id == id);
            }
            return user;
        }

        public override List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public override bool Update(User item)
        {
            throw new NotImplementedException();
        }
    }
}
