import { EventEmitter, Injectable } from '@angular/core';
import { Video } from './video.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videoSelectedEvent = new EventEmitter<Video>();
  videosChangedEvent = new Subject<Video[]>();
  error = new Subject<string>();

  private videos: Video[] = [];
  private videosUrl = '';

  constructor(private http: HttpClient) {
    this.fetchVideosFromServer();
    this.videosUrl = 'http://localhost:3000/videos';
  }

  fetchVideosFromServer(): Video[] | null {
    this.http.get<Video[]>(this.videosUrl).subscribe({
      next: (videos: Video[]) => {
        this.videos = videos;
        this.videos.sort((a, b) => {
          if (a.uploadDate < b.uploadDate) return -1;
          if (a.uploadDate > b.uploadDate) return 1;
          return 0;
        });
        this.videosChangedEvent.next(this.videos.slice());
      },
      error: (error: HttpErrorResponse) => {
        this.error.next(error.message);
      },
    });
    return this.videos;
  }
}
