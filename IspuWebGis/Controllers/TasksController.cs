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
            var points = new List<CustomPoint>();
            points.Add(new CustomPoint { id = 2, address = "address_text", latitude = 50, longitude = 45 });
            var task = new Task { id = 5, name = "task_name", timeOfCreation = DateTime.Now, points = points};
            return new {tasks=new Task[] { task } };
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