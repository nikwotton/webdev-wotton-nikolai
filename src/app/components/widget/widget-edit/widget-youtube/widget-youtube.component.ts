import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  @Output() notify: EventEmitter<String> = new EventEmitter<String>();

  constructor() {
  }

  ngOnInit() {
  }

}
