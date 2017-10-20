namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _123456 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Roads", "Length", c => c.Decimal(nullable: false, precision: 38, scale: 8, storeType: "numeric"));
        }

        public override void Down()
        {
            AlterColumn("dbo.Roads", "Length", c => c.Decimal(nullable: false, precision: 18, scale: 0, storeType: "numeric"));
        }
    }
}
