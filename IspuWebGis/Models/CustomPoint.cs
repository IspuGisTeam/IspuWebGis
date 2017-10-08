using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IspuWebGis.Models
{
    public class CustomPoint
    {
        public CustomPoint() { }
        public CustomPoint(CustomPointWithoutId customPointWithoutId, int id) {
            this.id = id;
            address = customPointWithoutId.address;
            latitude = customPointWithoutId.latitude;
            longitude = customPointWithoutId.longitude;
        }
        public int id { get; set; }
        public string address { get; set; }
        public int latitude  { get; set; }
        public int longitude { get; set; }
    }
}
