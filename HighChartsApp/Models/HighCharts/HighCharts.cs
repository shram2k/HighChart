using Newtonsoft.Json;
using System.Collections.Generic;

namespace HighChartsApp.Models
{
    public interface ISetting { }

    public abstract class HighChart
    {
        public string ChartTitle { get; set; }
        public string ChartSubTitle { get; set; }
        
        public List<Series> Series { get; set; }

        public abstract string ChartType { get; set; }

        public string LegendTitle { get; set; }
        
    }


    public class SeriesData
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("y")]
        public double YAxisData { get; set; }
        public Dictionary<string, string> AdditionalInfo { get; set; }
    }
    /// <summary>
	/// The actual series to append to the chart. In addition to  the members listed below, any member of the <code>plotOptions</code> for that specific type of plot can be added to a series individually. For example, even though a general <code>lineWidth</code> is specified in <code>plotOptions.series</code>, an individual <code>lineWidth</code> can be specified for each series.
	/// </summary>
	public class Series 
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("data")]
        public List<SeriesData> Data { get; set; }

    }
    
    public class XAxis: BaseXAxis
    {
        /// <summary>
		/// <p>If categories are present for the xAxis, names are used instead of numbers for that axis. Since Highcharts 3.0, categories can also be extracted by giving each point a <a href='#series.data'>name</a> and setting axis <a href='#xAxis.type'>type</a> to <code>'category'</code>.</p><p>Example:<pre>categories: ['Apples', 'Bananas', 'Oranges']</pre> Defaults to <code>null</code></p>
		/// </summary>
       public List<string> Categories { get; set; }

       
    }

    public class GroupedCategory
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("categories")]
        public List<string> Categories { get; set; }

        public bool IsThisGrouped { get; set; }
    }

    public abstract class BaseXAxis
    {
        /// <summary>
        /// The axis title, showing next to the axis line.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
		/// The minimum value of the axis. 
		/// </summary>
        public int? Min { get; set; }

        /// <summary>
		/// The maximum value of the axis. 
		/// </summary>
		public int? Max { get; set; }

        public string Type { get; set; }
    }
    [JsonObject(Title ="XAxis")]
    public class XAxisGrouped: BaseXAxis
    {
        /// <summary>
		/// <p>If categories are present for the xAxis, names are used instead of numbers for that axis. Since Highcharts 3.0, categories can also be extracted by giving each point a <a href='#series.data'>name</a> and setting axis <a href='#xAxis.type'>type</a> to <code>'category'</code>.</p><p>Example:<pre>categories: ['Apples', 'Bananas', 'Oranges']</pre> Defaults to <code>null</code></p>
		/// </summary>
        public List<GroupedCategory> Categories { get; set; }

    }
    public class YAxis
    {
        /// <summary>
        /// The axis title, showing next to the axis line.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
		/// The minimum value of the axis. 
		/// </summary>
        public int? Min { get; set; }

        /// <summary>
		/// The maximum value of the axis. 
		/// </summary>
		public int? Max { get; set; }
    }
   
}
