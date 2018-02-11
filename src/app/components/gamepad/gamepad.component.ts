import { Component, OnInit } from '@angular/core';
import { GamePadService } from '../../GamepadService';
import { Observable } from 'rxjs/Observable';
import { HubService } from '../../services/hub.service';

@Component({
  selector: 'app-gamepad',
  templateUrl: './gamepad.component.html',
  styleUrls: ['./gamepad.component.css']
})
export class GamepadComponent implements OnInit {

  constructor(public gamepadService: GamePadService, public hubService: HubService) {
    this.gamepadService.multi.throttle(ev => Observable.interval(100)).distinctUntilChanged((x, y) => {
      return x.a === y.a && x.b === y.b;
    }).subscribe((power: any) => {
      if (this.hubService.hub) {
        console.log('Send ', power.a, power.b);
        this.hubService.hub.motorPowerCommand('A', power.a);
        this.hubService.hub.motorPowerCommand('B', power.b);
      }
    });
  }


  ngOnInit() {
  }

}
