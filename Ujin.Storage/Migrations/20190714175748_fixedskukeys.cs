using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class fixedskukeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SkuDescriptions",
                table: "SkuDescriptions");

            migrationBuilder.AlterColumn<string>(
                name: "Sku",
                table: "SkuDescriptions",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkuDescriptions",
                table: "SkuDescriptions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SkuDescriptions_Sku",
                table: "SkuDescriptions",
                column: "Sku");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SkuDescriptions",
                table: "SkuDescriptions");

            migrationBuilder.DropIndex(
                name: "IX_SkuDescriptions_Sku",
                table: "SkuDescriptions");

            migrationBuilder.AlterColumn<string>(
                name: "Sku",
                table: "SkuDescriptions",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkuDescriptions",
                table: "SkuDescriptions",
                column: "Sku");
        }
    }
}
