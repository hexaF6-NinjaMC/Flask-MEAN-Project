import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent } from './videos/videos.component';
// import { VideoComponent } from './videos/video/video.component'; // VideoComponent is a part of VideoDetailComponent (includes the video playback module).
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { VideoEditComponent } from './videos/video-edit/video-edit.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';
// import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent, // AboutComponent contains the Content and Gallery components
  },
  {
    path: 'contact',
    component: ContactComponent, // Contains all the contact information (of me, Aaron Bechtel), with links to my channels on YouTube.
  },
  {
    path: 'videos',
    component: VideosComponent, // VideosComponent contains the VideosListComponent
    children: [
      {
        path: 'new',
        component: VideoEditComponent, // Default route to VideosComponent if no specific video ID is provided
      },
      {
        path: ':id',
        component: VideoDetailComponent, // Navigates to the specific video with Comments and Details components
      },
      {
        path: ':id/edit',
        component: VideoEditComponent, // Allows editing of a specific video
      },
    ],
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'cookies',
    component: CookiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
