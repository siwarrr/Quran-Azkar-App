import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningAzkarComponent } from './morning-azkar/morning-azkar.component';
import { QuranSurasComponent } from './quran-suras/quran-suras.component';

const routes: Routes = [
  { path: 'azkar', component: MorningAzkarComponent},
  { path: 'quran-suras', component: QuranSurasComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
