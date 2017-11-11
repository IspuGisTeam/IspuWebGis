using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IspuWebGis.Models;

namespace IspuWebGis.Controllers
{
    [Produces("application/json")]
    [Route("api/Tasks")]
    public class TasksController : Controller
    {
        [HttpGet]
        public Object Get()
        {
            var points1 = new List<CustomPoint>();
            points1.Add(new CustomPoint { id = 1, address = "address_text_1", latitude = 40.971f, longitude = 56.997f });
            points1.Add(new CustomPoint { id = 2, address = "address_text_2", latitude = 40.981f, longitude = 56.997f });
            points1.Add(new CustomPoint { id = 3, address = "address_text_3", latitude = 40.971f, longitude = 57.007f });
            var task1 = new Task { id = 1, name = "Triangle points", timeOfCreation = DateTime.Now, points = points1};

            var points2 = new List<CustomPoint>();
            points2.Add(new CustomPoint { id = 4, address = "address_text_4", latitude = 40.871f, longitude = 56.987f });
            points2.Add(new CustomPoint { id = 5, address = "address_text_5", latitude = 40.861f, longitude = 56.997f });
            var task2 = new Task { id = 2, name = "Line points", timeOfCreation = DateTime.Now, points = points2 };

            return new {tasks=new Task[] { task1, task2 } };
        }

        [HttpPost]
        public Task CreateTask([FromBody]Task task)
        {
            task.id = 5;
            int i = 0;
            foreach(var p in task.points)
            {
                p.id = i++;
            }
            return task;
        }
    }
}