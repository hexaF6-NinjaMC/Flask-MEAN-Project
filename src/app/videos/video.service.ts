/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EventEmitter, Injectable } from '@angular/core';
import { Video } from './video.model';
import { map, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videoSelectedEvent = new EventEmitter<Video>();
  videosChangedEvent = new Subject<Video[]>();
  error = new Subject<string>();

  private videos: Video[] = [];
  private videosUrl = '/api/videos';

  constructor(private http: HttpClient) {
    this.fetchVideosFromServer();
  }

  fetchVideosFromServer() {
    this.http
      .get<{ message: string; videoResults: any }>(this.videosUrl)
      .pipe(
        map((response) => {
          return response.videoResults.map((videoData) => {
            return {
              id: videoData._id,
              title: videoData.title,
              length: videoData.length,
              description: videoData.description,
              uploadDate: new Date(videoData.uploadDate),
              genre: videoData.genre,
              creator: videoData.creator,
              tags: videoData.tags,
            };
          });
        }),
      )
      .subscribe({
        next: (videoResults) => {
          this.videos = videoResults;
          // console.log(this.videos);
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

  uploadVideo(newVideo: Video) {
    if (!newVideo) return;
    newVideo._id = '';

    console.log('Uploaded video...');

    this.http
      .post<{
        message: string;
        video: Video;
      }>(this.videosUrl, newVideo, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.videos.push(responseData.video);
          this.videosChangedEvent.next(this.videos.slice());
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
