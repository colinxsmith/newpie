import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PctbarComponent } from './pctbar.component';

describe('PctbarComponent', () => {
  let component: PctbarComponent;
  let fixture: ComponentFixture<PctbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PctbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PctbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
