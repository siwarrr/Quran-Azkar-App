import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuranService } from '../services/quran.service';

@Component({
  selector: 'app-quran-suras',
  templateUrl: './quran-suras.component.html',
  styleUrls: ['./quran-suras.component.css']
})
export class QuranSurasComponent implements OnInit{

  quranSuras: any[] = []; 
  selectedSurah: any; 
  surahVerses: any[] = []; 
  filteredSurahVerses: any[] = [];
  showSurahContent: boolean = false;
  audioSrc: string | null = null;
  isAudioPlaying: boolean = false;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor(private quranService: QuranService) {}

  ngOnInit(): void {
    this.quranService.getAllSurahs().subscribe(data => {
      console.log('Liste des sourates:', data);
      this.quranSuras = data.data;
    });
  }

  loadSurahContent(surahNumber: number): void {
    this.quranService.getSurahContent(surahNumber).subscribe(data => {
      console.log('Contenu de la sourate:', data);
      this.selectedSurah = data.data;
      this.surahVerses = data.data.ayahs;
  
      // Exclure le filtrage de la Basmala pour la Sourate Al-Fatiha (numéro 1)
      if (surahNumber !== 1) {
        // Vérifier si le premier verset est la Basmala uniquement
        if (this.surahVerses[0]?.text.trim() === 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ') {
          this.filteredSurahVerses = this.surahVerses.slice(1); // Exclut la Basmala
        } else if (this.surahVerses[0]?.text.includes('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ')) {
          // Si Basmala est dans le même verset, supprimer uniquement cette partie
          this.surahVerses[0].text = this.surahVerses[0].text.replace('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ', '').trim();
          this.filteredSurahVerses = this.surahVerses;
        } else {
          this.filteredSurahVerses = this.surahVerses; // Aucun changement
        }
      } else {
        // Ne pas filtrer pour Al-Fatiha, afficher tous les versets
        this.filteredSurahVerses = this.surahVerses;
      }
  
      this.showSurahContent = true;
      this.audioSrc = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
    });
  }     

  toggleAudio(): void {
    const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isAudioPlaying = true;
    } else {
      audio.pause();
      this.isAudioPlaying = false;
    }
  }

  onAudioEnded(): void {
    this.isAudioPlaying = false;
  }

  close(surahNumber: number): void {
    this.quranService.getSurahContent(surahNumber).subscribe(data => {
      console.log('Contenu de la sourate:', data);
      this.selectedSurah = null;
      this.surahVerses = [null];
      this.showSurahContent = false;
    });
  }
}
