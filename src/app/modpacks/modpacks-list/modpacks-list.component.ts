import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Modpack } from '../modpack.model';
import { Subscription } from 'rxjs';
import { ModpackService } from '../modpack.service';

@Component({
    selector: 'video-jokebot-modpacks-list',
    templateUrl: './modpacks-list.component.html',
    styleUrl: './modpacks-list.component.css',
    standalone: false
})
export class ModpacksListComponent implements OnInit, OnDestroy {
  @Output() selectedModpackEvent = new EventEmitter<void>();
  subscription: Subscription;
  modpacks: Modpack[] = [];

  constructor(private modpackService: ModpackService) {}

  ngOnInit(): void {
    this.modpacks = this.modpackService.fetchModpacksFromServer();
    this.subscription = this.modpackService.modpacksChangedEvent.subscribe(
      (modpacks: Modpack[]) => {
        this.modpacks = modpacks;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
