﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Ujin.Storage;

namespace Ujin.Storage.Migrations
{
    [DbContext(typeof(UjinContext))]
    [Migration("20190524114007_AddAdminUser")]
    partial class AddAdminUser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Ujin.Storage.Models.AdminUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("Phone");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("Username");

                    b.ToTable("AdminUsers");
                });

            modelBuilder.Entity("Ujin.Storage.Models.Color", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ColorHexCode");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("NameKey");

                    b.HasKey("Id");

                    b.ToTable("Colors");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.Gemstone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ColorId");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<int>("GemstoneClassId");

                    b.Property<int>("GemstoneCutId");

                    b.Property<int>("GemstoneSourceId");

                    b.Property<double>("HeightMm");

                    b.Property<double>("Price");

                    b.Property<double?>("Weight");

                    b.Property<double>("WidthMm");

                    b.HasKey("Id");

                    b.HasIndex("ColorId");

                    b.HasIndex("GemstoneClassId");

                    b.HasIndex("GemstoneCutId");

                    b.HasIndex("GemstoneSourceId");

                    b.ToTable("Gemstones");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.GemstoneClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("NameKey");

                    b.HasKey("Id");

                    b.ToTable("GemstoneClasses");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.GemstoneCut", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("NameKey");

                    b.HasKey("Id");

                    b.ToTable("GemstoneCuts");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.GemstoneSource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("NameKey");

                    b.HasKey("Id");

                    b.ToTable("GemstoneSources");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.JewelryModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("BasePrice");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("ImagesPattern");

                    b.Property<string>("NameKey");

                    b.HasKey("Id");

                    b.ToTable("JewelryModels");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.Metal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("NameKey");

                    b.Property<double>("PricePerGram");

                    b.HasKey("Id");

                    b.ToTable("Metals");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.ModelConfiguration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConfigurationOptions");

                    b.Property<int>("ConfigurationType");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<int>("JewelryModelId");

                    b.Property<string>("NameKey");

                    b.HasKey("Id");

                    b.HasIndex("JewelryModelId");

                    b.ToTable("ModelConfigurations");
                });

            modelBuilder.Entity("Ujin.Storage.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreationSource");

                    b.Property<DateTime>("DateCreated");

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

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.Gemstone", b =>
                {
                    b.HasOne("Ujin.Storage.Models.Color", "Color")
                        .WithMany()
                        .HasForeignKey("ColorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Ujin.Storage.Models.ModelConfig.GemstoneClass", "GemstoneClass")
                        .WithMany()
                        .HasForeignKey("GemstoneClassId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Ujin.Storage.Models.ModelConfig.GemstoneCut", "GemstoneCut")
                        .WithMany()
                        .HasForeignKey("GemstoneCutId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Ujin.Storage.Models.ModelConfig.GemstoneSource", "GemstoneSource")
                        .WithMany()
                        .HasForeignKey("GemstoneSourceId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.ModelConfiguration", b =>
                {
                    b.HasOne("Ujin.Storage.Models.ModelConfig.JewelryModel", "JewelryModel")
                        .WithMany("Configurations")
                        .HasForeignKey("JewelryModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
