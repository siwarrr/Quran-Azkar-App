import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AzkarService } from '../services/azkar.service';
import { Azkar } from '../azkar';
import { AzkarContent } from '../content';

@Component({
  selector: 'app-morning-azkar',
  templateUrl: './morning-azkar.component.html',
  styleUrls: ['./morning-azkar.component.css']
})
export class MorningAzkarComponent implements OnInit{

  morningAzkar: any[] = []; 
  eveningAzkar: any[] = []; 
  selectedAzkarContent: any[] = []; 
  selectedAzkarTitle: string = ''; 
  currentAudio: HTMLAudioElement | null = null;
  currentAzkarContent: string | null = null;
  isPlaying: boolean = false;

  constructor(private azkarService: AzkarService) {}

  ngOnInit(): void {
    this.azkarService.getAzkarList().subscribe(data => {
      this.morningAzkar = data['أذكار الصباح'];
      this.eveningAzkar = data['أذكار المساء'];
    });
  }

  loadAzkarContent(category: string): void {
    this.selectedAzkarContent = category === 'morning' ? this.morningAzkar : this.eveningAzkar;
    this.selectedAzkarTitle = category === 'morning' ? 'أذكار الصباح' : 'أذكار المساء';
  }

  toggleAudio(azkarContent: string): void {
    if (this.isPlaying && this.currentAzkarContent === azkarContent) {
      window.speechSynthesis.cancel(); // Stop reading
      this.isPlaying = false;
      this.currentAzkarContent = null;
      return;
    }

    this.currentAzkarContent = azkarContent;
    this.isPlaying = true;

    const utterance = new SpeechSynthesisUtterance(azkarContent);
    utterance.lang = 'ar-SA'; // Assurez-vous que l'arabe est défini
    utterance.onend = () => {
      this.isPlaying = false;
      this.currentAzkarContent = null;
    };

    window.speechSynthesis.speak(utterance);
  }

}
