import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Schematic } from './schematic.model';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SchematicsService {
  schematicSelectedEvent = new EventEmitter<Schematic>();
  schematicsChangedEvent = new Subject<Schematic[]>();
  error = new Subject<string>();

  private schematics: Schematic[] = [];
  private schematicsUrl = environment.apiUrl + '/api/schematics';

  constructor(private http: HttpClient) {
    this.fetchSchematicsFromServer();
  }

  storeSchematics() {
    this.schematics.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.schematicsChangedEvent.next(this.schematics.slice());
  }

  fetchSchematicsFromServer() {
    this.http
      .get<{
        message: string;
        schematicResults: Schematic[];
      }>(this.schematicsUrl)
      .subscribe({
        next: (responseData) => {
          this.schematics = responseData.schematicResults;
          this.storeSchematics();
        },
        error: (error: HttpErrorResponse) => {
          this.error.next(error.message);
        },
      });
    return this.schematics;
  }

  getSchematic(schematicId: string): Schematic | undefined {
    return (
      this.schematics.find((schematic) => schematic._id === schematicId) ||
      undefined
    );
  }

  uploadSchematic(newSchematic: Schematic) {
    if (!newSchematic) return;
    newSchematic._id = '';

    this.http
      .post<{
        message: string;
        schematic: Schematic;
      }>(this.schematicsUrl, newSchematic, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.schematics.push(responseData.schematic);
          this.schematicsChangedEvent.next(this.schematics.slice());
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  updateSchematicDetails(
    originalSchematic: Schematic,
    newSchematic: Schematic,
  ) {
    if (!originalSchematic || !newSchematic) return;
    const schematicIndex = this.schematics.indexOf(originalSchematic);
    if (schematicIndex < 0) return;

    newSchematic._id = originalSchematic._id;

    this.http
      .put<{
        message: string;
      }>(`${this.schematicsUrl}/${originalSchematic._id}`, newSchematic, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.schematics[schematicIndex] = newSchematic;
          this.storeSchematics();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  deleteSchematic(schematic: Schematic) {
    if (!schematic) return;
    const schematicIndex = this.schematics.indexOf(schematic);
    if (schematicIndex < 0) return;

    this.http
      .delete<{ message: string }>(`${this.schematicsUrl}/${schematic._id}`)
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.schematics.splice(schematicIndex, 1);
          this.storeSchematics();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
