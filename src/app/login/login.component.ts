import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  chart = [];
  alert = "";
  username = "";
  password = "";
  regexp;
  regexp2;
  times: any = [];
  values: any = [];

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    //console.log(this.username, this.password);
    // this.regexValidation(); 
    this.validation();
    // this.sanitization(); 
  }

  validation() {
    if (this.username.trim().length == 0 || this.password.trim().length == 0) {
      this.alert = "Please provide username and password";
    } else {
      this.makeHTTPCall()
    }
  }

  makeHTTPCall() {
    this.httpService.sendGetRequest(this.username, this.password)
      .subscribe(res => {

        if (res == null) {
          console.log("ERROR")
          this.alert = "401 Unauthorized: Invalid Authentication Credentials"
        }
        else {
          this.sharedService.setLoggedIn(true); 
          this.extractData(res);

          //localStorage.setItem('loggedIn', 'true') //JSON.parse(localStorage.getItem('loggedIn'))--> returns boolean
        }
      });
  }

  extractData(data) {

    let measurementListLocal = []
    let measurementsFromServer = data['measurements']
    let counter = 0
    let keepGoing = false

    measurementsFromServer.forEach(element => {
      if (!keepGoing) {
        measurementListLocal.push(element)
        console.log(measurementListLocal[counter].type) //c8y_Serial, cro_c8y_LightMeasurement,c8y_TemperatureMeasurement

        let type = measurementListLocal[counter].type

        //if Temperature
        if (type === "c8y_TemperatureMeasurement") {
          let dateTime = data['measurements'][counter].time
          let date = dateTime.split("T", 2);
          let time = date[1].split(".", 1)
          this.times.push(date[0] + " " + time)
          let T = measurementListLocal[counter].c8y_TemperatureMeasurement.T

          JSON.parse(JSON.stringify(T), (key, value) => {

            if (key === "value") {
              this.values.push(value.toString())
            }
          });
        }
        //  if (measurementListLocal[counter].type === "cro_c8y_LightMeasurement") {
        //   console.log("LIGHT")
        //   console.log(data)
        //   console.log(data['measurements'][counter].time.substring(2, 10))
        //   let e = measurementListLocal[counter].c8y_LightMeasurement.e
        //   console.log(e)

        //   JSON.parse(JSON.stringify(e), (key, value) => {
        //     if (key === "unit") {
        //       console.log("UNIT: " + value)
        //     }
        //     if (key === "value") {
        //       console.log(" VALUE: " + value)
        //       //values.push(value.toString())
        //     }
        //   });
        // }
        else {
          keepGoing = true
          if (this.times.length < 2) {
            this.makeHTTPCall()
          }
        }
        counter++;
      }//end if keepGoing

    });
    this.sharedService.insertTemperatureData(new Map([["datesTemp", this.times], ["valuesTemp", this.values]]))

    console.log("FINAL")
    console.log(this.times)
    console.log(this.values)

    this.router.navigate(['/app/dashboard']);

    //https://ej2.syncfusion.com/angular/documentation/chart/legend/ FORMATTING LEGEND
    //   this.chart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: times,
    //       datasets: [
    //         {
    //           data: values,
    //           borderColor: '#3cba9f',
    //           fill: false
    //         }
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: true,
    //         labels: {
    //           fontColor: 'rgb(255, 99, 132)'
    //         }
    //       },
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //         yAxes: [{
    //           display: true
    //         }]
    //       }
    //     }
    //   })
  }

  // regexValidation(){
  //     this.regexp = new RegExp('[^!@#$%^&*(){}:"|/]')
  //     this.regexp2 = new RegExp('[^/]io|[^@]cro ')
  //     let test = this.regexp.test(this.username, this.password);
  //     console.log(test); 
  // }
}