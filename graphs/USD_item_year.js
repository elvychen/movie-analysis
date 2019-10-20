var series = [
    {
        name:"Hamburger",
        data:[5598648,
            5840210,
            5909899,
            5799715,
            6080407,
            6056108,
            6163373,
            6537463,
            6382884,
            6343865,
            6490244,
            6340076,
            6685774,
            7152982,
            6817973,
            6863707,
            6964094,
            7167558,
            6840830,
            7497876,
            7352926,
            7170291,
            7549336,
            7707776,
            7887763,
            7990228,
            7654312,
            7947352,
            8186393,
            7629715,
            8012517,
            8060250,
            7922921,
            6781234,
            7386402,
            6954506,
            7568561,
            7350256,
            7267799,
            7317841,
            7620829,
            7124175,
            6956441,
            7190660,
            7142860],
            color: '#DD1021'
    },
    {
        name: "Chicken fillet",
        data:[2352671,
            2394392,
            2461847,
            2455722,
            2533501,
            2504226,
            2547327,
            2723694,
            2617860,
            2663903,
            2748759,
            2599316,
            2808128,
            2911445,
            2886869,
            2813861,
            2878324,
            2962089,
            2944269,
            3173062,
            3063462,
            2987291,
            3096246,
            3186172,
            3234631,
            3328733,
            3139645,
            3285062,
            3438398,
            3256752,
            3338673,
            3467244,
            3327230,
            2862020,
            3052314,
            2874069,
            3128423,
            3061564,
            3003545,
            3073157,
            3175075,
            2921766,
            2852679,
            2995435,
            3023767
        ],
        color: '#FFC300'
    },
    {
        name: "Fish fillet",
        data: [1399660,
            1448157,
            1453511,
            1461148,
            1507504,
            1514266,
            1553107,
            1620900,
            1609076,
            1611235,
            1661883,
            1559588,
            1698295,
            1759942,
            1732267,
            1715924,
            1754566,
            1748524,
            1751563,
            1888539,
            1809174,
            1806878,
            1887120,
            1942176,
            1926117,
            2028810,
            1883343,
            2019461,
            2063039,
            1954050,
            1987216,
            2014826,
            1997118,
            1730781,
            1860819,
            1710520,
            1861751,
            1866627,
            1802980,
            1859086,
            1890213,
            1752262,
            1738859,
            1768857,
            1815026
        ],
        color: '#27251F'
    }
]

// Configuration about the plot
var title = {
    style: {
        display: 'none',
    }
}
var chart = {
    type: 'line',
    spacingBottom: 0,
    spacingTop: 10,
    spacingLeft: 50,
    spacingRight: 50,
    
}

var xAxis = {
    title: {
      text: 'Date'
    },
    categories:['Jan-16', 'Feb-16', 'Mar-16', 'Apr-16', 'May-16', 'Jun-16', 'Jul-16',
        'Aug-16', 'Sep-16', 'Oct-16', 'Nov-16', 'Dec-16', 'Jan-17', 'Feb-17',
        'Mar-17', 'Apr-17', 'May-17', 'Jun-17', 'Jul-17', 'Aug-17', 'Sep-17',
        'Oct-17', 'Nov-17', 'Dec-17', 'Jan-18', 'Feb-18', 'Mar-18', 'Apr-18',
        'May-18', 'Jun-18', 'Jul-18', 'Aug-18', 'Sep-18', 'Oct-18', 'Nov-18',
        'Dec-18', 'Jan-19', 'Feb-19', 'Mar-19', 'Apr-19', 'May-19', 'Jun-19',
        'Jul-19', 'Aug-19', 'Sep-19']
};
var yAxis = {
    title: {
      text: "USD ($)"
    },
    plotLines:[{
      value: 0,
      width: 1,
      color: '#808080'
    }]
};
  
var legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
};
  
// Data structure holding all configurations together
var json = {};
  
// Typing all the configurations
json.title = title;
json.chart = chart;
json.xAxis = xAxis;
json.yAxis = yAxis;
json.legend = legend; 
  
  // Typing the data as series data
json.series = series;
  
var someVar = document.getElementById("ItemsSoldOvertime");
console.log(series);
Highcharts.chart(someVar,json)