using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddUniqueIdentifiers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "ModelConfigurations",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "ModelConfigurations",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "Metals",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "Gemstones",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_ModelConfigurations_Identifier_JewelryModelId",
                table: "ModelConfigurations",
                columns: new[] { "Identifier", "JewelryModelId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ModelConfigurations_NameKey_JewelryModelId",
                table: "ModelConfigurations",
                columns: new[] { "NameKey", "JewelryModelId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Metals_Identifier",
                table: "Metals",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Gemstones_Identifier",
                table: "Gemstones",
                column: "Identifier",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ModelConfigurations_Identifier_JewelryModelId",
                table: "ModelConfigurations");

            migrationBuilder.DropIndex(
                name: "IX_ModelConfigurations_NameKey_JewelryModelId",
                table: "ModelConfigurations");

            migrationBuilder.DropIndex(
                name: "IX_Metals_Identifier",
                table: "Metals");

            migrationBuilder.DropIndex(
                name: "IX_Gemstones_Identifier",
                table: "Gemstones");

            migrationBuilder.AlterColumn<string>(
                name: "NameKey",
                table: "ModelConfigurations",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "ModelConfigurations",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "Metals",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "Gemstones",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
