namespace Ujin.Domain.Dtos.ModelConfig.Parsed
{
    public abstract class BaseConfigOptions
    {
        protected BaseConfigOptions(string options)
        {
            Init(options);
        }

        protected abstract void Init(string options);
    }
}
