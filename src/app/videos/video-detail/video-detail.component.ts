import { Component } from '@angular/core';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'video-jokebot-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css',
})
export class VideoDetailComponent {
  video: Video | undefined;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.video = this.videoService.getVideo(params.id as string);
    });
  }

  onDelete() {
    if (!this.video) return;
    this.videoService.deleteVideo(this.video);
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
