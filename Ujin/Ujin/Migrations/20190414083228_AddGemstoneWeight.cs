using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Migrations
{
    public partial class AddGemstoneWeight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GemstonePrice");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Gemstone",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Weight",
                table: "Gemstone",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Gemstone");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Gemstone");

            migrationBuilder.CreateTable(
                name: "GemstonePrice",
                columns: table => new
                {
                    GemstoneId = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstonePrice", x => x.GemstoneId);
                    table.ForeignKey(
                        name: "FK_GemstonePrice_Gemstone_GemstoneId",
                        column: x => x.GemstoneId,
                        principalTable: "Gemstone",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
