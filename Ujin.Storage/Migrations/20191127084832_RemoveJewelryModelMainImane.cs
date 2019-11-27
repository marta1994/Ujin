using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class RemoveJewelryModelMainImane : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainImage",
                table: "JewelryModels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MainImage",
                table: "JewelryModels",
                nullable: true);
        }
    }
}
