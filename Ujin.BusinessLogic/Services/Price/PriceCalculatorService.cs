using System;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Price
{
    public class PriceCalculatorService : IPriceCalculatorService
    {
        private readonly VariablesEvaluator _variablesEvaluator;

        private readonly ModelParser _modelParser;

        public PriceCalculatorService(
            ModelParser modelParser,
            VariablesEvaluator variablesEvaluator)
        {
            _modelParser = modelParser;
            _variablesEvaluator = variablesEvaluator;
        }

        public async Task<decimal> CalculatePrice(string sku)
        {
            var model = await _modelParser.ParseFromSku(sku);
            var evaluatedExpression = _variablesEvaluator.EvaluateExpression(model.PriceExpression, model);
            return await CalcPriceFromExpression(evaluatedExpression);
        }

        private async Task<decimal> CalcPriceFromExpression(string expression)
        {
            try
            {
                var strResult = (await CSharpScript.EvaluateAsync(expression)).ToString();
                if (decimal.TryParse(strResult, out var result))
                    return result;
                throw new ApplicationException($"Could not convert '{strResult}' to decimal");
            }
            catch(ApplicationException)
            {
                throw;
            }
            catch(Exception)
            {
                throw new ApplicationException($"Could not evaluate expression '{expression}'");
            }
        }
    }
}
