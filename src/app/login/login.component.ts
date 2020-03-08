import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  product: any = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.httpService.sendGetRequest()
      .subscribe(data => {
        this.product = JSON.parse(JSON.stringify(data))

        console.log(this.product);
        let measurements = data['measurements']
          .map(data => data.measurement)

        console.log(data['measurements'])
        let measurementListLocal = []
        let measurementsFromServer = data['measurements']
        let counter = 0
        measurementsFromServer.forEach(element => {
          measurementListLocal.push(element)
          console.log(measurementListLocal[counter].type) //c8y_Serial, cro_c8y_LightMeasurement,c8y_TemperatureMeasurement
          
          //if Temperature
          if(measurementListLocal[counter].type === "c8y_TemperatureMeasurement") {
            console.log("TEMPERATURE")
            console.log(measurementListLocal[counter].id)
            console.log(measurementListLocal[counter].time)
            console.log(measurementListLocal[counter].c8y_TemperatureMeasurement)
          }
          else {
            
          }
          counter++;
        });
      }
      );
  }
}
