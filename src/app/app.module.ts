import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { EmbedVideo } from 'ngx-embed-video';
import { SafePipeModule } from 'safe-pipe';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebcamModule } from 'ngx-webcam';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

import { SharedModule } from './shared/shared.module';
import { TraceabilityComponent } from './Pages/traceability/traceability.component';
import { HomeComponent } from './pages/home/home.component';
import { PipesModule } from './theme/pipes/pipes.module';

import { TemperatureComponent } from './pages/temperature/temperature.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { CameraComponent } from './pages/camera/camera.component';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TraceabilityComponent,
    HomeComponent,
    PagesComponent,
    TemperatureComponent,
    PhotoComponent,
    CameraComponent,
    BlankComponent,
    NotFoundComponent,
    ErrorComponent,
    SidenavComponent,
    VerticalMenuComponent,
    FullScreenComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    SharedModule,
    WebcamModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmbedVideo.forRoot(),
    SafePipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'
    }),
    PerfectScrollbarModule,
    PipesModule,
  ],
  entryComponents: [
    VerticalMenuComponent
  ],
  providers: [
    AppSettings, DatePipe,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
