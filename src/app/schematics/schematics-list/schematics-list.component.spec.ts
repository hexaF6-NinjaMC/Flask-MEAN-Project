import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicsListComponent } from './schematics-list.component';

describe('SchematicsListComponent', () => {
  let component: SchematicsListComponent;
  let fixture: ComponentFixture<SchematicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchematicsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchematicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
