using DAL.Repositories;
using System;

namespace BLLNetStandart
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
