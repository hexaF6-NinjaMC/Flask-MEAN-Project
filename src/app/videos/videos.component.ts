import { Component, Input, OnInit } from '@angular/core';
import { Video } from './video.model';
import { VideoService } from './video.service';

@Component({
  selector: 'video-jokebot-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent implements OnInit {
  @Input() selectedVideo: Video;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.videoSelectedEvent.subscribe((video: Video) => {
      this.selectedVideo = video;
    });
  }
}
