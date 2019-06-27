using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddConfigOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasePrice",
                table: "JewelryModels");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "ModelConfigurations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "ModelConfigurations");

            migrationBuilder.AddColumn<double>(
                name: "BasePrice",
                table: "JewelryModels",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
