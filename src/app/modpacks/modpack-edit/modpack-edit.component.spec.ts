import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModpackEditComponent } from './modpack-edit.component';

describe('ModpackEditComponent', () => {
  let component: ModpackEditComponent;
  let fixture: ComponentFixture<ModpackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModpackEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModpackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
