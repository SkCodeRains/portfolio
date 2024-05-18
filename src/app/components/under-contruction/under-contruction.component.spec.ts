import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderContructionComponent } from './under-contruction.component';

describe('UnderContructionComponent', () => {
  let component: UnderContructionComponent;
  let fixture: ComponentFixture<UnderContructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderContructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderContructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
