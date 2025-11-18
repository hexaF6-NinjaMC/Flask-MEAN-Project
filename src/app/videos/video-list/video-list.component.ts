import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Video } from '../video.model';
import { Subscription } from 'rxjs';
import { VideoService } from '../video.service';

@Component({
  selector: 'video-jokebot-video-list',
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css',
  standalone: false,
})
export class VideoListComponent implements OnInit, OnDestroy {
  @Output() selectedVideoEvent = new EventEmitter<void>();
  subscription: Subscription;
  videos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videos = this.videoService.fetchVideosFromServer();
    this.subscription = this.videoService.videosChangedEvent.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
