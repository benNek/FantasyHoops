using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class AddPriceToPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "TeamId",
                table: "Players",
                newName: "TeamID");

            migrationBuilder.RenameIndex(
                name: "IX_Players_TeamId",
                table: "Players",
                newName: "IX_Players_TeamID");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamID",
                table: "Players",
                column: "TeamID",
                principalTable: "Teams",
                principalColumn: "TeamID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamID",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "TeamID",
                table: "Players",
                newName: "TeamId");

            migrationBuilder.RenameIndex(
                name: "IX_Players_TeamID",
                table: "Players",
                newName: "IX_Players_TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
