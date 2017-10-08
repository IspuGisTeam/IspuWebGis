using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Globalization;

namespace IspuWebGis.Models
{
    public class TaskWithoutId
    {
        public string name { get; set; }
        public List<CustomPointWithoutId> points { get; set; }
        public string timeOfCreation { get; set; }
        [IgnoreDataMember]
        public DateTime TimeOfCreation
        {
            get
            {
                return DateTime.ParseExact(timeOfCreation, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);
            }
        }
    }
}
