using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Storage.Migrations
{
    public partial class AddJewelryModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true),
                    ColorHexCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemstoneClasses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstoneClasses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemstoneCuts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstoneCuts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemstoneSources",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstoneSources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JewelryModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true),
                    ImagesPattern = table.Column<string>(nullable: true),
                    BasePrice = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JewelryModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Metals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true),
                    PricePerGram = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gemstones",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    WidthMm = table.Column<double>(nullable: false),
                    HeightMm = table.Column<double>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Weight = table.Column<double>(nullable: true),
                    ColorId = table.Column<int>(nullable: false),
                    GemstoneClassId = table.Column<int>(nullable: false),
                    GemstoneSourceId = table.Column<int>(nullable: false),
                    GemstoneCutId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gemstones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gemstones_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Gemstones_GemstoneClasses_GemstoneClassId",
                        column: x => x.GemstoneClassId,
                        principalTable: "GemstoneClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Gemstones_GemstoneCuts_GemstoneCutId",
                        column: x => x.GemstoneCutId,
                        principalTable: "GemstoneCuts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Gemstones_GemstoneSources_GemstoneSourceId",
                        column: x => x.GemstoneSourceId,
                        principalTable: "GemstoneSources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ModelConfigurations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: true),
                    NameKey = table.Column<string>(nullable: true),
                    JewelryModelId = table.Column<int>(nullable: false),
                    ConfigurationType = table.Column<int>(nullable: false),
                    ConfigurationOptions = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModelConfigurations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModelConfigurations_JewelryModels_JewelryModelId",
                        column: x => x.JewelryModelId,
                        principalTable: "JewelryModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gemstones_ColorId",
                table: "Gemstones",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Gemstones_GemstoneClassId",
                table: "Gemstones",
                column: "GemstoneClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Gemstones_GemstoneCutId",
                table: "Gemstones",
                column: "GemstoneCutId");

            migrationBuilder.CreateIndex(
                name: "IX_Gemstones_GemstoneSourceId",
                table: "Gemstones",
                column: "GemstoneSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_ModelConfigurations_JewelryModelId",
                table: "ModelConfigurations",
                column: "JewelryModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gemstones");

            migrationBuilder.DropTable(
                name: "Metals");

            migrationBuilder.DropTable(
                name: "ModelConfigurations");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropTable(
                name: "GemstoneClasses");

            migrationBuilder.DropTable(
                name: "GemstoneCuts");

            migrationBuilder.DropTable(
                name: "GemstoneSources");

            migrationBuilder.DropTable(
                name: "JewelryModels");
        }
    }
}
