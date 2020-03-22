import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-widget-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  Highcharts = Highcharts; 
  chartsOptions = {}
  constructor() { }

  ngOnInit() {
 
    this.chartsOptions =  {
      chart: {
          type: 'area'
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      xAxis: {
          categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              text: 'Billions'
          },
          labels: {
              formatter: function () {
                  return this.value / 1000;
              }
          }
      },
      tooltip: {
          split: true,
          valueSuffix: ' millions'
      },
     credits:{
       enabled: false
     },
     exporting:{
      enabled: false,
     },
      series: [{
      data: [71, 78, 39, 66]
      }]
  
  };

  HC_exporting(Highcharts);

  setTimeout(()=>{
      window.dispatchEvent(
          new Event('resize')
      );
  }, 300)
  
  }

}
