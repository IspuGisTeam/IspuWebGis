using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Model;
using System.Linq;
namespace DataAccess.Repository
{
    class TaskRepository : IRepository<Task>
    {
        public override int Create(Task item)
        {
            throw new NotImplementedException();
        }

        public override bool Delete(Task item)
        {
            throw new NotImplementedException();
        }

        public override Task Get(int id)
        {
            Task task;
            using (GisContext db = new GisContext(options))
            {
                task = (Task)db.Tasks.Where(p => p.Id == id);
            }
            return task;
        }

        public override List<Task> GetAll()
        {
            throw new NotImplementedException();
        }

        public override bool Update(Task item)
        {
            throw new NotImplementedException();
        }
    }
}
