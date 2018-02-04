import { Component } from '@angular/core';
import { BoostConnector } from './boost.connector';
import { Hub } from './hub';


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

  characteristic: any;

  constructor() {

  }

  async connect() {
    this.characteristic = await BoostConnector.connect()
    this.hub = new Hub(this.characteristic);

    this.hub.emitter.subscribe((evt: any) => {
      console.log('EVEVEVEVEVEVE', evt);
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
