import { Component, OnInit } from '@angular/core';
import { HubService } from '../../services/hub.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {

  colors: Array<string> = [`off`, `pink`, `purple`, `blue`, `lightblue`, `cyan`, `green`, `yellow`, `orange`, `red`, `white`];


  constructor(public hubService: HubService) { }

  ngOnInit() {
  }

  onSetLed(col: string) {
    this.hubService.hub.led(col);
  }

}
