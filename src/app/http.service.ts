import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { IProduct } from './IProduct';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'username': 't5185958/iot1@croatia.rit.edu',
    'password': 'iotrit123'
  }),
  //responseType: 'text'
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private REST_API_SERVER = "http://localhost:8080/measurements" //or /measurements-hardcoded

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(): Observable<string> {
    return this.httpClient.get<string>(this.REST_API_SERVER, httpOptions);
  }
}
