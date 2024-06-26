import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAnalysisComponent } from './result-analysis.component';

describe('ResultAnalysisComponent', () => {
  let component: ResultAnalysisComponent;
  let fixture: ComponentFixture<ResultAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
