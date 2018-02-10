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


let w: any = window;
const Buffer: any = w.buffer.Buffer;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


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

  colors: Array<string> = [`off`, `pink`, `purple`, `blue`, `lightblue`, `cyan`, `green`, `yellow`, `orange`, `red`, `white`];

  characteristic: any;


  motorAEvents: Subject<any> = new Subject<any>();
  motorBEvents: Subject<any> = new Subject<any>();

  constructor(public gamepadService: GamePadService, public voice: VoiceControl) {


    this.voice.commands.distinctUntilChanged().subscribe((command: string) => {
      console.log("Command ", command);

      if (this.hub) {
        if (command === 'go') {
          this.hub.motorPowerCommand('A', 20);
          this.hub.motorPowerCommand('B', 20);
        } else if (command === 'backward') {
          this.hub.motorPowerCommand('A', -20);
          this.hub.motorPowerCommand('B', -20);

        } else if (command === 'stop') {
          this.hub.motorPowerCommand('A', 0);
          this.hub.motorPowerCommand('B', 0);

        } else if (command === 'left') {
          this.hub.motorPowerCommand('A', 0);
          this.hub.motorPowerCommand('B', 20);

        } else if (command === 'right') {
          this.hub.motorPowerCommand('A', 20);
          this.hub.motorPowerCommand('B', 0);

        }
      }

    });


    this.motorAEvents.throttle(ev => Observable.interval(100)).subscribe((value) => {
      this.hub.motorTime('A', 20, value);
    });

    this.motorBEvents.throttle(ev => Observable.interval(100)).subscribe((value) => {
      this.hub.motorTime('B', 20, value);
    });

    this.gamepadService.multi.throttle(ev => Observable.interval(100)).subscribe((power: any) => {
      if (this.hub) {
        console.log('Run ', power);
        //this.hub.motorTimeMulti(0.5, power.a, power.b);
        //this.hub.motorAngleMulti(100, power.a, power.b);
        this.hub.motorPowerCommand('A', power.a);
        this.hub.motorPowerCommand('B', power.b);
      }

    });

  }


  startVoice() {
    this.voice.start();
  }


  go(port: string) {
    this.hub.motorTime(port, this['motor' + port + 'Duration'], this['motor' + port + 'Power']);
  }

  goMulti() {
    this.hub.motorTimeMulti(this.motorABDuration, this.motorABPower, this.motorABPower);
  }

  onSetLed(col: string) {
    console.log(col);
    this.hub.led(col);
  }

  async connect() {
    this.characteristic = await BoostConnector.connect()
    this.hub = new Hub(this.characteristic);

    this.hub.emitter.subscribe((evt: any) => {
      if (evt.type === 'tilt') {
        this.pitch = evt.data.pitch;
        this.roll = evt.data.roll;
      }

      if (evt.type === 'distance') {
        this.distance = evt.data;
      }
    });


  }

}


