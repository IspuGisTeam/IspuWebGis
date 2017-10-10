using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataAccess.Model;
namespace DataAccess.Repository
{
    public class PointRepository : IRepository<Point>
    {
        public int Create(Point item)
        {
            int id = -1;
            using (GisContext db = new GisContext())
            {               
                id = db.Points.Add(item).Id;
                db.SaveChanges();  
            }
            return id;
        }

        public bool Delete(Point item)
        {
            using (GisContext db = new GisContext())
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

        public Point Get(int id)
        {
            Point point;
            using (GisContext db = new GisContext())
            {
                point = (Point)db.Points.Where(p => p.Id == id);
            }
            return point;
        }

        public List<Point> GetAll()
        {
            List<Point> points;
            using (GisContext db = new GisContext())
            {
                points = db.Points.ToList<Point>();
            }
            return points;
        }

        public bool Update(Point item)
        {
            using (GisContext db = new GisContext())
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
