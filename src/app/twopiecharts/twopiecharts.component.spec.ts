import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwopiechartsComponent } from './twopiecharts.component';

describe('TwopiechartsComponent', () => {
  let component: TwopiechartsComponent;
  let fixture: ComponentFixture<TwopiechartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwopiechartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwopiechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
