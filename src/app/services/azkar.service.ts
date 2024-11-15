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
    // Récupère juste la dernière partie de l'URL et utilise le proxy
    const endpoint = url.split('/').pop();
    const proxyUrl = `https://<quran-azkar-app>.vercel.app/proxy/ar/${endpoint}`;
    return this.http.get(proxyUrl);
  }
  
}
