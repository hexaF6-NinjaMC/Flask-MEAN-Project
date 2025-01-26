import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './videos/video/video.component';
import { VideoCommentsComponent } from './videos/video-comments/video-comments.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './about/gallery/gallery.component';
import { ContentComponent } from './about/content/content.component';
import { ContactComponent } from './contact/contact.component';
import { VideoEditComponent } from './videos/video-edit/video-edit.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';
import { ModpacksComponent } from './modpacks/modpacks.component';
import { ModpacksListComponent } from './modpacks/modpacks-list/modpacks-list.component';
import { ModpackEditComponent } from './modpacks/modpack-edit/modpack-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    VideosComponent,
    VideoComponent,
    VideoCommentsComponent,
    VideoDetailComponent,
    HeaderComponent,
    VideoListComponent,
    AboutComponent,
    GalleryComponent,
    ContentComponent,
    ContactComponent,
    VideoEditComponent,
    PrivacyComponent,
    CookiesComponent,
    ModpacksComponent,
    ModpacksListComponent,
    ModpackEditComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
