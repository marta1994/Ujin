﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Ujin.Data;

namespace Ujin.Migrations
{
    [DbContext(typeof(UjinContext))]
    [Migration("20190326132133_AddJewelryPrices")]
    partial class AddJewelryPrices
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Ujin.Data.Models.Decoration", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Decoration");
                });

            modelBuilder.Entity("Ujin.Data.Models.Gemstone", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Gemstone");
                });

            modelBuilder.Entity("Ujin.Data.Models.GemstonePrice", b =>
                {
                    b.Property<int>("GemstoneId");

                    b.Property<decimal>("Price");

                    b.HasKey("GemstoneId");

                    b.ToTable("GemstonePrice");
                });

            modelBuilder.Entity("Ujin.Data.Models.Metal", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Metal");
                });

            modelBuilder.Entity("Ujin.Data.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Definition")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Ujin.Data.Models.PricePerMetal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ItemName")
                        .IsRequired();

                    b.Property<decimal>("ItemPrice");

                    b.Property<int>("MetalId");

                    b.HasKey("Id");

                    b.HasIndex("MetalId");

                    b.ToTable("PricePerMetal");
                });

            modelBuilder.Entity("Ujin.Data.Models.RingWeight", b =>
                {
                    b.Property<int>("MetalId");

                    b.Property<int>("DecorationId");

                    b.Property<decimal>("Size");

                    b.Property<decimal>("WeightGrams");

                    b.HasKey("MetalId", "DecorationId", "Size");

                    b.HasIndex("DecorationId");

                    b.HasIndex("MetalId", "DecorationId", "Size")
                        .IsUnique();

                    b.ToTable("RingWeight");
                });

            modelBuilder.Entity("Ujin.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreationSource");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Email")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<string>("Phone")
                        .HasMaxLength(15);

                    b.Property<int>("SubscriptionOptions");

                    b.Property<string>("Surname")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Ujin.Data.Models.GemstonePrice", b =>
                {
                    b.HasOne("Ujin.Data.Models.Gemstone", "Gemstone")
                        .WithOne("Price")
                        .HasForeignKey("Ujin.Data.Models.GemstonePrice", "GemstoneId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Ujin.Data.Models.Order", b =>
                {
                    b.HasOne("Ujin.Data.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Ujin.Data.Models.PricePerMetal", b =>
                {
                    b.HasOne("Ujin.Data.Models.Metal", "Metal")
                        .WithMany()
                        .HasForeignKey("MetalId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Ujin.Data.Models.RingWeight", b =>
                {
                    b.HasOne("Ujin.Data.Models.Decoration", "Decoration")
                        .WithMany()
                        .HasForeignKey("DecorationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Ujin.Data.Models.Metal", "Metal")
                        .WithMany()
                        .HasForeignKey("MetalId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
