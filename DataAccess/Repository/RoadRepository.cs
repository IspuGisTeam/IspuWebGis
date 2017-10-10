using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataAccess.Model;
namespace DataAccess.Repository
{
    class RoadRepository : IRepository<Road>
    {
        public int Create(Road item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Road item)
        {
            throw new NotImplementedException();
        }

        public Road Get(int id)
        {
            Road road;
            using (GisContext db = new GisContext())
            {
                road = (Road)db.Roads.Where(p => p.Id == id);
            }
            return road;
        }

        public List<Road> GetAll()
        {
            throw new NotImplementedException();
        }

        public bool Update(Road item)
        {
            throw new NotImplementedException();
        }
    }
}
