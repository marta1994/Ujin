using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Price
{
    public class PriceCalculatorService : IPriceCalculatorService
    {
        private readonly ModelParser _modelParser;

        public PriceCalculatorService(ModelParser modelParser)
        {
            _modelParser = modelParser;
        }

        public async Task<decimal> CalculatePrice(string sku)
        {
            var model = await _modelParser.ParseFromSku(sku);
            var evaluatedExpression = GetEvaluatedPriceExpression(model);
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

        private string GetEvaluatedPriceExpression(ConfiguredModel model)
        {
            CheckBraces(model.PriceExpression);
            var splitted = model.PriceExpression.Split('{', '}');
            var evaluated = splitted.Select((str, i) => i % 2 == 0 ? str : model.GetStrValueByPath(str));
            return string.Join("", evaluated);
        }

        private void CheckBraces(string expression)
        {
            int brNum = 0;
            for (var i = 0; i < expression.Length; ++i)
            {
                if (expression[i] == '{') brNum++;
                if (expression[i] == '}') brNum--;
                if (brNum < 0 || brNum > 1)
                    throw new ApplicationException($"Invalid expression '{expression}'!");
            }
            if (brNum != 0)
                throw new ApplicationException($"Invalid expression '{expression}'!");
        }
    }
}
