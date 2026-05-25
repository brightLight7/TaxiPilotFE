import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-text',
  templateUrl: './home-text.component.html',
  styleUrls: ['./home-text.component.scss']
})
export class HomeTextComponent {
  @Output() showQuoteWindow = new EventEmitter<boolean>();

  bookYourRide() {
  this.showQuoteWindow.emit(true);
}

}
