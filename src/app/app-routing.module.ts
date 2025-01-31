/**
 * Some lines are disabled for production build, as we need to incorporate authentication later.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent } from './videos/videos.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
// import { VideoEditComponent } from './videos/video-edit/video-edit.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';
import { ModpacksComponent } from './modpacks/modpacks.component';
import { SchematicsComponent } from './schematics/schematics.component';
// import { SchematicEditComponent } from './schematics/schematic-edit/schematic-edit.component';
// import { ModpackEditComponent } from './modpacks/modpack-edit/modpack-edit.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

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
      // {
      //   path: 'new',
      //   component: VideoEditComponent, // Default route to VideosComponent if no specific video ID is provided
      // },
      {
        path: ':id',
        component: VideoDetailComponent, // Navigates to the specific video with Comments and Details components
      },
      /* Temporarily disabled until Auth is implemented. NEW will probably remain. */
      // {
      //   path: ':id/edit',
      //   component: VideoEditComponent, // Allows editing of a specific video
      // },
    ],
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'cookies',
    component: CookiesComponent,
  },
  {
    path: 'modpacks',
    component: ModpacksComponent,
    // children: [
    //   {
    //     path: 'new',
    //     component: ModpackEditComponent, // Allows editing of a specific Modpack
    //   },
    //   {
    //     path: ':id/edit',
    //     component: ModpackEditComponent, // Allows editing of a specific Modpack
    //   },
    // ],
  },
  {
    path: 'schematics',
    component: SchematicsComponent,
    // children: [
    //   {
    //     path: 'new',
    //     component: SchematicEditComponent, // Allows editing of a specific Schematic
    //   },
    //   {
    //     path: ':id/edit',
    //     component: SchematicEditComponent, // Allows editing of a specific Schematic
    //   },
    // ],
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
