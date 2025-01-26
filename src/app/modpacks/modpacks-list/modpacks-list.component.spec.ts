import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModpacksListComponent } from './modpacks-list.component';

describe('ModpacksListComponent', () => {
  let component: ModpacksListComponent;
  let fixture: ComponentFixture<ModpacksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModpacksListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModpacksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
