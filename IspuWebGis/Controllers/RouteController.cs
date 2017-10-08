using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IspuWebGis.Controllers
{
    [Produces("application/json")]
    [Route("api/route")]
    public class RouteController : Controller
    {
        [HttpPost]
        public RouteModel Get([FromBody]RouteModel route)
        {
            return route;
        }
        public class Point
        {
            public string address { get; set; }
            public int longitude { get; set; }
            public int latitude { get; set; }
        }
        public class RouteModel
        { 
            public List<Point> points { get; set; }
        }
    }
}