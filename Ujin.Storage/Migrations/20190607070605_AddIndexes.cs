using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddIndexes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "ModelConfigurations",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "Metals",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "JewelryModels",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ModelState",
                table: "JewelryModels",
                nullable: false,
                defaultValue: -1);

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "GemstoneSources",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "GemstoneCuts",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "GemstoneClasses",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "Colors",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ColorHexCode",
                table: "Colors",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Metals_NameKey",
                table: "Metals",
                column: "NameKey");

            migrationBuilder.CreateIndex(
                name: "IX_JewelryModels_NameKey",
                table: "JewelryModels",
                column: "NameKey");

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneSources_NameKey",
                table: "GemstoneSources",
                column: "NameKey");

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneCuts_NameKey",
                table: "GemstoneCuts",
                column: "NameKey");

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneClasses_NameKey",
                table: "GemstoneClasses",
                column: "NameKey");

            migrationBuilder.CreateIndex(
                name: "IX_Colors_ColorHexCode",
                table: "Colors",
                column: "ColorHexCode");

            migrationBuilder.CreateIndex(
                name: "IX_Colors_NameKey",
                table: "Colors",
                column: "NameKey");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Metals_NameKey",
                table: "Metals");

            migrationBuilder.DropIndex(
                name: "IX_JewelryModels_NameKey",
                table: "JewelryModels");

            migrationBuilder.DropIndex(
                name: "IX_GemstoneSources_NameKey",
                table: "GemstoneSources");

            migrationBuilder.DropIndex(
                name: "IX_GemstoneCuts_NameKey",
                table: "GemstoneCuts");

            migrationBuilder.DropIndex(
                name: "IX_GemstoneClasses_NameKey",
                table: "GemstoneClasses");

            migrationBuilder.DropIndex(
                name: "IX_Colors_ColorHexCode",
                table: "Colors");

            migrationBuilder.DropIndex(
                name: "IX_Colors_NameKey",
                table: "Colors");

            migrationBuilder.DropColumn(
                name: "ModelState",
                table: "JewelryModels");

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "ModelConfigurations",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "Metals",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "JewelryModels",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "GemstoneSources",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "GemstoneCuts",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "GemstoneClasses",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "Colors",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ColorHexCode",
                table: "Colors",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
