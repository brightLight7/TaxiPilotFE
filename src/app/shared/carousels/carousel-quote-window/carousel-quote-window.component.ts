import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carousel-quote-window',
  templateUrl: './carousel-quote-window.component.html',
  styleUrls: ['./carousel-quote-window.component.scss']
})
export class CarouselQuoteWindowComponent implements OnInit, AfterViewInit, OnDestroy {
  images: { src: string, caption: string }[] = [
    { src: 'assets/carousel1/img1.jpg', caption: 'Book online' },
    { src: 'assets/carousel1/img2.jpg', caption: 'Caption for Image 2' },
    { src: 'assets/carousel1/img3.jpg', caption: 'Arrived. Need a taxi.' }
  ];
  currentIndex = 0;
  intervalId: any;
  
  @ViewChildren('captions') captions!: QueryList<ElementRef>;
  
  ngOnInit(): void {
    console.log('Image paths:', this.images); // Debug: Verify the paths
  }

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 16000); // Change slide every 13 seconds (10 seconds visible + 3 seconds transition)
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    // this.randomizeCaptionPosition();
  }

  randomizeCaptionPosition(): void {
    this.captions.forEach((caption) => {
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      caption.nativeElement.style.setProperty('--random-x', `${x}px`);
      caption.nativeElement.style.setProperty('--random-y', `${y}px`);
      const top = Math.random() * 70 + 10;
      const left = Math.random() * 70 + 10;
      caption.nativeElement.style.top = `${top}%`;
      caption.nativeElement.style.left = `${left}%`;
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
