import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranSurasComponent } from './quran-suras.component';

describe('QuranSurasComponent', () => {
  let component: QuranSurasComponent;
  let fixture: ComponentFixture<QuranSurasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuranSurasComponent]
    });
    fixture = TestBed.createComponent(QuranSurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
