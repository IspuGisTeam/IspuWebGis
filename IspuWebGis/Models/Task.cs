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
        public Task(TaskWithoutId taskWithoutId)
        {
            name = taskWithoutId.name;
            int i = 0;
            points = taskWithoutId.points.Select(p => new CustomPoint(p, i++)).ToList();
            timeOfCreation = taskWithoutId.TimeOfCreation;
        }
        public int id { get; set; }
        public string name { get; set; }
        public List<CustomPoint> points { get; set; }
        public DateTime timeOfCreation { get; set; }
    }
}
