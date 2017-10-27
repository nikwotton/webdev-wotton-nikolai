import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  developerId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.developerId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
            this.widget = data;
          });
        }
      );
  }

  onDelete() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(() => {
    });
    this.router.navigate(['user', this.developerId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  }
}
