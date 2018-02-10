import { Subject } from 'rxjs/Subject';

export class VoiceControl {

  supported: boolean = false;
  recognition: any;
  final_transcript: string;

  commands: Subject<string> = new Subject<string>();

  constructor() {
    this.init();
  }



  init() {


    const keywords:Array<string> = ['vorwärts', 'rückwärts', 'links', 'rechts', 'stopp'];

    const w: any = window;
    if (!('webkitSpeechRecognition' in w)) {

    } else {
      const recognition = new w.webkitSpeechRecognition();
      this.recognition = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      //var grammar = '#JSGF V1.0; grammar colors; public <color> = vorwärts | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
      //var speechRecognitionList = new w.webkitSpeechGrammarList();
      //speechRecognitionList.addFromString(grammar, 1);
      //recognition.grammars = speechRecognitionList;

      recognition.onstart = function () {

      }

      recognition.onresult = (event) => {
        var interim_transcript = '';
        console.log('Event ', event.results[event.results.length - 1][0].transcript);

        let res: string = event.results[event.results.length - 1][0].transcript;
        res = res.split(' ')[res.split(' ').length - 1].toLowerCase();

        if (keywords.indexOf(res)!=-1) {
          if (res === 'vorwärts') {
            this.commands.next('go');
          }

          if (res === 'links') {
            this.commands.next('left');
          }

          if (res === 'rechts') {
            this.commands.next('right');
          }

          if (res === 'stopp') {
            this.commands.next('stop');
          }

          if (res === 'rückwärts') {
            this.commands.next('backward');
          }

        }


      }

      recognition.onerror = (event) => {

      }

      recognition.onend = () => {

      }
    }
  }


  start() {
    this.final_transcript = '';
    this.recognition.lang = 'de-DE';
    this.recognition.start();
  }


}

