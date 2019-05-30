namespace Ujin.Storage.Models
{
    internal abstract class NamedModel: BaseModel
    {
        public string NameKey { get; set; }
    }
}
