using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fantasy_hoops.Migrations
{
    public partial class AddPriceToStats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Stats",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Stats");
        }
    }
}
