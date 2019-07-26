using System;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Ujin.BusinessLogic.Services.Model;

namespace Ujin.BusinessLogic.Services
{
    public class ExpressionCalculatorService
    {
        private readonly VariablesEvaluator _variablesEvaluator;

        public ExpressionCalculatorService(
            VariablesEvaluator variablesEvaluator)
        {
            _variablesEvaluator = variablesEvaluator;
        }

        public async Task<decimal> CalculateExpression(string expression, ConfiguredModel model)
        {
            var evaluatedExpression = _variablesEvaluator.EvaluateExpression(expression, model);
            return await GetResultFromExpression(evaluatedExpression);
        }

        private async Task<decimal> GetResultFromExpression(string expression)
        {
            try
            {
                var strResult = Convert.ToString(await CSharpScript.EvaluateAsync(expression), CultureInfo.InvariantCulture);
                if (decimal.TryParse(strResult, NumberStyles.Any, CultureInfo.InvariantCulture, out var result))
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
