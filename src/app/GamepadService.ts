import { Hub } from './hub';
import { Subject } from 'rxjs/Subject';

export class GamePadService {


  hub: Hub;


  public x: number = 0;
  public y: number = 0;

  public motorAPower = 0;
  public motorBPower = 0;


  motorA: Subject<number> = new Subject<number>();
  motorB: Subject<number> = new Subject<number>();
  multi: Subject<any> = new Subject<any>();


  constructor() {
    window.addEventListener('gamepadconnected', (e: any) => {
      console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
      this.init();

    });
  }


  init() {
    this.startLoop();

  }


  startLoop() {
    let nav: any = navigator;
    var gamepads = nav.getGamepads ? nav.getGamepads() : (nav.webkitGetGamepads ? nav.webkitGetGamepads : []);
    if (!gamepads) {
      return;
    }

    var gp = gamepads[0];


    let vert = gp.axes[1];
    let hor = gp.axes[0];

    this.x = gp.axes[0];
    this.y = gp.axes[1];


    vert *= -1;


    let MA = (this.y * -100);
    let MB = (this.y * -100);

    let leftSteering = this.x;
    let rightSteering = this.x;


    if (this.x < 0) {
      leftSteering = this.x * -1;
      rightSteering = 0;
    } else {
      leftSteering = 0;
      rightSteering = this.x;
    }

    if (MA > 100) MA = 100;
    if (MA < -100) MA = -100;

    this.motorAPower = MA * (1 - leftSteering);
    this.motorBPower = MB * (1 - rightSteering);

    this.motorA.next(this.motorAPower);
    this.motorB.next(this.motorBPower);
    this.multi.next({ a: this.motorAPower, b: this.motorBPower });


    /*
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
    */

    if (gp) {
      requestAnimationFrame(() => {
        this.startLoop();
      });
    }


  }


}
