using System;
using System.Collections.Generic;
using System.Linq;
using Ujin.Domain;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;

namespace Ujin.BusinessLogic.Services.Model
{
    public class ConfiguredModel
    {
        private readonly ParsedJewelryModel _model;

        private readonly ExpressionTerms _expressionTerms;

        public ConfiguredModel(
            ParsedJewelryModel model, 
            List<string> configIds,
            ExpressionTerms expressionTerms)
        {
            _model = model;
            _expressionTerms = expressionTerms;
            if (configIds.Count != _model.Configurations.Count)
                throw new ApplicationException(
                    $"Could not parse model configuration values of configIDs '{string.Join(_expressionTerms.SkuSeparator, configIds)}'. Actual model config number: {model.Configurations.Count}!");
            model.Configurations = model.Configurations.OrderBy(c => c.Order).ToList();
            Configs = new List<SpecificModelConfig>();
            for(var i = 0; i < model.Configurations.Count; ++i)
            {
                Configs.Add(new SpecificModelConfig(model.Configurations[i], configIds[i]));
            }
        }

        public int Id => _model.Id;

        public string Identifier => _model.Identifier;

        public List<SpecificModelConfig> Configs { get; set; }

        public string ImagesPattern => _model.ImagesPattern;

        public string PriceExpression => _model.PriceExpression;

        public string WeightExpression => _model.WeightExpression;

        public string DescriptionKey => _model.DescriptionKey;

        public string GetStrValueByPath(string path)
        {
            var splitted = path.Split(_expressionTerms.PathSeparator);
            if (splitted.Length == 0)
                throw new ApplicationException($"Could not parse path '{path}' with model '{Identifier}'!");
            if (splitted[0] == "model")
            {
                if (splitted.Length == 2 && splitted[1] == "identifier")
                    return Identifier;
                throw new ApplicationException($"Could not parse path '{path}' with model '{Identifier}'!");
            }
            var config = Configs.SingleOrDefault(c => c.Identifier == splitted[0]);
            if (config == null)
                throw new ApplicationException($"Could not parse path '{path}' with model '{Identifier}'!");
            return config.SelectedItem.GetStrValueByPath(string.Join(_expressionTerms.PathSeparator, splitted.Skip(1)));
        }
    }
}
