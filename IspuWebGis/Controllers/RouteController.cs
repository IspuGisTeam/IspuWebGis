using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IspuWebGis.Models;
namespace IspuWebGis.Controllers
{
    [Produces("application/json")]
    [Route("api/route")]
    public class RouteController : Controller
    {
        [HttpPost]
        public RouteModel Get([FromBody]RouteModel route)
        {
            int i = 0;
            foreach (var p in route.points)
            {
                p.id = i++;
            }
            return route;
        }
        public class RouteModel
        { 
            public List<CustomPoint> points { get; set; }
        }
    }
}