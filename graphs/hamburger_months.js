var series = [
  { name: 'North East',
    data: [-48671.0, -226097.0, 171423.0],
    color: '#dd1021'
  },
  { name: 'South West',
    data: [17046.0, -290932.0, 173404.0],
    color: '#FFC300'
  },
  { name: 'North West',
    data: [-43918.0, -267110.0, 89664.0],
    color: '#27251F'
  },
  { name: 'South East',
    data: [-38014.0, -201926.0, 83218.0],
    color: '#54B595'
  },
  { name: 'Central',
    data: [-23772.0, -155622.0, 87459.0],
    color: '#87CEFA'
  },
]

// Configuration about the plot
var chart = {
  type: 'column'
}
var title = {
    style: {
        display: 'none',
    }
}

var xAxis = {
  title: {
    text: 'Difference in Month'
  },
  categories: ['Aug-Sep 18','Sep-Oct 18','Oct-Nov 18'],
  //crosshair: true
}
var credits = {
  enabled: false
}
var yAxis = {
    title: {
    text: "Difference in USD ($)"
  },
};
var legend = {
  align: 'right',
  x: 0,
  verticalAlign: 'top',
  y: -10,
  floating: true,
  borderColor: '#CCC',
  borderWidth: 3,
  shadow: false
};

var plotOptions = {
    column: {
        pointPadding: 0.2,
        borderWidth: 0
    }
};

// Data structure holding all configurations together
var bar_json = {};

// Typing all the configurations
bar_json.chart = chart;
bar_json.title = title;
bar_json.credits = credits;
bar_json.xAxis = xAxis;
bar_json.yAxis = yAxis;
bar_json.legend = legend; 
bar_json.plotOptions = plotOptions;

// Typing the data as series data
bar_json.series = series;

var someVar = document.getElementById("HamburgerComparison");
console.log(series);
Highcharts.chart(someVar,bar_json)