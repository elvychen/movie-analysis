var series = [
    { name:"North East",
      data:[63375.2, 62547.0, 62738.5, 62629.25, 64903.0, 59814.0, 58755.6],
      color: '#dd1021'
    },
    { name:"South West",
      data:[59841.4, 60272.25, 59319.25, 61150.5, 59837.25, 64433.0, 58117.0],
      color: '#FFC300'
    },
    { name: "North West",
      data: [58294.2, 61255.0, 60442.75, 61153.5, 60937.25, 61950.0, 59045.2],
      color: "#27251F"
    },
    { name: "South East",
      data: [56822.6, 58164.5, 58320.5, 59346.75, 58514.0, 61971.4, 58740.6],
      color: "#54B595"
    },
    { name: "Central",
      data: [58241.0, 60925.0, 59202.25, 59679.5, 59538.25, 62418.6, 59675.0],
      color: "#87CEFA"
    }
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
    text: 'Day of the Week'
  },
  categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Saturday']
}
var yAxis = {
  min: 0,
  title: {
    text: "USD  ($)"
  },
  stackLabels: {
    enabled: true,
    style: {
        fontWeight: 'bold',
        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
    }
  }
};
var legend = {
  align: 'right',
  x: 0,
  verticalAlign: 'top',
  y: -10,
  floating: true,
  borderColor: '#CCC',
  borderWidth: 1,
  shadow: false
};

var plotOptions = {
  column:{
    stacking:'normal',
    dataLabels: {
      enabled: true
    }
  }
};

// Data structure holding all configurations together
var bar_json = {};

// Typing all the configurations
bar_json.chart = chart;
bar_json.title = title;
bar_json.xAxis = xAxis;
bar_json.yAxis = yAxis;
bar_json.legend = legend; 
bar_json.plotOptions = plotOptions;

// Typing the data as series data
bar_json.series = series;

var someVar = document.getElementById("region_week");
console.log(series);
Highcharts.chart(someVar,bar_json)