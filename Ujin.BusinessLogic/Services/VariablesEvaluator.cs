using System;
using System.Linq;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Domain;

namespace Ujin.BusinessLogic.Services
{
    public class VariablesEvaluator
    {
        private readonly ExpressionTerms _expressionTerms;

        public VariablesEvaluator(
            AppSettings appSettings)
        {
            _expressionTerms = appSettings.ExpressionTerms;
        }

        public string EvaluateExpression(string expression, ConfiguredModel model)
        {
            CheckBraces(expression);
            var splitted = expression.Split(_expressionTerms.ExprOpen, _expressionTerms.ExprClose);
            var evaluated = splitted.Select((str, i) => i % 2 == 0 ? str : model.GetStrValueByPath(str));
            return string.Join("", evaluated);
        }

        private void CheckBraces(string expression)
        {
            int brNum = 0;
            for (var i = 0; i < expression.Length; ++i)
            {
                if (expression[i] == _expressionTerms.ExprOpen) brNum++;
                if (expression[i] == _expressionTerms.ExprClose) brNum--;
                if (brNum < 0 || brNum > 1)
                    throw new ApplicationException($"Invalid expression '{expression}'!");
            }
            if (brNum != 0)
                throw new ApplicationException($"Invalid expression '{expression}'!");
        }
    }
}
