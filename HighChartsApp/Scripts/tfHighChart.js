/*
Author: Ram Sharma
Desc: plugin created for creating client side responsive chart using Highchart.js
An abstraction over the highchart library to centeralize the chart creation and easy maintenace of different types of highcharts
Dependency: jQuery, highchart.js

*/

(function ($) {
   
    var isIPad = navigator.userAgent.match(/iPad/i) != null;


    Highcharts.setOptions({
        global: {
            useUTC: false // do not use UTC dateformat in chart rendering (line chart)
        },
        credits: {
            enabled: false // hides HighChart icon
        },
        exporting: {
            enabled: isIPad ? false : true, // disable export option on ipad
            chartOptions: {
                xAxis: {
                    scrollbar: {
                        enabled: false // hide scrollbar in export
                    }
                }
            }
        }
    });


    $.fn.tfHighChart = function (options) {


        var defaults = {
            chartType: 'Column',
            ContainerElementId: $(this).attr("id"),
            ChartOptions: {}
        };
        var chart = null;

        var config = $.extend(defaults, options);

        var chartType = config.ChartOptions.ChartType.toLowerCase();

        if ((chartType === 'column' || chartType === 'bar')
            && config.ChartOptions.IsStacked) {
            chart = StackedColumnChart(config);
        }
        else if (chartType === 'line') {
            chart = LineChart(config);
        }
        else if (chartType === 'pie') {
            chart = PieChart(config);
        }
        else if (chartType === 'column' || chartType === 'bar') {
            chart = ColumnChart(config);
        }
        
      
    }

    //Different types of high charts implementation

    var ColumnChart = function (config) {

        $("#" + config.ContainerElementId).addClass("tf-column-highchart");
        return new Highcharts.chart(config.ContainerElementId, {
            chart: {
                type: config.ChartOptions.ChartType.toLowerCase()
                //events: {
                //    load: function (event) {
                //        if (config.fnChartOnLoad != undefined) {
                //            config.fnChartOnLoad();
                //        }
                //    }
                //}
            },
            colors: ['#d9544f', '#2e90cf', '#efad4d', '#69c09f', '#004c85', '#ffd119', '#006f72'],
            title: {
                text: config.ChartOptions.ChartTitle,
                floating: false, // true if title to be put inside the chart box
                align: 'center'
            },
            subtitle: {
                text: config.ChartOptions.ChartSubTitle
            },
            legend: {
                shadow: true
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true, // always show label on top of bar
                        crop: false,
                        overflow: 'none',


                    }
                },
                series: {
                    cursor: config.fnBarClick != undefined ? 'pointer' : 'default',
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            if (this.y === 0) { // hide 0 valued y axis bar
                                return null; // highchart considers null to avoid 0 display on y axis
                            }
                            else {
                                return this.y;
                            }
                        }
                    }, //http://jsfiddle.net/smfeo9sc/
                    point: {
                        events: {
                            click: function () {
                                if (config.fnBarClick != undefined) {
                                    return config.fnBarClick(this)
                                }
                                return false;
                            }
                        }
                    },
                    colorByPoint: config.ChartOptions.Series.length > 1 ? false : true, // each bar diff color(to keep bars in diff colors )
                    animation: {
                        duration: 2000,
                        easing: 'easeOutBounce'
                    }
                }
            },
            scrollbar: {
                enabled: config.ChartOptions.ScrollBar,
                barBackgroundColor: 'gray',
                barBorderRadius: 7,
                barBorderWidth: 0,
                buttonBackgroundColor: 'gray',
                buttonBorderWidth: 0,
                buttonArrowColor: 'yellow',
                buttonBorderRadius: 7,
                rifleColor: 'yellow',
                trackBackgroundColor: 'white',
                trackBorderWidth: 1,
                trackBorderColor: 'silver',
                trackBorderRadius: 7
            },
            xAxis: {
                min: config.ChartOptions.xAxis.Min,
                max: config.ChartOptions.xAxis.Max,
                categories: config.ChartOptions.xAxis.Categories,
                title: {
                    text: config.ChartOptions.xAxis.Title,
                    style: { "fontWeight": "bold" }
                },
                labels: {
                    useHTML: true,
                    formatter: function () {
                        if (config.fnXAxisLableClick != undefined) {
                            return '<a href="#" class="highcharts-xaxis-labels-big" onclick="return ' + config.fnXAxisLableClick + ';">' + this.value + '</a>';
                        }
                        else {
                            return "<span style='font-weight:bold;'> " + this.value + "</span>";
                        }

                    }
                }

            },
            yAxis: {
                className: 'highcharts-color-0',
                title: {
                    text: config.ChartOptions.yAxis.Title,
                    style: { "fontWeight": "bold" }
                }
            },

            series: config.ChartOptions.Series

        });
    }

    var LineChart = function (config) {

        var legendLayout = {};

        if (isIPad) {
            legendLayout =
                {
                    layout: 'horizontal'
                }
        }
        else {
            legendLayout =
                {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                }
        }


        return new Highcharts.chart(config.ContainerElementId, {

            chart: {
                type: config.ChartOptions.ChartType.toLowerCase()
            },
            title: {
                text: config.ChartOptions.ChartTitle,
                floating: false, // true if title to be put inside the chart box
                align: 'center'
            },
            subtitle: {
                text: config.ChartOptions.ChartSubTitle
            },
            legend: legendLayout,
            //plotOptions: {
            //    series: {
            //        pointStart: 2010
            //    }
            //},

            xAxis: {
                categories: config.ChartOptions.xAxis.Categories,
                title: {
                    text: config.ChartOptions.xAxis.Title,
                    style: { "fontWeight": "bold" }
                }
            },
            yAxis: {
                className: 'highcharts-color-0',
                title: {
                    text: config.ChartOptions.yAxis.Title,
                    style: { "fontWeight": "bold" }
                }
            },

            series: config.ChartOptions.Series

        });
    }

    var PieChart = function (config) {

        return new Highcharts.chart(config.ContainerElementId, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: config.ChartOptions.ChartType.toLowerCase()
            },
            title: {
                text: config.ChartOptions.ChartTitle
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    showInLegend: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false, //set it to true if data label needs to be shown. uncomment the below code as well if true.
                        format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    point: {
                        events: {
                            click: function () {
                                if (config.fnPieClick != undefined) {
                                    return config.fnPieClick(this.options)
                                }
                                return false;
                            }
                        }
                    }
                }
            },
            series: config.ChartOptions.Series
        });

    };

    var StackedColumnChart = function (config) {

        //$("#" + config.ContainerElementId).addClass("tf-column-highchart");
        return new Highcharts.chart(config.ContainerElementId, {

            chart: {
                type: config.ChartOptions.ChartType.toLowerCase()
            },
            // colors: ['#d9544f', '#2e90cf', '#efad4d', '#69c09f', '#004c85', '#ffd119', '#006f72'],
            title: {
                text: config.ChartOptions.ChartTitle,
                floating: false, // true if title to be put inside the chart box
                align: 'center'
            },
            subtitle: {
                text: config.ChartOptions.ChartSubTitle
            },
            legend: {
                title:
                    {
                        text: config.ChartOptions.LegendTitle

                    },
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                shadow: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false, // always show label inside stacked bar
                        crop: false,
                        overflow: 'none',
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
                        //formatter: function () {
                        //    if (this.y != 0) {
                        //        return this.y;
                        //    }
                        //    else {
                        //        return null;
                        //    }
                        //}
                    }
                },
                series: {
                    cursor: config.fnBarClick != undefined ? 'pointer' : 'default',
                    point: {
                        events: {
                            click: function () {
                                if (config.fnBarClick != undefined) {
                                    return config.fnBarClick(this)
                                }
                                return false;
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        formatter: function () {
                            if (this.y != 0) {
                                return this.y;
                            }
                            else {
                                return null;
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutBounce'
                    }
                }
            },
            scrollbar: {
                enabled: config.ChartOptions.ScrollBar,
                barBackgroundColor: 'gray',
                barBorderRadius: 7,
                barBorderWidth: 0,
                buttonBackgroundColor: 'gray',
                buttonBorderWidth: 0,
                buttonArrowColor: 'yellow',
                buttonBorderRadius: 7,
                rifleColor: 'yellow',
                trackBackgroundColor: 'white',
                trackBorderWidth: 1,
                trackBorderColor: 'silver',
                trackBorderRadius: 7
            },
            xAxis: {
                title: {
                    text: config.ChartOptions.xAxis.Title,
                    style: { "fontWeight": "bold" }
                },
                min: config.ChartOptions.xAxis.Min,
                max: config.ChartOptions.xAxis.Max,
                categories: config.ChartOptions.xAxis.Categories

            },
            yAxis: {
                title: {
                    text: config.ChartOptions.yAxis.Title,
                    style: { "fontWeight": "bold" }
                },
                stackLabels: {
                    enabled: true

                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            series: config.ChartOptions.Series

        });

    };

    Math.easeOutBounce = function (pos) {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
        }
        if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
        }
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    };



})(jQuery);