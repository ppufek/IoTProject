import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';

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
  values = []
  times = []


  submitForm(): void {

    for (const i in this.validateForm.controls) {

      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.username, this.password);

    // this.regexValidation(); 
    this.validation();
    // this.sanitization(); 

    // https://angular.io/guide/http
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
          this.extractData(res);

          console.log("No errors!");
          //this.router.navigate(['dominik/dashboard']);
          //localStorage.setItem('loggedIn', 'true') //JSON.parse(localStorage.getItem('loggedIn'))--> returns boolean
        }
      });
  }

  extractData(data) {

    let measurements = data['measurements']
      .map(data => data.measurement)

    console.log(data['measurements'])
    let measurementListLocal = []
    let measurementsFromServer = data['measurements']
    let counter = 0
    let keepGoing = true


    measurementsFromServer.forEach(element => {
      if (keepGoing) {
        measurementListLocal.push(element)
        console.log(measurementListLocal[counter].type) //c8y_Serial, cro_c8y_LightMeasurement,c8y_TemperatureMeasurement

        //if Temperature
        if (measurementListLocal[counter].type === "c8y_TemperatureMeasurement") {
          let dateTime = data['measurements'][counter].time
          let date = dateTime.split("T", 2);
          let time = date[1].split(".", 1)
          this.times.push(date[0] + " " + time)
          let T = measurementListLocal[counter].c8y_TemperatureMeasurement.T

          const userStr = JSON.stringify(T);

          JSON.parse(userStr, (key, value) => {

            if (key === "value") {
              this.values.push(value.toString())
            }
          });

        }
        else {
          console.log("a tu")
          keepGoing = false
          if (this.times.length == 0) {
            this.makeHTTPCall()
          }
        }
        counter++;
      }//end if keepGoing

    });
    console.log("FINAL")
    console.log(this.times)
    console.log(this.values)


    //https://ej2.syncfusion.com/angular/documentation/chart/legend/ FORMATTING LEGEND
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.times,
          datasets: [
            {
              data: this.values,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: 'rgb(255, 99, 132)'
            }
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })
  }

  // regexValidation(){
  //     this.regexp = new RegExp('[^!@#$%^&*(){}:"|/]')
  //     this.regexp2 = new RegExp('[^/]io|[^@]cro ')
  //     let test = this.regexp.test(this.username, this.password);
  //     console.log(test); 
  // }

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

  product: any = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

  }
}
