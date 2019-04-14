using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Controllers.Models.RingInfo;
using Ujin.Data;
using Ujin.Data.Models;
using Ujin.Interfaces;

namespace Ujin.Services
{
    public class RingInfoService: IRingInfoService
    {
        private class GemInfo
        {
            public decimal Price { get; set; }

            public decimal? Weight { get; set; }
        }

        private const decimal GEMSTONE_COEF = 1.5m;

        private const decimal WORK_COEF = 2;

        private const int ZIRCONIUM_ID = 5;

        private const string ARTIFICAL_SUFFIX = "Artifical";

        private readonly UjinContext ujinContext;

        public RingInfoService(UjinContext ujinContext)
        {
            this.ujinContext = ujinContext;
        }

        public async Task<RingInfo> GetRingInfo(RingConfig config)
        {
            var info = new RingInfo();
            await AddRingWeight(info, config);

            var gemstoneId = await GetRealGemstoneId(config);
            var gemstone = await ujinContext.Gemstones.FindAsync(gemstoneId);

            info.GemstoneWeight = gemstone.Weight;
            info.GemstoneLengthMm = 5;
            info.GemstoneWidthMm = 3;

            await CalculatePrice(info, config, gemstone);

            return info;
        }

        private async Task CalculatePrice(RingInfo info, RingConfig config, Gemstone gemstone)
        {
            var metalPrices = await ujinContext.PricePerMetals
                .Where(mp => mp.MetalId == config.MetalId)
                .ToListAsync();
            var addServices = await ujinContext.AdditionalServices
                .ToListAsync();

            var gemPrice = gemstone.Price;
            var weight = info.MetalWeight;
            var metalPrice = metalPrices.Sum(it => it.ItemPrice);
            var addServicePrice = addServices.Sum(p => p.Price);

            var resultPrice = (weight * metalPrice + addServicePrice) * WORK_COEF
                + gemPrice * GEMSTONE_COEF;
            info.Price = Math.Floor(resultPrice / 10 + 0.5m) * 10;
        }

        private async Task AddRingWeight(RingInfo info, RingConfig config)
        {
            var ringWeight = await ujinContext.RingWeights
                .FindAsync(config.MetalId, config.DecorationId, config.Size);
            info.MetalWeight = ringWeight.WeightGrams;
        }

        private async Task<int> GetRealGemstoneId(RingConfig config)
        {
            if (config.GemstoneOption == GemstoneOption.Zirconium)
                return ZIRCONIUM_ID;
            if (config.GemstoneOption == GemstoneOption.Genuine)
                return config.GemstoneId;
            if (config.GemstoneOption == GemstoneOption.Artifical)
            {
                var gemstones = await ujinContext.Gemstones.ToListAsync();
                var gemstoneName = gemstones.First(g => g.Id == config.GemstoneId).Name;
                var artificalGemstoneName = gemstoneName + ARTIFICAL_SUFFIX;
                var artificalGemstone = gemstones.FirstOrDefault(g => g.Name == artificalGemstoneName);
                if (artificalGemstone != null)
                    return artificalGemstone.Id;
            }
            return config.GemstoneId;
        }
    }
}
