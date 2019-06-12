using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddIdentifiers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Identifier",
                table: "JewelryModels",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Identifier",
                table: "GemstoneSources",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Identifier",
                table: "GemstoneCuts",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Identifier",
                table: "GemstoneClasses",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Identifier",
                table: "JewelryModels");

            migrationBuilder.DropColumn(
                name: "Identifier",
                table: "GemstoneSources");

            migrationBuilder.DropColumn(
                name: "Identifier",
                table: "GemstoneCuts");

            migrationBuilder.DropColumn(
                name: "Identifier",
                table: "GemstoneClasses");
        }
    }
}
