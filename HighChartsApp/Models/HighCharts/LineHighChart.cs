namespace HighChartsApp.Models
{
    public class LineHighChart : HighChart
    {
        public override string ChartType { get; set; } = "Line";

        public ISetting PlotLineSeries { get; set; }

        public XAxis xAxis { get; set; }
        public YAxis yAxis { get; set; }
    }

    public class PlotLineSeries<T> : ISetting
    {
        public T PointStart{ get; set; }
        public int PointInterval { get; set; }
    }
}
