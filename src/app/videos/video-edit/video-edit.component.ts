/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Video } from '../video.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { DatePipe } from '@angular/common'; // Use when project is more fleshed out?

@Component({
    selector: 'video-jokebot-video-edit',
    templateUrl: './video-edit.component.html',
    styleUrl: './video-edit.component.css',
    standalone: false
})
export class VideoEditComponent implements OnInit {
  video: Video | undefined;
  originalVideo: Video | undefined;
  isEditing: boolean = false;
  id: string;

  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    // private datePipe: DatePipe, // Use when project is more fleshed out?
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id as string;
      if (this.id === undefined || this.id === null) {
        this.isEditing = false;
        return;
      }
      this.originalVideo = this.videoService.getVideo(this.id);
      if (this.originalVideo === undefined || this.originalVideo === null) {
        return;
      }
      this.isEditing = true;
      this.video = JSON.parse(JSON.stringify(this.originalVideo)) as Video;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const value = form.value;
    const newVideo = new Video(
      value.title,
      value.length,
      value.uploadDate,
      value.genre,
      value.creator,
      value.url,
      value.description,
    );
    if (value.tags !== null && value.tags !== undefined) {
      newVideo.tags = value.tags.split(',').map((tag: string) => tag.trim());
    }
    if (this.isEditing) {
      this.videoService.updateVideoDetails(this.originalVideo, newVideo);
    } else {
      this.videoService.uploadVideo(newVideo);
    }
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
