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
    document.getElementById('timeline').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;

            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                if (chart==null || chart.renderTo==null){
                    continue;
                }
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);
                if (point) {
                    if (chart.renderTo.id == "timeline"){
                        var data = missionImpossible[point.id];
                        geomap.setTitle({'text':"Movie: "+timeline_dict[point.x][0]});
                        if (data == null){
                            geomap.setSubtitle({'text':"No Box Office Information"});
                            geomap.series[0].update({'data':[]});
                        }
                        else if (data.length==0){
                            geomap.setSubtitle({'text':'The Movie Is Not Released'})
                            geomap.series[0].update({'data':[]});
    
                        }
                        else{
                            price = getTotalBoxOffice(data);
                            geomap.series[0].update({'data':data});
                            geomap.setSubtitle({'text':"Total Box Office Across the World: $"+price});
                        }
                    }
                    
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
function getTotalBoxOffice(dataset){
    totalvalue = 0;
    for (i = 0;i<dataset.length;i++){
        totalvalue+=dataset[i]['value'];
    }
    return totalvalue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
}
var timeline = {
    chart: {
      zoomType: 'x',
      type: 'timeline'
    },
    xAxis: {
      type: 'datetime',
      visible: false,
      labels: {
        format: '{value:%Y-%b-%e}'
      },
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
      text: "Timeline of Tom Cruise's movies"
    },
    subtitle: {
        text: 'Year of the Movies that Tom Cruise Acted In'
    },
    tooltip: {
      style: {
        width: 300
      },
      formatter: function(){
            var movies = timeline_dict[this.x];
            var color = this.color;
            var date = Highcharts.dateFormat('%b %e, %Y',this.x);
            return '<span style="color:'+color+'">'+date+'<br/><span style="color:'+color+'">● </span><span style="font-weight: bold;" ></span>'+movies[0]+'<br/>';
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
var missionImpossible = {};

Highcharts.ajax({
    url:'./data/final_data.json',
    dataType:'text',
    success: function(activity){
        activity = JSON.parse(activity);
        dataset = activity[0];
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
            if (timeline_dict[Date.parse(year)].includes(title)==false){
                timeline_dict[Date.parse(year)].push(title);
            }
            movie_dict['x'] = Date.parse(year);
            movie_dict['name'] = title;
            movie_dict['label'] = title;
            movie_dict['id'] = movie_ids[i];
            timeline_data.unshift(movie_dict);
        }
        timeline.series[0].data = timeline_data;
        Highcharts.chart('timeline',timeline);
        MI_orig = activity[1];
        MI_movie_id = Object.keys(MI_orig);
        for (i = 0;i<MI_movie_id.length;i++){
            box_office = MI_orig[MI_movie_id[i]];
            movie_countries = Object.keys(box_office);
            countries = [];
            for (j = 0;j<movie_countries.length;j++){
                movie = {};
                movie['name'] = movie_countries[j];
                movie['value'] = parseInt(box_office[movie_countries[j]]);
                countries.push(movie);
            }
            missionImpossible[MI_movie_id[i]] = countries;
        }

        radarData = activity[2];
        Highcharts.chart('radar', {

            chart: {
              parallelCoordinates: true,
              polar: true,
              type:'line',
            },
          
            xAxis: {
              categories: ['rating', 'rating_count', 'num_movies', 'runtime', 'num_stars', 'box_office'],
              tickmarkPlacement: 'on',
              lineWidth: 0
            },
          
            legend: {
              enabled: true
            },
            tooltip: {
                shared: true,
            },
            yAxis: [{
              min: 0,
              max: 10,
              showLastLabel: true,         
              lineWidth: 0,
              gridLineInterpolation: 'polygon',
            }, {
              min: 0,
              max: 350000,
              showLastLabel: true,         
              lineWidth: 0,              
              gridLineInterpolation: 'polygon',

            }, {
              min: 0,
              max: 45,
              showLastLabel: true,          
              lineWidth: 0,             
              gridLineInterpolation: 'polygon',
            }, {
                min: 0,
                max: 145,
                showLastLabel: true,          
                lineWidth: 0,             
                gridLineInterpolation: 'polygon',
              }, {
                min: 0,
                max: 10,
                showLastLabel: true,            
                lineWidth: 0,           
                gridLineInterpolation: 'polygon',
              }, {
                min: 0,
                max: 600000000,
                showLastLabel: true,           
                lineWidth: 0,            
                gridLineInterpolation: 'polygon',
              }],
            series: radarData,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom'
                        },
                        pane: {
                            size: '70%'
                        }
                    }
                }]
            }
          });}

    
});
geomap = new Highcharts.mapChart('geomap', {
    chart: {
      map: 'custom/world',
      height:600,
    },
    title: {
        text: 'Box Office Across the World',
        useHTML: true,
      },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    subtitle:{
        text: "",
        useHTML : true,
    },
    credits:{
        enabled: false,
    },
    colorAxis:{
        endOnTick: true,
        minColor: '#66CABE',
        maxColor: '#3C33FF',
        type: 'logarithmic',
    },
    series: [{
      data: [],
      joinBy: ['name', 'name'],
      name: 'Box Office',
      states: {
        hover: {
          color: '#a4edba'
        }
      }
    }]
});

