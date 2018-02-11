import { Component } from '@angular/core';
import { BoostConnector } from './boost.connector';
import { Hub } from './hub';
import { GamePadService } from './GamepadService';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { VoiceControl } from './voice.control';
import { HubService } from './services/hub.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';


  connected: boolean = false;
  hub: Hub;

  pitch: number;
  roll: number;
  distance: number;


  remote = false;


  motorAPower: number = 0;
  motorADuration: number = 0;

  motorBPower: number = 0;
  motorBDuration: number = 0;

  motorABPower: number = 0;
  motorABDuration: number = 0;


  characteristic: any;


  motorAEvents: Subject<any> = new Subject<any>();
  motorBEvents: Subject<any> = new Subject<any>();

  constructor(public gamepadService: GamePadService, public voice: VoiceControl, private hubService: HubService) {






    this.motorAEvents.throttle(ev => Observable.interval(100)).subscribe((value) => {
      this.hub.motorTime('A', 20, value);
    });

    this.motorBEvents.throttle(ev => Observable.interval(100)).subscribe((value) => {
      this.hub.motorTime('B', 20, value);
    });



  }





  go(port: string) {
    this.hub.motorTime(port, this['motor' + port + 'Duration'], this['motor' + port + 'Power']);
  }

  goMulti() {
    this.hub.motorTimeMulti(this.motorABDuration, this.motorABPower, this.motorABPower);
  }



  async connect() {
    this.hubService.connect();
  }

}


