
using Microsoft.SqlServer.Types;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Data.Entity;

namespace DAL.Model
{
    public class Road
    {
      

        public int Id { get; set; }
        public short Forward { get; set; }
        public short Backward { get; set; }
        public short Speed { get; set; }
        public DbGeometry Shape { get; set; }
        public int ObjectId { get; set; }
        public decimal Length { get; set; }

       
    }
    
}
