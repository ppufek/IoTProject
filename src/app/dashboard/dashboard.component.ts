import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  date: string;
  value: string;
  measurementUnit: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  displayedColumns: string[] = ['date', 'value', 'measurementUnit'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  message: Map<string, string[]>
  // message1: Map<string, string[]>

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.sharedService.sharedMessage1.subscribe(message => this.message = message)

    let newArray: PeriodicElement[] = []

    for (let key of Array.from(this.message.keys())) {

      for (let i = 0; i < this.message.get(key).length; i++) {
        if (key === "valuesTemp") {
          newArray.forEach(obj => {
              obj.value = this.message.get(key)[i];
          });
        } else {
          let modal: PeriodicElement = {
            date: this.message.get(key)[i],
            value: "0",
            measurementUnit: "C"
          };
          newArray.push(modal)
        }
      }
    }

    this.dataSource = new MatTableDataSource<PeriodicElement>(newArray);

    // this.sharedService.sharedMessage2.subscribe(message => this.message1 = message)
    // console.log("Hello from Dashb LIGHT")
    // console.log(this.message1)
  }

}