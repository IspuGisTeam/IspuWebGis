using IspuWebGis.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogic
{
    public class RouteCalculation
    {
        public string Calculate(List<CustomPoint> points)
        {
            //LINESTRING (30 10, 10 30, 40 40)
            var numbers = points.Select(point => string.Format("{0} {1}", point.latitude, point.longitude));
            string numberLine = string.Join(',', numbers);
            string resultLine = string.Format("LINESTRING ({0})", numberLine);
            return resultLine;
        }

        /*
         * var list = new List<CustomPoint>();
            list.Add(new CustomPoint { latitude = 50, longitude = 20 });
            list.Add(new CustomPoint { latitude = 30, longitude = 30 });
            list.Add(new CustomPoint { latitude = 10, longitude = 80 });
            string result = new RouteCalculation().Calculate(list);
         * */
    }
}
