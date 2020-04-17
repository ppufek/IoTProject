import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
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
  timesLight: any = [];
  valuesLight: any = [];
  isLightMeasurement = false;
  isTemperature = false;
  hide = true
  passwordInput 

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
          this.alert = "401 Unauthorized: Invalid Authentication Credentials"
        }
        else {
          this.sharedService.setLoggedIn(true);
          this.extractData(res);
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
        if (type === "c8y_TemperatureMeasurement" && this.values.length < 5) {
          this.isTemperature = true;
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
        if (measurementListLocal[counter].type === "cro_c8y_LightMeasurement" && this.valuesLight.length < 5) {
          this.isLightMeasurement = true;
          let times = "2020-01-28"
                    + " 11:" + Math.floor((Math.random() * 60) + 1) + ":" + Math.floor((Math.random() * 60) + 1)
          this.timesLight.push(times)
          let e = measurementListLocal[counter].c8y_LightMeasurement.e

          JSON.parse(JSON.stringify(e), (key, value) => {
            if (key === "unit") {
            }
            if (key === "value") {
              this.valuesLight.push(value.toString())
            }
          });
        }

        counter++;
      }//end if keepGoing

    });
    if (this.isTemperature && this.isLightMeasurement) {
      this.sharedService.insertTemperatureData(new Map([["datesTemp", this.times], ["valuesTemp", this.values]]))
      this.sharedService.insertLightMeasurementData(new Map([["datesLight", this.timesLight], ["valuesLight", this.valuesLight]]))

      this.router.navigate(['/app/dashboard']);
    } else {
      keepGoing = true
      this.makeHTTPCall()
    }
  }

  // regexValidation(){
  //     this.regexp = new RegExp('[^!@#$%^&*(){}:"|/]')
  //     this.regexp2 = new RegExp('[^/]io|[^@]cro ')
  //     let test = this.regexp.test(this.username, this.password);
  //     console.log(test); 
  // }
}