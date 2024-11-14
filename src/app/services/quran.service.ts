import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuranService {

  private apiUrl = 'https://api.alquran.cloud/v1';

  constructor(private http: HttpClient) { }
  
  getVerses(): Observable<any> {
    return this.http.get<any>('assets/txt.json');
  }

  getAllSurahs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surah`);
  }

  getSurahContent(surahNumber: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/surah/${surahNumber}`);
  }
  
}
