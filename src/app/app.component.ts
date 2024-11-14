import { Component, OnInit } from '@angular/core';
import { QuranService } from './services/quran.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'QuranApp';
  home: boolean = true;
  randomVerse: any;

  constructor( private quranService: QuranService,
               private router: Router
  ) {}

  ngOnInit(): void {
    this.quranService.getVerses().subscribe( data => {
      this.randomVerse = this.getRandomVerses(data.verses);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.home = event.url === '/';
      }
    });
  }

  getRandomVerses(verses: any): any {
     const randomIndex = Math.floor(Math.random() * verses.length);
     return verses[randomIndex];
  }
}
