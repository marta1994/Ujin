using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddUniqueConstaints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_AdminUsers_Username",
                table: "AdminUsers");

            migrationBuilder.CreateIndex(
                name: "IX_Metals_NameKey",
                table: "Metals",
                column: "NameKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JewelryModels_NameKey",
                table: "JewelryModels",
                column: "NameKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneSources_NameKey",
                table: "GemstoneSources",
                column: "NameKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneCuts_NameKey",
                table: "GemstoneCuts",
                column: "NameKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneClasses_NameKey",
                table: "GemstoneClasses",
                column: "NameKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Colors_ColorHexCode",
                table: "Colors",
                column: "ColorHexCode",
                unique: true,
                filter: "[ColorHexCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Colors_NameKey",
                table: "Colors",
                column: "NameKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AdminUsers_Username",
                table: "AdminUsers",
                column: "Username",
                unique: true);
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

            migrationBuilder.DropIndex(
                name: "IX_AdminUsers_Username",
                table: "AdminUsers");

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

            migrationBuilder.CreateIndex(
                name: "IX_AdminUsers_Username",
                table: "AdminUsers",
                column: "Username");
        }
    }
}
