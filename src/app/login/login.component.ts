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
  timesTesla: any = [];
  valuesTesla: any = [];
  isTeslaMeasurement = false;
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
    this.validation();

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

        console.log(measurementListLocal[counter].type) //c8y_Serial, cro_c8y_LightMeasurement,c8y_TemperatureMeasurement, cro_TeslaMeasurement

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
        if (measurementListLocal[counter].type === "cro_TeslaMeasurement" && this.valuesTesla.length < 5) {
          this.isTeslaMeasurement = true;
          let times = "2020-01-28"
                    + " 11:" + Math.floor((Math.random() * 60) + 1) + ":" + Math.floor((Math.random() * 60) + 1)
          this.timesTesla.push(times)
          let e = measurementListLocal[counter].cro_TeslaMeasurement
          console.log(measurementListLocal[counter].cro_TeslaMeasurement);
          console.log("Paula");
          console.log(measurementListLocal[counter].cro_TeslaMeasurement.e); 
          console.log("Dominik");
          JSON.parse(JSON.stringify(e), (key, value) => {
            if (key === "unit") {
            }
            if (key === "value") {
              this.valuesTesla.push(value.toString())
            }
          });
        }

        counter++;
      }//end if keepGoing

    });
    if (this.isTemperature && this.isTeslaMeasurement) {
      this.sharedService.insertTemperatureData(new Map([["datesTemp", this.times], ["valuesTemp", this.values]]))
       this.sharedService.insertTeslaMeasurementData(new Map([["datesTesla", this.timesTesla], ["valuesTesla", this.valuesTesla]]))

      this.router.navigate(['/app/dashboard']);
    } else {
      keepGoing = true
      this.makeHTTPCall()
    }
  }


}