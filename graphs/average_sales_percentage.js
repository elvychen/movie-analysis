var series = [
  {
      name:"USD_sales",
      data:[["Sunday", 296574.40],
            ["Monday",303164.75],
            ["Tuesday",300025.25],
            ["Wednesday",303962.50],
            ["Thursday",303733.75],
            ["Friday",310592.00],
            ["Saturday",294339.40]
      ]

    }
]

// Configuration about the plot
var chart = {
  plotBackgroundColor: null,
  plotBorderWidth: null,
  plotShadow: false,
  type: 'pie'
}
var title = {
    style: {
        display: 'none',
    }
}

var plotOptions = {
  pie:{
    allowPointSelect: true,
    cursor: 'pointer',
    dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
    },
    colors :['#dd1021','#FFC300','4169E1','#87CEFA','#F08080','#98FB98','#0000CD']
  }
};

// Data structure holding all configurations together
var pie_json = {};

// Typing all the configurations
pie_json.chart = chart;
pie_json.title = title;
pie_json.plotOptions = plotOptions;

// Typing the data as series data
pie_json.series = series;

var someVar = document.getElementById("region_pie");
console.log(series);
Highcharts.chart(someVar,pie_json)