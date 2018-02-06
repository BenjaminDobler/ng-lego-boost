import { Hub } from './hub';

export class GamePadService {


  hub: Hub;

  constructor() {
    window.addEventListener('gamepadconnected', (e: any) => {
      console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);


    });
  }


  init(hub: Hub) {
    this.hub = hub;
    this.startLoop();

  }


  isGoingForward: boolean = false;
  isGoingBackward: boolean = false;
  isGoingLeft: boolean = false;
  isGoingRight: boolean = false;

  startLoop() {
    let nav: any = navigator;
    var gamepads = nav.getGamepads ? nav.getGamepads() : (nav.webkitGetGamepads ? nav.webkitGetGamepads : []);
    if (!gamepads) {
      return;
    }

    var gp = gamepads[0];
    //console.log("GP ", gp);
    console.log(gp.buttons[12]); // UP
    console.log(gp.buttons[13]); // Down
    console.log(gp.buttons[14]); // left
    console.log(gp.buttons[15]); // right

    if (this.hub) {
      if (gp.buttons[12].pressed === true && !this.isGoingForward) {
        this.hub.motorTimeMulti(30, 50, 50);
        this.isGoingForward = true;
      } else if (gp.buttons[12].pressed === false && this.isGoingForward) {
        this.hub.motorTimeMulti(0.1, 0, 0);
        this.isGoingForward = false;
      }

      if (gp.buttons[13].pressed === true && !this.isGoingBackward) {
        this.hub.motorTimeMulti(30, -50, -50);
        this.isGoingBackward = true;
      } else if (this.isGoingBackward && gp.buttons[13].pressed === false) {
        this.hub.motorTimeMulti(0.1, 0, 0);
        this.isGoingBackward = false;
      }

      if (gp.buttons[15].pressed === true && !this.isGoingLeft) {
        this.hub.motorTime('A', 30, 50);
        this.isGoingLeft = true;
      } else if (gp.buttons[15].pressed === false && this.isGoingLeft) {
        this.hub.motorTime('A', 0.1, 0);
        this.isGoingLeft = false;
      }

      if (gp.buttons[14].pressed === true && !this.isGoingRight) {
        this.hub.motorTime('B', 30, 50);
        this.isGoingRight = true;
      } else if (gp.buttons[14].pressed === false && this.isGoingRight) {
        this.hub.motorTime('B', 0.1, 0);
        this.isGoingRight = false;
      }

      if (gp) {
        requestAnimationFrame(() => {
          this.startLoop();
        });
      }
    }

  }


}
