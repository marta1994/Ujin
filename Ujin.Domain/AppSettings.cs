namespace Ujin.Domain
{
    public class AppSettings
    {
        public ExpressionTerms ExpressionTerms { get; set; }
    }

    public class ExpressionTerms
    {
        public string SkuSeparator { get; set; }

        public string PathSeparator { get; set; }

        public char ExprOpen { get; set; }

        public char ExprClose { get; set; }
    }
}
