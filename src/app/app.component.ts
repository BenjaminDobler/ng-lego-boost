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

  characteristic:any;

  constructor() {

  }

  async connect() {
    this.characteristic = await BoostConnector.connect()
    this.hub = new Hub(this.characteristic);


  }


}
