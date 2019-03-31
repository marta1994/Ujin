using Microsoft.EntityFrameworkCore.Migrations;

namespace Ujin.Migrations
{
    public partial class AddAdditionalService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdditionalService",
                columns: table => new
                {
                    ServiceName = table.Column<string>(maxLength: 255, nullable: false),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalService", x => x.ServiceName);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdditionalService");
        }
    }
}
