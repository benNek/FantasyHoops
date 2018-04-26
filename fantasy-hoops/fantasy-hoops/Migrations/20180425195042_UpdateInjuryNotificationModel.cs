using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class UpdateInjuryNotificationModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Injuries_InjuryID",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "InjuryID",
                table: "Notifications",
                newName: "PlayerID");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_InjuryID",
                table: "Notifications",
                newName: "IX_Notifications_PlayerID");

            migrationBuilder.AddColumn<string>(
                name: "InjuryDescription",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InjuryStatus",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Players_PlayerID",
                table: "Notifications",
                column: "PlayerID",
                principalTable: "Players",
                principalColumn: "PlayerID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Players_PlayerID",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "InjuryDescription",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "InjuryStatus",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "PlayerID",
                table: "Notifications",
                newName: "InjuryID");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_PlayerID",
                table: "Notifications",
                newName: "IX_Notifications_InjuryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Injuries_InjuryID",
                table: "Notifications",
                column: "InjuryID",
                principalTable: "Injuries",
                principalColumn: "InjuryID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
