import { Component, OnInit } from '@angular/core';
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

  submitForm(): void {

    for (const i in this.validateForm.controls) {

      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.username, this.password);

    // this.regexValidation(); 
    this.validation(); 
    // this.sanitization(); 
    //console.log(this.httpService.sendGetRequest())

    // https://angular.io/guide/http



    // .subscribe(data => {
    //   this.product = JSON.parse(JSON.stringify(data))
    //   console.log(data)
    //   console.log(this.product);
    //   let measurements = data['measurements']
    //     .map(data => data.measurement)

    //   console.log(data['measurements'])
    //   let measurementListLocal = []
    //   let measurementsFromServer = data['measurements']
    //   let counter = 0
    //   measurementsFromServer.forEach(element => {
    //     measurementListLocal.push(element)
    //     console.log(measurementListLocal[counter].type) //c8y_Serial, cro_c8y_LightMeasurement,c8y_TemperatureMeasurement

    //     //if Temperature
    //     if(measurementListLocal[counter].type === "c8y_TemperatureMeasurement") {
    //       console.log("TEMPERATURE")
    //       console.log(measurementListLocal[counter].id)
    //       console.log(measurementListLocal[counter].time)
    //       console.log(measurementListLocal[counter].c8y_TemperatureMeasurement)


    //       console.log("counter: " + counter)
    //       console.log(data['measurements'][counter])
    //       console.log(data['measurements'][counter].time)

    //     }
    //     else {

    //     }
    //     counter++;

    //     //https://ej2.syncfusion.com/angular/documentation/chart/legend/ FORMATTING LEGEND

    //     let times = ["2020-01-01", "2020-03-03", "2020-03-09"]

    //     let temp_min = '-10'
    //     let temp_max = '23'

    //     this.chart = new Chart('canvas', {
    //       type: 'line',
    //       data: {
    //         labels: times,
    //         datasets: [
    //           {
    //             data: [temp_min, '10', temp_max],
    //             borderColor: '#3cba9f',
    //             fill: false
    //           }
    //         ]
    //       },
    //       options: {
    //         legend: {
    //           display: true,
    //           labels: {
    //             fontColor: 'rgb(255, 99, 132)'}
    //         },
    //         scales: {
    //           xAxes: [{
    //             display: true
    //           }],
    //           yAxes: [{
    //             display: true
    //           }]
    //         }
    //       }
    //     })

    //   });
    // }
    // );
  }

  validation() {
    if (this.username.trim().length == 0 || this.password.trim().length == 0) {
      this.alert = "Please provide username and password";
    } else {
      
      this.httpService.sendGetRequest(this.username, this.password)
        .subscribe(res => {
          console.log(res); 
          if (res == null) {
            console.log("ERROR")
            this.alert = "401 Unauthorized: Invalid Authentication Credentials"
          }
          else {
             console.log("No errors!");
             this.router.navigate(['dominik/dashboard']); 
            }
        });
    }
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
