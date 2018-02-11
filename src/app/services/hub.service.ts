



import { Hub } from '../hub';
import { BoostConnector } from '../boost.connector';

export class HubService {


  hub: Hub;
  pitch: number;
  roll: number;
  distance: number;
  characteristic: any;




  async connect() {
    try {
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
    } catch(e:Error) {

    }


  }




}
