import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeFullComponent } from './about-me-full.component';

describe('AboutMeFullComponent', () => {
  let component: AboutMeFullComponent;
  let fixture: ComponentFixture<AboutMeFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeFullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMeFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
