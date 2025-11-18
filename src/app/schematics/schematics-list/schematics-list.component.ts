import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Schematic } from '../schematic.model';
import { Subscription } from 'rxjs';
import { SchematicsService } from '../schematics.service';

@Component({
  selector: 'video-jokebot-schematics-list',
  templateUrl: './schematics-list.component.html',
  styleUrl: './schematics-list.component.css',
  standalone: false,
})
export class SchematicsListComponent implements OnInit, OnDestroy {
  @Output() selectedSchematicEvent = new EventEmitter<void>();
  subscription: Subscription;
  schematics: Schematic[] = [];

  constructor(private schematicsService: SchematicsService) {}

  ngOnInit(): void {
    this.schematics = this.schematicsService.fetchSchematicsFromServer();
    this.subscription = this.schematicsService.schematicsChangedEvent.subscribe(
      (schematics: Schematic[]) => {
        this.schematics = schematics;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
