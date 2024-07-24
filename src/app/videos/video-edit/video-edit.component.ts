/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { v4 as uuidv4 } from 'uuid';
import { VideoService } from '../video.service';
import { Video } from '../video.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'video-jokebot-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrl: './video-edit.component.css',
})
export class VideoEditComponent implements OnInit {
  @ViewChild('title') titleRef: ElementRef;
  @ViewChild('length') lengthRef: ElementRef;
  @ViewChild('description') descriptionRef: ElementRef;
  @ViewChild('uploadDate') uploadDateRef: ElementRef;
  @ViewChild('genre') genreRef: ElementRef;
  @ViewChild('creator') creatorRef: ElementRef;
  @ViewChild('tags') tagsRef: ElementRef;
  @ViewChild('url') urlRef: ElementRef;

  video: Video | undefined;

  constructor(
    private videoService: VideoService,
    // private sanitizer: Sanitizer,
  ) {}

  ngOnInit(): void {
    // this.videoService.videoSelectedEvent.subscribe((video: Video) => {
    //   this.selectedVideo = video;
    // });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log('Values:', value);
    const newVideo = new Video(
      value.title,
      value.length,
      value.description,
      value.uploadDate,
      value.genre,
      value.creator,
      value.url,
      value.tags.split(',').map((tag: string) => tag.trim()),
    );

    console.log('Video Data:', newVideo);
    this.videoService.uploadVideo(newVideo);
  }

  // onAddVideo() {
  //   const titleEl: HTMLInputElement = this.titleRef
  //     .nativeElement as HTMLInputElement;
  //   const lengthEl: HTMLInputElement = this.lengthRef
  //     .nativeElement as HTMLInputElement;
  //   const descriptionEl: HTMLTextAreaElement = this.descriptionRef
  //     .nativeElement as HTMLTextAreaElement;
  //   const uploadDateEl: HTMLInputElement = this.uploadDateRef
  //     .nativeElement as HTMLInputElement;
  //   const genreEl: HTMLInputElement = this.genreRef
  //     .nativeElement as HTMLInputElement;
  //   const creatorEl: HTMLInputElement = this.creatorRef
  //     .nativeElement as HTMLInputElement;
  //   const tagsEl: HTMLTextAreaElement = this.tagsRef
  //     .nativeElement as HTMLTextAreaElement;
  //   const urlEl: HTMLInputElement = this.urlRef
  //     .nativeElement as HTMLInputElement;

  //   const title = titleEl.value;
  //   const length = parseInt(lengthEl.value, 10);
  //   const description = descriptionEl.value;
  //   const uploadDate = uploadDateEl.valueAsDate;
  //   const genre = genreEl.value;
  //   const creator = creatorEl.value;
  //   const tags = tagsEl.value.split(',').map((tag) => tag.trim());
  //   const url = urlEl.value.trim();

  //   const video: Video = {
  //     title,
  //     length,
  //     description,
  //     uploadDate,
  //     genre,
  //     creator,
  //     tags,
  //     url,
  //   };

  //   console.log('Video Data:', video);

  //   this.videoService.uploadVideo(video);
  // }
}
