import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningAzkarComponent } from './morning-azkar.component';

describe('MorningAzkarComponent', () => {
  let component: MorningAzkarComponent;
  let fixture: ComponentFixture<MorningAzkarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MorningAzkarComponent]
    });
    fixture = TestBed.createComponent(MorningAzkarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
