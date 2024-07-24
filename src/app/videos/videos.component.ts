import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';

@Component({
  selector: 'video-jokebot-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent implements OnInit {
  // @Input() selectedVideo: Video;

  constructor(
    private videoService: VideoService,
    // private sanitizer: Sanitizer,
  ) {}

  ngOnInit(): void {
    // this.videoService.videoSelectedEvent.subscribe((video: Video) => {
    //   this.selectedVideo = video;
    // });
  }
}
