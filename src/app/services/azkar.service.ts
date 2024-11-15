import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzkarService {

  private azkarUrl = 'https://raw.githubusercontent.com/nawafalqari/ayah/main/src/data/adkar.json'; 

  constructor(private http: HttpClient) {}

  getAzkarList(): Observable<any> {
    return this.http.get(this.azkarUrl);
  }
}
