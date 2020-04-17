import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from '../shared.service';
import HC_exporting from 'highcharts/modules/exporting';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
    date: string;
    value: string;
    measurementUnit: string;
  }

@Component({
  selector: 'app-light-measurement',
  templateUrl: './light-measurement.component.html',
  styleUrls: ['./light-measurement.component.css']
})
export class LightMeasurementComponent implements OnInit {

    displayedColumns: string[] = ['date', 'value', 'measurementUnit'];
    dataSource = new MatTableDataSource<PeriodicElement>();
  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  message1: Map<string, string[]>


  chartsOptions: {};
  Highcharts = Highcharts;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.sharedService.sharedMessage2.subscribe(message => this.message1 = message)
    console.log( "ovdje", this.message1); 

    let newArray: PeriodicElement[] = []

    for (let key of Array.from(this.message1.keys())) {

      for (let i = 0; i < this.message1.get(key).length; i++) {
        if (key === "valuesLight") {
          newArray.forEach(obj => {
              obj.value = this.message1.get(key)[i];
          });
        } else {
          let modal: PeriodicElement = {
            date: this.message1.get(key)[i],
            value: "0",
            measurementUnit: "lx"
          };
          newArray.push(modal)
        }
      }
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(newArray);


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
                      text: 'LUX'
                  },
                  labels: {
                      formatter: function () {
                          return Math.round(this.value).toFixed(1);
                      }
                  }
              },
              tooltip: {
                  split: true,
                  valueSuffix: ' phots'
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
                  name: 'Light Measurement',
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


