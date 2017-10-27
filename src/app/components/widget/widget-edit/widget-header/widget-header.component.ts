import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  @Output() notify: EventEmitter<String> = new EventEmitter<String>();

  developerId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.developerId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
        this.widget = data;
      });
    });
  }

}
