import { Component, Input } from '@angular/core';
import { Video } from '../video.model';

@Component({
  selector: 'video-jokebot-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {
  @Input() video: Video;
}
