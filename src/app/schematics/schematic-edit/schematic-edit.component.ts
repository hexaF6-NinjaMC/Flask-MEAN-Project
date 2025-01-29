/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { SchematicsService } from '../schematics.service';
import { Schematic } from '../schematic.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'video-jokebot-schematic-edit',
  templateUrl: './schematic-edit.component.html',
  styleUrl: './schematic-edit.component.css',
})
export class SchematicEditComponent implements OnInit {
  schematic: Schematic | undefined;
  originalSchematic: Schematic | undefined;
  isEditing: boolean = false;
  id: string;

  constructor(
    private schematicsService: SchematicsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id as string;
      if (this.id === undefined || this.id === null) {
        this.isEditing = false;
        return;
      }
      this.originalSchematic = this.schematicsService.getSchematic(this.id);
      if (
        this.originalSchematic === undefined ||
        this.originalSchematic === null
      ) {
        return;
      }
      this.isEditing = true;
      this.schematic = JSON.parse(
        JSON.stringify(this.originalSchematic),
      ) as Schematic;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const value = form.value;
    const newSchematic = new Schematic(
      value.title,
      value.name,
      value.releaseVersion,
      value.version,
      value.creator,
      value.url,
      value.img,
      value.description,
    );
    if (value.tags !== null && value.tags !== undefined) {
      newSchematic.tags = value.tags
        .split(',')
        .map((tag: string) => tag.trim());
    }
    console.log(newSchematic);
    if (this.isEditing) {
      this.schematicsService.updateSchematicDetails(
        this.originalSchematic,
        newSchematic,
      );
    } else {
      this.schematicsService.uploadSchematic(newSchematic);
    }
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
