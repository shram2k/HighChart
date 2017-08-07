var app = (function () {
  
    function ShowColumnChart() {
       
    }
    return {
        ShowColumnChart: function () {
            $.getJSON("api/chart/column", {}).done(function (data) {
                $("#chartcontainer").tfHighChart({
                    ChartOptions: data
                });


            }).fail(function (error) {
                console.log(error);
            });
        },
        showPieChart: function () {
            $.getJSON("api/chart/pie", {}).done(function (data) {
                $("#chartcontainer").tfHighChart({
                    ChartOptions: data
                });


            }).fail(function (error) {
                console.log(error);
            });
        }
    }
})();

$(function() {
   
    $("#btnShow").on("click", function () {
        var selectedOption = $("#optChartTypes").val();
        if (selectedOption === 'column')
        {
            app.ShowColumnChart();
        }
        else if (selectedOption === 'pie') {
            app.showPieChart();
        }
       
    });
   
});