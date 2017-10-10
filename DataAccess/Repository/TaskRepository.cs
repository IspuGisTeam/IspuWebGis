using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Model;
using System.Linq;
namespace DataAccess.Repository
{
    class TaskRepository : IRepository<Task>
    {
        public int Create(Task item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Task item)
        {
            throw new NotImplementedException();
        }

        public Task Get(int id)
        {
            Task task;
            using (GisContext db = new GisContext())
            {
                task = (Task)db.Tasks.Where(p => p.Id == id);
            }
            return task;
        }

        public List<Task> GetAll()
        {
            throw new NotImplementedException();
        }

        public bool Update(Task item)
        {
            throw new NotImplementedException();
        }
    }
}
