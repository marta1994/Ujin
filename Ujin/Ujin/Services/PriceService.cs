﻿using Microsoft.EntityFrameworkCore;
using System;
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

        private const int ZIRCONIUM_ID = 5;

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
                .FindAsync(config.UseZirconium ? ZIRCONIUM_ID : config.GemstoneId);
            var metalPrices = await ujinContext.PricePerMetals
                .Where(mp => mp.MetalId == config.MetalId)
                .ToListAsync();
            var addServices = await ujinContext.AdditionalServices
                .ToListAsync();

            var gemPrice = gemstonePrice.Price;
            var weight = ringWeight.WeightGrams;
            var metalPrice = metalPrices.Sum(it => it.ItemPrice);
            var addServicePrice = addServices.Sum(p => p.Price);

            var resultPrice = (weight * metalPrice + addServicePrice) * WORK_COEF 
                + gemPrice * GEMSTONE_COEF;
            resultPrice = Math.Floor(resultPrice / 10 + 0.5m) * 10;
            return resultPrice;
        }
    }
}
