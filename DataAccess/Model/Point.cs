using System;
using System.Collections.Generic;
using Microsoft.SqlServer.Types;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Model
{
    public class Point
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TaskId { get; set; }
        public int Rank { get; set; }
        public string Address { get; set; }
        public SqlGeometry Shape { get; set; }
    }
}
