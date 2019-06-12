using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddIndexIdent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "JewelryModels",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "GemstoneSources",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "GemstoneCuts",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "GemstoneClasses",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_JewelryModels_Identifier",
                table: "JewelryModels",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneSources_Identifier",
                table: "GemstoneSources",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneCuts_Identifier",
                table: "GemstoneCuts",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneClasses_Identifier",
                table: "GemstoneClasses",
                column: "Identifier",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_JewelryModels_Identifier",
                table: "JewelryModels");

            migrationBuilder.DropIndex(
                name: "IX_GemstoneSources_Identifier",
                table: "GemstoneSources");

            migrationBuilder.DropIndex(
                name: "IX_GemstoneCuts_Identifier",
                table: "GemstoneCuts");

            migrationBuilder.DropIndex(
                name: "IX_GemstoneClasses_Identifier",
                table: "GemstoneClasses");

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "JewelryModels",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "GemstoneSources",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "GemstoneCuts",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "GemstoneClasses",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
