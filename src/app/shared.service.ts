import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private loggedIn: boolean = false;

    private temperatureData = new BehaviorSubject<Map<string, string[]>>(new Map([["key1", ["value"]], ["key2", ["value"]]]));
    sharedMessage1 = this.temperatureData.asObservable();

    private lightMeasurementData = new BehaviorSubject<Map<string, string[]>>(new Map([["key1", ["value"]], ["key2", ["value"]]]));
    sharedMessage2 = this.lightMeasurementData.asObservable();

    constructor() { }

    insertTemperatureData(message: Map<string,string[]>) {
        this.temperatureData.next(message)
    }

    insertLightMeasurementData(message: Map<string,string[]>) {
        this.lightMeasurementData.next(message)
    }

    isLoggedIn():boolean{
        return this.loggedIn;
    }

    setLoggedIn(status){
        this.loggedIn = status; 
    }

}