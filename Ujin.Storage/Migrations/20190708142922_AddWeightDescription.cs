using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddWeightDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionKey",
                table: "JewelryModels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WeightExpression",
                table: "JewelryModels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionKey",
                table: "JewelryModels");

            migrationBuilder.DropColumn(
                name: "WeightExpression",
                table: "JewelryModels");
        }
    }
}
