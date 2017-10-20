using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class RoadService
    {
        public int GetNumberOfRoads()
        {
            var roadRepo = new RoadRepository();
            return roadRepo.GetNumberOfRoads();

        }
    }
}
