using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class AddDateAndFPToUserPlayers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "UserPlayers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "FP",
                table: "UserPlayers",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "UserPlayers");

            migrationBuilder.DropColumn(
                name: "FP",
                table: "UserPlayers");
        }
    }
}
