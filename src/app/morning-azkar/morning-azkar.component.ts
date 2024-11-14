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

  azkarList: Azkar[] = []; // Liste principale des Azkars
  selectedAzkarContent: AzkarContent[] = []; // Contenu détaillé de l'Azkar sélectionné
  selectedAzkarTitle: string = '';
  isAudioPlayingMap: { [key: number]: boolean } = {}; // Gère l'état de lecture par ID

  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef>;

  constructor(private azkarService: AzkarService) {}

  ngOnInit(): void {
    this.azkarService.getAzkarList().subscribe((data: { [key: string]: Azkar[] }) => {
      this.azkarList = data['العربية'].filter((azkar: Azkar) => azkar.TITLE.includes('الصباح'));
    });
  }

  loadAzkarContent(url: string, title: string): void {
    this.azkarService.getAzkarContent(url).subscribe((content: { [key: string]: AzkarContent[] }) => {
      this.selectedAzkarContent = content['أذكار الصباح والمساء'];
      this.selectedAzkarTitle = title;
      this.isAudioPlayingMap = {}; // Réinitialise les états audio
    });
  }

  toggleAudio(id: number): void {
    const audioElement = this.audioPlayers.find(player => player.nativeElement.id === `audio-${id}`)?.nativeElement;

    if (audioElement) {
      if (audioElement.paused) {
        this.stopAllAudios(); // Arrête tous les autres audios
        audioElement.play();
        this.isAudioPlayingMap[id] = true;
      } else {
        audioElement.pause();
        this.isAudioPlayingMap[id] = false;
      }
    }
  }

  stopAllAudios(): void {
    this.audioPlayers.forEach(player => {
      player.nativeElement.pause();
    });
    this.isAudioPlayingMap = {}; // Réinitialise l'état
  }

  onAudioEnded(id: number): void {
    this.isAudioPlayingMap[id] = false;
  }
}
