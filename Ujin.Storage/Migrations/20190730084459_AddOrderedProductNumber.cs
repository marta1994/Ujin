using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddOrderedProductNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "OrderedProducts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "OrderedProducts");
        }
    }
}
