import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadTickCounterScript();
  }

  loadTickCounterScript(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.tickcounter.com/static/js/loader.js';
    script.id = 'tickcounter-sdk';
    script.onload = () => {
      console.log('TickCounter script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load TickCounter script');
    };
    this.renderer.appendChild(document.body, script);
  }
}
