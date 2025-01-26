import { EventEmitter, Injectable } from '@angular/core';
import { Modpack } from './modpack.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModpackService {
  modpackSelectedEvent = new EventEmitter<Modpack>();
  modpacksChangedEvent = new Subject<Modpack[]>();
  error = new Subject<string>();

  private modpacks: Modpack[] = [];
  private modpacksUrl = environment.apiUrl + '/api/modpacks';

  constructor(private http: HttpClient) {
    this.fetchModpacksFromServer();
  }

  storeModpacks() {
    this.modpacks.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.modpacksChangedEvent.next(this.modpacks.slice());
  }

  fetchModpacksFromServer() {
    this.http
      .get<{ message: string; modpackResults: Modpack[] }>(this.modpacksUrl)
      .subscribe({
        next: (responseData) => {
          this.modpacks = responseData.modpackResults;
          this.storeModpacks();
        },
        error: (error: HttpErrorResponse) => {
          this.error.next(error.message);
        },
      });
    return this.modpacks;
  }

  getModpack(modpackId: string): Modpack | undefined {
    return (
      this.modpacks.find((modpack) => modpack._id === modpackId) || undefined
    );
  }

  uploadModpack(newModpack: Modpack) {
    if (!newModpack) return;
    newModpack._id = '';

    this.http
      .post<{
        message: string;
        modpack: Modpack;
      }>(this.modpacksUrl, newModpack, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.modpacks.push(responseData.modpack);
          this.modpacksChangedEvent.next(this.modpacks.slice());
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  updateModpackDetails(originalModpack: Modpack, newModpack: Modpack) {
    if (!originalModpack || !newModpack) return;
    const modpackIndex = this.modpacks.indexOf(originalModpack);
    if (modpackIndex < 0) return;

    newModpack._id = originalModpack._id;

    this.http
      .put<{
        message: string;
      }>(`${this.modpacksUrl}/${originalModpack._id}`, newModpack, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.modpacks[modpackIndex] = newModpack;
          this.storeModpacks();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  deleteModpack(modpack: Modpack) {
    if (!modpack) return;
    const modpackIndex = this.modpacks.indexOf(modpack);
    if (modpackIndex < 0) return;

    this.http
      .delete<{ message: string }>(`${this.modpacksUrl}/${modpack._id}`)
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.modpacks.splice(modpackIndex, 1);
          this.storeModpacks();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
