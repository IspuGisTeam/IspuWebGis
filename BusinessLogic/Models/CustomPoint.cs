using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IspuWebGis.Models
{
    public class CustomPoint
    {
        public CustomPoint() { }
        public int? id { get; set; }
        public string address { get; set; }
        public float latitude  { get; set; }
        public float longitude { get; set; }
    }
}
