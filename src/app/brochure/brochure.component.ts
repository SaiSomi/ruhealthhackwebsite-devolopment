import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit {
  images = [
    'assets/images/1A.jpg', // Replace with actual image paths
    'assets/images/1B.jpg'  // Replace with actual image paths
  ];
  currentIndex = 0;
  currentImage = this.images[this.currentIndex];



  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }
  

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
