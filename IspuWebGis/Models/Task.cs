using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IspuWebGis.Models
{
    public class Task
    {
        public Task()
        {

        }
        public int? id { get; set; }
        public string name { get; set; }
        public List<CustomPoint> points { get; set; }
        public DateTime  timeOfCreation { get; set; }

    }
}
