using System;
using System.Collections.Generic;
using Microsoft.SqlServer.Types;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Model
{
    public class Task
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Mode { get; set; }
        public DateTime Time { get; set; }
        public SqlGeometry Route { get; set; }
        public bool isFavorite { get; set; }
        public ICollection<Point> Points { get; set; }
    }
}
