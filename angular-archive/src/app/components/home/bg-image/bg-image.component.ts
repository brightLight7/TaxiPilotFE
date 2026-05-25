import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.scss'],
})
export class BgImageComponent implements OnInit {
  imgSource: string | undefined;
  imgNo = 1;

  ngOnInit(): void {
    this.imgSource = `../../../../assets/bg-images/1.jpg`;
    setInterval(() => {
      this.updateBg();
    }, 20000);
  }
  updateBg() {
    this.imgNo = Math.floor(Math.random() * 3 + 1);
    this.imgSource = `../../../../assets/bg-images/${this.imgNo}.jpg`;
  }
}
