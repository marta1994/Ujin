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
    [Migration("20191127084832_RemoveJewelryModelMainImane")]
    partial class RemoveJewelryModelMainImane
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
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

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("LastName");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("Phone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique();

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

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ColorHexCode")
                        .IsUnique()
                        .HasFilter("[ColorHexCode] IS NOT NULL");

                    b.HasIndex("NameKey")
                        .IsUnique();

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

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<double>("Price");

                    b.Property<double?>("Weight");

                    b.Property<double>("WidthMm");

                    b.HasKey("Id");

                    b.HasIndex("ColorId");

                    b.HasIndex("GemstoneClassId");

                    b.HasIndex("GemstoneCutId");

                    b.HasIndex("GemstoneSourceId");

                    b.HasIndex("Identifier")
                        .IsUnique();

                    b.ToTable("Gemstones");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.GemstoneClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("Identifier")
                        .IsUnique();

                    b.HasIndex("NameKey")
                        .IsUnique();

                    b.ToTable("GemstoneClasses");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.GemstoneCut", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("Identifier")
                        .IsUnique();

                    b.HasIndex("NameKey")
                        .IsUnique();

                    b.ToTable("GemstoneCuts");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.GemstoneSource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("Identifier")
                        .IsUnique();

                    b.HasIndex("NameKey")
                        .IsUnique();

                    b.ToTable("GemstoneSources");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.JewelryModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("DescriptionKey");

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<string>("ImagesPattern");

                    b.Property<int>("ModelState")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(-1);

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.Property<string>("PriceExpression");

                    b.Property<string>("WeightExpression");

                    b.HasKey("Id");

                    b.HasIndex("Identifier")
                        .IsUnique();

                    b.HasIndex("NameKey")
                        .IsUnique();

                    b.ToTable("JewelryModels");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.Metal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<double>("GramsPerMl");

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.Property<double>("PricePerGram");

                    b.HasKey("Id");

                    b.HasIndex("Identifier")
                        .IsUnique();

                    b.HasIndex("NameKey")
                        .IsUnique();

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

                    b.Property<string>("Identifier")
                        .IsRequired();

                    b.Property<int>("JewelryModelId");

                    b.Property<string>("NameKey")
                        .IsRequired();

                    b.Property<int>("Order");

                    b.HasKey("Id");

                    b.HasIndex("JewelryModelId");

                    b.HasIndex("Identifier", "JewelryModelId")
                        .IsUnique();

                    b.HasIndex("NameKey", "JewelryModelId")
                        .IsUnique();

                    b.ToTable("ModelConfigurations");
                });

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.SkuDescription", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<string>("Images");

                    b.Property<bool>("IsEnabled");

                    b.Property<int>("JewelryModelId");

                    b.Property<string>("Sku");

                    b.Property<bool>("UseInCatalog");

                    b.HasKey("Id");

                    b.HasIndex("JewelryModelId");

                    b.HasIndex("Sku");

                    b.ToTable("SkuDescriptions");
                });

            modelBuilder.Entity("Ujin.Storage.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Advance");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<int>("OrderState");

                    b.Property<decimal>("Price");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Ujin.Storage.Models.OrderedProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<int>("Number");

                    b.Property<int>("OrderId");

                    b.Property<string>("SerializedProduct");

                    b.Property<string>("Sku");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderedProducts");
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

            modelBuilder.Entity("Ujin.Storage.Models.ModelConfig.SkuDescription", b =>
                {
                    b.HasOne("Ujin.Storage.Models.ModelConfig.JewelryModel", "JewelryModel")
                        .WithMany("SkuDescriptions")
                        .HasForeignKey("JewelryModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Ujin.Storage.Models.Order", b =>
                {
                    b.HasOne("Ujin.Storage.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Ujin.Storage.Models.OrderedProduct", b =>
                {
                    b.HasOne("Ujin.Storage.Models.Order", "Order")
                        .WithMany("OrderedProducts")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
