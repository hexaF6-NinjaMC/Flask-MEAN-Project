import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './videos/video/video.component';
import { VideoCommentsComponent } from './videos/video-comments/video-comments.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    ChatbotComponent,
    VideosComponent,
    VideoComponent,
    VideoCommentsComponent,
    VideoDetailComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
