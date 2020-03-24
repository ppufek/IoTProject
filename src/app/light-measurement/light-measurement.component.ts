import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from '../shared.service';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-light-measurement',
  templateUrl: './light-measurement.component.html',
  styleUrls: ['./light-measurement.component.css']
})
export class LightMeasurementComponent implements OnInit {

  
  chartsOptions: {};
  Highcharts = Highcharts;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
      this.sharedService.sharedMessage2.subscribe(measurements => {
          console.log('Widget', measurements);

          this.chartsOptions = {
              chart: {
                  type: 'area'
              },
              title: {
                  text: 'Some random data'
              },
              subtitle: {
                  text: 'RIT Intelligence'
              },
              xAxis: {
                  categories: measurements.get("datesLight"),
                  tickmarkPlacement: 'on',
                  title: {
                      enabled: false
                  }
              },
              yAxis: {
                  title: {
                      text: 'Celsius'
                  },
                  labels: {
                      formatter: function () {
                          return Math.round(this.value).toFixed(1);
                      }
                  }
              },
              tooltip: {
                  split: true,
                  valueSuffix: ' degrees'
              },
              plotOptions: {
                  area: {
                      stacking: 'normal',
                      lineColor: '#666666',
                      lineWidth: 1,
                      marker: {
                          lineWidth: 1,
                          lineColor: '#666666'
                      }
                  }
              },
              series: [{
                  name: 'Temperature',
                  data: measurements.get("valuesLight").map(i=>Math.round(Number(i)* 10)/10),
              }, 
              ]

          };

      })


      HC_exporting(Highcharts);

      setTimeout(() => {
          window.dispatchEvent(
              new Event('resize')
          );
      }, 300)

  }
}


