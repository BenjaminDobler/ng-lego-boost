import { Component, NgZone, OnInit } from '@angular/core';
import { HubService } from '../../services/hub.service';
import { VoiceControl } from '../../voice.control';
import {trigger, transition, style, animate, state} from '@angular/animations'

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateX(-50%) translateZ(-200px)', opacity: 0}),
            animate('300ms', style({transform: 'translateX(-50%) translateZ(0)', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'perspective(500px) translateX(-50%) translateZ(0)', 'opacity': 1}),
            animate('300ms', style({transform: 'translateX(-50%) translateZ(200px)', 'opacity': 0})

          ]
        )]
    )
  ]
})
export class VoiceComponent implements OnInit {


  public lastCommand = '';

  constructor(public hubService: HubService, public voice: VoiceControl, private zone: NgZone) {

    this.voice.commands.distinctUntilChanged().subscribe((command: string) => {
        console.log('Command ', command);

        this.zone.run(()=>{
          this.lastCommand = command;

        });

        if (this.hubService.hub) {

          const hub = this.hubService.hub;

          if (command === 'go') {
            hub.motorPowerCommand('A', 20);
            hub.motorPowerCommand('B', 20);
          } else if (command === 'backward') {
            hub.motorPowerCommand('A', -20);
            hub.motorPowerCommand('B', -20);

          } else if (command === 'stop') {
            hub.motorPowerCommand('A', 0);
            hub.motorPowerCommand('B', 0);

          } else if (command === 'left') {
            hub.motorPowerCommand('A', 0);
            hub.motorPowerCommand('B', 20);

          } else if (command === 'right') {
            hub.motorPowerCommand('A', 20);
            hub.motorPowerCommand('B', 0);
          }
        }

      }
    );

  }

  startVoice() {
    this.voice.start();
  }

  ngOnInit() {
  }

}
