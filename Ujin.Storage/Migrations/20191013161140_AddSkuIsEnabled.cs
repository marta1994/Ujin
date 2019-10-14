using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddSkuIsEnabled : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEnabled",
                table: "SkuDescriptions",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "UseInCatalog",
                table: "SkuDescriptions",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "SkuDescriptions");

            migrationBuilder.DropColumn(
                name: "UseInCatalog",
                table: "SkuDescriptions");
        }
    }
}
