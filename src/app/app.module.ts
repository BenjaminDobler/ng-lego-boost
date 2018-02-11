import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamePadService } from './GamepadService';
import { VoiceControl } from './voice.control';
import { VoiceComponent } from './components/voice/voice.component';
import { GamepadComponent } from './components/gamepad/gamepad.component';
import { ManualComponent } from './components/manual/manual.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Hub } from './hub';
import { HubService } from './services/hub.service';
import { SliderComponent } from './components/slider/slider.component';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gamepad', component: GamepadComponent },
  { path: 'voice',      component: VoiceComponent },
  { path: 'manual',      component: ManualComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    VoiceComponent,
    GamepadComponent,
    ManualComponent,
    HomeComponent,
    SliderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatFormFieldModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GamePadService, VoiceControl, HubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
