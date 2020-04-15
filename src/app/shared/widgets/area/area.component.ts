import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { SharedService } from 'src/app/shared.service';


@Component({
    selector: 'app-widget-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

    chartsOptions: {};
    Highcharts = Highcharts;
    constructor(private sharedService: SharedService) { }

    ngOnInit() {
        this.sharedService.sharedMessage1.subscribe(measurements => {
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
                    categories: measurements.get("datesTemp"),
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
                    data: measurements.get("valuesTemp").map(i=>Math.round(Number(i)* 10)/10),
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
