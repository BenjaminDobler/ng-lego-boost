import { Component } from '@angular/core';
import { BoostConnector } from './boost.connector';
import { Hub } from './hub';
import { GamePadService } from './GamepadService';


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

  constructor(private gamepadService:GamePadService) {

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
    this.gamepadService.init(this.hub);

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


  slideA(value) {
   console.log("Value", value);
   this.hub.motorTime('A', 10, value);
  }

  slideB(value) {
    console.log("Value ", value);
    this.hub.motorTime('B', 10, value);
  }


}
