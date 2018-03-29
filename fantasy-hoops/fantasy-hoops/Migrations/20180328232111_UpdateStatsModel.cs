using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class UpdateStatsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "FGP",
                table: "Stats",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "FTP",
                table: "Stats",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "MIN",
                table: "Stats",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OppID",
                table: "Stats",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Score",
                table: "Stats",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TPA",
                table: "Stats",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TPM",
                table: "Stats",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "TPP",
                table: "Stats",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "TREB",
                table: "Stats",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FGP",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "FTP",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "MIN",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "OppID",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "TPA",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "TPM",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "TPP",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "TREB",
                table: "Stats");
        }
    }
}
