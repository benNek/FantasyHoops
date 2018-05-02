using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class AddStatusDateColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Players",
                nullable: false,
                oldClrType: typeof(string),
                oldDefaultValue: "Active");

            migrationBuilder.AddColumn<DateTime>(
                name: "StatusDate",
                table: "Players",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusDate",
                table: "Players");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Players",
                nullable: false,
                defaultValue: "Active",
                oldClrType: typeof(string));
        }
    }
}
