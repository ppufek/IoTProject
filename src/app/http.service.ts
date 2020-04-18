import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { IProduct } from './IProduct';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  //responseType: 'text'
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private REST_API_SERVER = "/api/measurements" //or /measurements-hardcoded

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(username, password): Observable<string> {
    httpOptions.headers = httpOptions.headers.set('username', username);
    httpOptions.headers = httpOptions.headers.set('password', password);
    return this.httpClient.get<string>(this.REST_API_SERVER, httpOptions);
  }
}
