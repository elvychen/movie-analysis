/*
The purpose of this demo is to demonstrate how multiple charts on the same page
can be linked through DOM and Highcharts events and API methods. It takes a
standard Highcharts config with a small variation for each data set, and a
mouse/touch event handler to bind the charts together.
*/


/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */
['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document.getElementById('container').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;

            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);

                if (point) {
                    point.highlight(e);
                }
            }
        }
    );
});

/**
 * Override the reset function, we don't need to hide the tooltips and
 * crosshairs.
 */
Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
Highcharts.Point.prototype.highlight = function (event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

/**
 * Synchronize zooming through the setExtremes event handler.
 */
function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        { trigger: 'syncExtremes' }
                    );
                }
            }
        });
    }
}

var timeline = {
    chart: {
      zoomType: 'x',
      type: 'timeline'
    },
    xAxis: {
      type: 'datetime',
      visible: false,
      dateTimeLabelFormats: {
        year: '%Y'   
     }
    },
    yAxis: {
      gridLineWidth: 1,
      title: null,
      labels: {
        enabled: false
      }
    },
    legend: {
      enabled: false
    },
    credits:{
        enabled: false,
    },
    title: {
      text: 'Timeline of Space Exploration'
    },
    subtitle: {
        text: 'hello'
    },
    tooltip: {
      style: {
        width: 300
      },
      formatter: function(){
            var movies = timeline_dict[this.x];
            var color = this.color;
            var date = Highcharts.dateFormat('%Y',this.x);
            var to_return = '<span style="color:'+color+'">'+date+'<br/>';
            movies.forEach(function(i){
                to_return += '<span style="color:'+color+'">● </span><span style="font-weight: bold;" ></span>'+i+'<br/>';
                }
            );
            return to_return;
        },
    },
    series: [{
      dataLabels: {
        allowOverlap: false,
        formatter: function(){
            if (this.point.label.includes('Mission')){
                var date = Highcharts.dateFormat('%Y',this.x);
                return '<span style="color:'+this.point.color+'">● </span><span style="font-weight: bold;" > ' +
                    date+'</span><br/>'+this.point.label;
            }
        }
      },
      marker: {
        symbol: 'circle'
      },
      data: [],
    }]
  }
var dataset = {};
var timeline_dict = {};
Highcharts.ajax({
    url:'./data/timelinedata.json',
    dataType:'text',
    success: function(activity){   
        activity = JSON.parse(activity);
        dataset = activity;
        timeline_data = [];
        movie_ids = Object.keys(dataset);
        for (i =0;i<movie_ids.length;i++){
            current_movie = dataset[movie_ids[i]];
            year = current_movie['year'];
            if (year==null){
                continue;
            }
            if (timeline_dict.hasOwnProperty(Date.parse(year))==false){
                timeline_dict[Date.parse(year)] = [];
            }
            movie_dict = {};
            title = current_movie['title'];
            timeline_dict[Date.parse(year)].push(title)
            movie_dict['x'] = Date.parse(year);
            movie_dict['name'] = title;
            movie_dict['label'] = title;
            timeline_data.unshift(movie_dict);
        }
        console.log(timeline_data);
        timeline.series[0].data = timeline_data;
        Highcharts.chart('container',timeline);

    }
});

