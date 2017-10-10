using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
namespace DataAccess.Repository
{
    public class PointRepository : IRepository<Point>
    {
        public override int Create(Point item)
        {
          
            int id = -1;
            using (GisContext db = new GisContext(options))
            {
                id = db.Points.Add(item).Entity.Id;
                db.SaveChanges();  
            }
            return id;
        }

        public override bool Delete(Point item)
        {
            using (GisContext db = new GisContext(options))
            {
                Point point = Get(item.Id);
                if (point != null)
                {
                    db.Points.Remove(point);
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public override Point Get(int id)
        {
            Point point;
            using (GisContext db = new GisContext(options))
            {
                point = (Point)db.Points.Where(p => p.Id == id);
            }
            return point;
        }

        public override List<Point> GetAll()
        {
            List<Point> points;
            using (GisContext db = new GisContext(options))
            {
                points = db.Points.ToList<Point>();
            }
            return points;
        }

        public override bool Update(Point item)
        {
            using (GisContext db = new GisContext(options))
            {
                Point point = Get(item.Id);

                if (point != null)
                {
                    point.Rank = item.Rank;
                    point.Address = item.Address;
                    point.Shape = item.Shape;
                    point.TaskId = item.TaskId;
                    db.SaveChanges();
                    return true;
                }
            }
            return false;
        }
    }
}
