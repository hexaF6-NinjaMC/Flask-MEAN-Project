/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EventEmitter, Injectable } from '@angular/core';
import { Video } from './video.model';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videoSelectedEvent = new EventEmitter<Video>();
  videosChangedEvent = new Subject<Video[]>();
  error = new Subject<string>();

  private videos: Video[] = [];
  private videosUrl = environment.apiUrl + '/api/videos';

  constructor(private http: HttpClient) {
    this.fetchVideosFromServer();
  }

  storeVideos() {
    this.videos.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.videosChangedEvent.next(this.videos.slice());
  }

  fetchVideosFromServer() {
    this.http
      .get<{ message: string; videoResults: Video[] }>(this.videosUrl)
      .subscribe({
        next: (responseData) => {
          this.videos = responseData.videoResults;
          this.storeVideos();
        },
        error: (error: HttpErrorResponse) => {
          this.error.next(error.message);
        },
      });
    return this.videos;
  }

  getVideo(videoId: string): Video | undefined {
    return this.videos.find((video) => video._id === videoId) || undefined;
  }

  uploadVideo(newVideo: Video) {
    if (!newVideo) return;
    newVideo._id = '';

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

  updateVideoDetails(originalVideo: Video, newVideo: Video) {
    if (!originalVideo || !newVideo) return;
    const videoIndex = this.videos.indexOf(originalVideo);
    if (videoIndex < 0) return;

    newVideo._id = originalVideo._id;

    this.http
      .put<{
        message: string;
      }>(`${this.videosUrl}/${originalVideo._id}`, newVideo, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.videos[videoIndex] = newVideo;
          this.storeVideos();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  deleteVideo(video: Video) {
    if (!video) return;
    const videoIndex = this.videos.indexOf(video);
    if (videoIndex < 0) return;

    this.http
      .delete<{ message: string }>(`${this.videosUrl}/${video._id}`)
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          this.videos.splice(videoIndex, 1);
          this.storeVideos();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
