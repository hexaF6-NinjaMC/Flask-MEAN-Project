/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Component } from '@angular/core';
import { Modpack } from '../modpack.model';
import { ModpackService } from '../modpack.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'video-jokebot-modpack-edit',
  templateUrl: './modpack-edit.component.html',
  styleUrl: './modpack-edit.component.css',
})
export class ModpackEditComponent {
  modpack: Modpack | undefined;
  originalModpack: Modpack | undefined;
  isEditing: boolean = false;
  id: string;

  constructor(
    private modpackService: ModpackService,
    private router: Router,
    private route: ActivatedRoute,
    // private datePipe: DatePipe, // Use when project is more fleshed out?
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id as string;
      if (this.id === undefined || this.id === null) {
        this.isEditing = false;
        return;
      }
      this.originalModpack = this.modpackService.getModpack(this.id);
      if (this.originalModpack === undefined || this.originalModpack === null) {
        return;
      }
      this.isEditing = true;
      this.modpack = JSON.parse(
        JSON.stringify(this.originalModpack),
      ) as Modpack;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const value = form.value;
    const newModpack = new Modpack(
      value.title,
      value.name,
      value.version,
      value.releaseDate,
      value.genre,
      value.creator,
      value.url,
      value.description,
      value.tags,
    );
    if (value.tags !== null && value.tags !== undefined) {
      newModpack.tags = value.tags.split(',').map((tag: string) => tag.trim());
    }
    if (this.isEditing) {
      this.modpackService.updateModpackDetails(
        this.originalModpack,
        newModpack,
      );
    } else {
      this.modpackService.uploadModpack(newModpack);
    }
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
