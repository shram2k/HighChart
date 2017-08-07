using HighChartsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HighChartsApp
{
    public class DataGenerator
    {
        public static ColumnHighChart GetColumnChartData()
        {
            var columnChart = new ColumnHighChart
            {
                ChartTitle = String.Empty,
                xAxis = new XAxis
                {
                    Min = 0,
                    Max = 7,
                    Categories = new List<string> { "James", "Robert", "Scott", "Peter" }
                },
                yAxis = new YAxis { Title = "Coaching Activities" },
                ScrollBar = true
            };
            var ChartSeries = new List<Series>();
            var seriesTrainingAttendedData = new List<SeriesData>();
            var seriesTrainingProvidedData = new List<SeriesData>();

            var rng = new Random();

            Enumerable.Range(0, 5).OrderBy(x=>rng.Next()).ToList().ForEach(item =>
             {
                 seriesTrainingAttendedData.Add(new SeriesData { YAxisData = item });
             });

            Enumerable.Range(0, 5).OrderBy(x => rng.Next()).ToList().ForEach(item =>
            {
                seriesTrainingProvidedData.Add(new SeriesData { YAxisData = item });
            });

           
            ChartSeries.Add(new Series
            {
                Name = "Training Attended",
                Data = seriesTrainingAttendedData
            });
            ChartSeries.Add(new Series
            {
                Name = "Training Provided",
                Data = seriesTrainingProvidedData
            });

            columnChart.Series = ChartSeries;

            return columnChart;
        }

        public static PieHighCharts GetPieChartData()
        {
            PieHighCharts pieChart = new PieHighCharts();

            var pieSeries = new List<Series>();
            var seriesData = new List<SeriesData>();
            var rng = new Random();
            Dictionary<string, int> countries = new Dictionary<string, int>
            {
                {"China",1388 },
                {"India",1342 },
                {"United States",326},
                {"Indonesia",263 },
                {"Brazil",211 }
            };
            countries.ToList().ForEach(item =>
            {
                seriesData.Add(
                    new SeriesData
                    {
                        Name = item.Key,
                        YAxisData = item.Value

                    });
            });
        
          
            pieSeries.Add(new PieSeries { Name = "Most Populated Countries in the world", Data = seriesData, ColorByPoint = true });
            pieChart = new PieHighCharts
            {
                ChartTitle = String.Empty,
                Series = pieSeries
            };

            return pieChart;
        }
    }
}