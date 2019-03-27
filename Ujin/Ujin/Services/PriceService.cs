using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Controllers.Models.Price;
using Ujin.Data;
using Ujin.Interfaces;

namespace Ujin.Services
{
    public class PriceService: IPriceService
    {
        private const decimal GEMSTONE_COEF = 1.5m;

        private const decimal WORK_COEF = 2;

        private const string METAL_PRICE_NAME = "GramPrice";

        private readonly HashSet<string> additionalServices = new HashSet<string> {
            "Casting", "Processing", "Fixing", "Printing"
        };

        private readonly UjinContext ujinContext;

        public PriceService(UjinContext ujinContext)
        {
            this.ujinContext = ujinContext;
        }

        public async Task<decimal> CalculateRingPrice(RingConfig config)
        {
            var ringWeight = await ujinContext.RingWeights
                .FindAsync(config.MetalId, config.DecorationId, config.Size);
            var gemstonePrice = await ujinContext.GemstonePrices
                .FindAsync(config.GemstoneId);
            var metalPrices = await ujinContext.PricePerMetals
                .Where(mp => mp.MetalId == config.MetalId)
                .ToListAsync();

            var gemPrice = gemstonePrice.Price;
            var weight = ringWeight.WeightGrams;
            var pricePerGram = metalPrices.First(it => it.ItemName == METAL_PRICE_NAME).ItemPrice;
            var additionalPrice = metalPrices.Where(it => additionalServices.Contains(it.ItemName))
                .Sum(it => it.ItemPrice);

            var resultPrice = (weight * pricePerGram + additionalPrice) * WORK_COEF + gemPrice * GEMSTONE_COEF;
            resultPrice = Math.Floor(resultPrice / 10 + 0.5m) * 10;
            return resultPrice;
        }
    }
}
