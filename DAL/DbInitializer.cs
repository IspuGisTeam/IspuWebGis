using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    class DbInitializer
    {
        public static void Initialize()
        {
            Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);
            GisContext context = new GisContext();
            

            var roads = new Road[]
            {
                    new Road
                    {
                        Backward = 1,
                        Forward =0,
                        Id = 1,
                        Length = 23,
                        Shape =null,
                        ObjectId = 0,
                        Speed = 50
                    }
            };

            context.Roads.AddRange(roads);
            context.SaveChanges();
        }

    }
}

