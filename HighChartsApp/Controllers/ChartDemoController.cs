using HighChartsApp.Models;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace HighChartsApp.Controllers
{
    [RoutePrefix("api/chart")]
    public class ChartDemoController : ApiController
    {
        [Route("column")]
        [HttpGet]
       public async Task<IHttpActionResult> GetColumnChart()
        {
            var result = await Task<ColumnHighChart>.Factory.StartNew(() =>
                            DataGenerator.GetColumnChartData());

            return Ok(result);
        }

        [Route("pie")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPieChart()
        {
            var result = await Task<PieHighCharts>.Factory.StartNew(() =>
                            DataGenerator.GetPieChartData());

            return Ok(result);
        }
    }
}