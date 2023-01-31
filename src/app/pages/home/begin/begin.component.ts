import { Component, OnInit } from '@angular/core';

interface beginImages {
  imgSrc: string;
}
@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss'],
})
export class BeginComponent implements OnInit {
  beginImages: beginImages[] = [];
  indicator = true;
  selectedIndex = 0;
  autoSlide = true;
  slideInterval = 3000;
  constructor() {}

  ngOnInit(): void {
    this.beginImages = [
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/neue-welt-d499e.appspot.com/o/website%2FfirstBegin_1.webp?alt=media&token=f8ffc6ee-8831-48e1-b10b-f44bc94c917b',
      },
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/neue-welt-d499e.appspot.com/o/website%2FfirstBegin_2.webp?alt=media&token=158c4a11-97b7-43bc-b291-85a6bf22ad70',
      },
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/neue-welt-d499e.appspot.com/o/website%2FfirstBegin_3.webp?alt=media&token=ab1776a2-306d-4e67-a26a-c44efa0232d5',
      },
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/neue-welt-d499e.appspot.com/o/website%2FfirstBegin_4.webp?alt=media&token=9a46d4ef-156b-48b8-8fc3-87d78669c8ba',
      },
    ];

    if (this.autoSlide) {
      this.autSliding();
    }
  }
  onNextClick() {
    if (this.selectedIndex === this.beginImages.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
  autSliding() {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
