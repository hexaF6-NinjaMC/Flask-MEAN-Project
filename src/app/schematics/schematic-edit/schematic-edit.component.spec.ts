import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicEditComponent } from './schematic-edit.component';

describe('SchematicEditComponent', () => {
  let component: SchematicEditComponent;
  let fixture: ComponentFixture<SchematicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchematicEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchematicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
