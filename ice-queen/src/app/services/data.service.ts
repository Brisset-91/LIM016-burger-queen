import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //@Output() disparador: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {

    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("../../assets/data.json");
    // ../assets/menuData.json
  }

}



