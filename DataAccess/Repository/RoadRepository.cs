using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataAccess.Model;
namespace DataAccess.Repository
{
    class RoadRepository : IRepository<Road>
    {
        public override int Create(Road item)
        {
            throw new NotImplementedException();
        }

        public override bool Delete(Road item)
        {
            throw new NotImplementedException();
        }

        public override Road Get(int id)
        {
            Road road;
            using (GisContext db = new GisContext(options))
            {
                road = (Road)db.Roads.Where(p => p.Id == id);
            }
            return road;
        }

        public override List<Road> GetAll()
        {
            throw new NotImplementedException();
        }

        public override bool Update(Road item)
        {
            throw new NotImplementedException();
        }
    }
}
