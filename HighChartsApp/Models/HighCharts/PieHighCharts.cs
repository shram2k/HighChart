using Newtonsoft.Json;

namespace HighChartsApp.Models
{

    public class PieHighCharts : HighChart
    {
        public override string ChartType { get; set; } = "Pie";

    }
    public class PieSeries : Series
    {
        [JsonProperty("colorByPoint")]
        public bool ColorByPoint { get; set; }
    }
   
}
