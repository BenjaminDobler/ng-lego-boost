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


@NgModule({
  declarations: [
    AppComponent
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
    MatSlideToggleModule
  ],
  providers: [GamePadService, VoiceControl],
  bootstrap: [AppComponent]
})
export class AppModule { }
