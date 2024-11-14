import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzkarService {

  private arabicAzkarUrl = 'http://www.hisnmuslim.com/api/ar/husn_ar.json';

  constructor(private http: HttpClient) {}

  getAzkarList(): Observable<any> {
    return this.http.get(this.arabicAzkarUrl); 
  }

  getAzkarContent(url: string): Observable<any> {
    return this.http.get(url); 
  }
}
