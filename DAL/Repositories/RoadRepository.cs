
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class RoadRepository
    {
        public int GetNumberOfRoads()
        {
            var bd = new GisContext();
            var roads = bd.Roads.ToList();
            return roads.Count;
        }
    }
}