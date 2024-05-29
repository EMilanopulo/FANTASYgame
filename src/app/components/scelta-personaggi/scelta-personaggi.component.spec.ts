import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaPersonaggiComponent } from './scelta-personaggi.component';

describe('SceltaPersonaggiComponent', () => {
  let component: SceltaPersonaggiComponent;
  let fixture: ComponentFixture<SceltaPersonaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceltaPersonaggiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaPersonaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
