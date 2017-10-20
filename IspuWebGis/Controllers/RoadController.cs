using BLL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IspuWebGis.Controllers
{
    [Produces("application/json")]
    [Route("api/Road")]
    public class RoadController : Controller
    {
        [HttpGet]
        public int Get()
        {
            var roadService = new RoadService();
            return roadService.GetNumberOfRoads();
        }
        
    }
}
