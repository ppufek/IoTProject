import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message: Map<string, string[]>
  message1: Map<string, string[]>

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.sharedMessage1.subscribe(message => this.message = message)
    console.log("Hello from Dashb TEMP")
    console.log(this.message)

    this.sharedService.sharedMessage2.subscribe(message => this.message1 = message)
    console.log("Hello from Dashb LIGHT")
    console.log(this.message1)
  }

}