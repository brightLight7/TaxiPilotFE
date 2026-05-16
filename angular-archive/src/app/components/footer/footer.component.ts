import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {

    window.addEventListener('scroll', () => {
      const footer = document.getElementById('footer');
      // Check if the footer element exists
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (footer) {

        // Toggle visibility when the user reaches the bottom
      if (scrollPosition >= documentHeight - 100) {
          footer.classList.add('footer-visible');
        } else {
          footer.classList.remove('footer-visible');
        }
      }
    });
  }
}
