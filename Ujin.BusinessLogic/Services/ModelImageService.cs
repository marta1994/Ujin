using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services
{
    public class ModelImageService: IModelImageService
    {
        private readonly VariablesEvaluator _variablesEvaluator;

        private readonly ModelParser _modelParser;

        public ModelImageService(
            ModelParser modelParser,
            VariablesEvaluator variablesEvaluator)
        {
            _modelParser = modelParser;
            _variablesEvaluator = variablesEvaluator;
        }

        public async Task<List<string>> GetImagesPath(string sku)
        {
            var model = await _modelParser.ParseFromSku(sku);
            var imagePatterns = JsonConvert.DeserializeObject<List<string>>(model.ImagesPattern);
            return imagePatterns.Select(p => _variablesEvaluator.EvaluateExpression(p, model)).ToList();
        }
    }
}
