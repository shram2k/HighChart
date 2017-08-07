namespace HighChartsApp.Models
{
    public class ColumnHighChart : HighChart
    {
        public BaseXAxis xAxis { get; set; }
        public YAxis yAxis { get; set; }
        public override string ChartType { get; set; } = "Column";

        public bool ScrollBar { get; set; }

        public bool IsStacked { get; set; }

    }
}
