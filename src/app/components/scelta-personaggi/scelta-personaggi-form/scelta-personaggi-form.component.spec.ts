import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaPersonaggiFormComponent } from './scelta-personaggi-form.component';

describe('SceltaPersonaggiFormComponent', () => {
  let component: SceltaPersonaggiFormComponent;
  let fixture: ComponentFixture<SceltaPersonaggiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceltaPersonaggiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaPersonaggiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
