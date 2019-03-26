using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Migrations
{
    public partial class AddJewelryPrices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 3, 24, 19, 24, 45, 45, DateTimeKind.Local));

            migrationBuilder.AlterColumn<string>(
                name: "Definition",
                table: "Order",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Order",
                nullable: false,
                defaultValue: new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 3, 24, 19, 24, 45, 54, DateTimeKind.Local));

            migrationBuilder.CreateTable(
                name: "Decoration",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decoration", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gemstone",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gemstone", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Metal",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metal", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "PricePerMetal",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MetalId = table.Column<int>(nullable: false),
                    ItemName = table.Column<string>(nullable: false),
                    ItemPrice = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricePerMetal", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PricePerMetal_Metal_MetalId",
                        column: x => x.MetalId,
                        principalTable: "Metal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RingWeight",
                columns: table => new
                {
                    DecorationId = table.Column<int>(nullable: false),
                    MetalId = table.Column<int>(nullable: false),
                    Size = table.Column<decimal>(nullable: false),
                    WeightGrams = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RingWeight", x => new { x.MetalId, x.DecorationId, x.Size });
                    table.ForeignKey(
                        name: "FK_RingWeight_Decoration_DecorationId",
                        column: x => x.DecorationId,
                        principalTable: "Decoration",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RingWeight_Metal_MetalId",
                        column: x => x.MetalId,
                        principalTable: "Metal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PricePerMetal_MetalId",
                table: "PricePerMetal",
                column: "MetalId");

            migrationBuilder.CreateIndex(
                name: "IX_RingWeight_DecorationId",
                table: "RingWeight",
                column: "DecorationId");

            migrationBuilder.CreateIndex(
                name: "IX_RingWeight_MetalId_DecorationId_Size",
                table: "RingWeight",
                columns: new[] { "MetalId", "DecorationId", "Size" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GemstonePrice");

            migrationBuilder.DropTable(
                name: "PricePerMetal");

            migrationBuilder.DropTable(
                name: "RingWeight");

            migrationBuilder.DropTable(
                name: "Gemstone");

            migrationBuilder.DropTable(
                name: "Decoration");

            migrationBuilder.DropTable(
                name: "Metal");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(2019, 3, 24, 19, 24, 45, 45, DateTimeKind.Local),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Definition",
                table: "Order",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Order",
                nullable: false,
                defaultValue: new DateTime(2019, 3, 24, 19, 24, 45, 54, DateTimeKind.Local),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
