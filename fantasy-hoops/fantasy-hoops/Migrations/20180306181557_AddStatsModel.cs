using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class AddStatsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PPG",
                table: "Players",
                newName: "STL");

            migrationBuilder.AddColumn<double>(
                name: "AST",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "BLK",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "FPPG",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PTS",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "REB",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    StatsID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AST = table.Column<int>(nullable: false),
                    BLK = table.Column<int>(nullable: false),
                    DREB = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    FGA = table.Column<int>(nullable: false),
                    FGM = table.Column<int>(nullable: false),
                    FLS = table.Column<int>(nullable: false),
                    FTA = table.Column<int>(nullable: false),
                    FTM = table.Column<int>(nullable: false),
                    OREB = table.Column<int>(nullable: false),
                    PTS = table.Column<int>(nullable: false),
                    PlayerID = table.Column<int>(nullable: false),
                    STL = table.Column<int>(nullable: false),
                    TOV = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.StatsID);
                    table.ForeignKey(
                        name: "FK_Stats_Players_PlayerID",
                        column: x => x.PlayerID,
                        principalTable: "Players",
                        principalColumn: "PlayerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stats_PlayerID",
                table: "Stats",
                column: "PlayerID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropColumn(
                name: "AST",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "BLK",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "FPPG",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "PTS",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "REB",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "STL",
                table: "Players",
                newName: "PPG");
        }
    }
}
