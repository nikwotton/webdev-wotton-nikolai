import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  developerId: string;
  websiteId: string;
  pageId: string;
  page: any;
  errorMsg = 'Please enter a name and title!';

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.developerId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.page = this.pageService.findPageById(this.pageId);
        }
      );
  }

  submit() {
    const exists = this.page === null;
    if (!exists) {
      this.page = [];
    }
    this.page['name'] = '';
    this.page['description'] = '';
    if (!exists) {
      this.pageService.createPage(this.websiteId, this.page);
    } else {
      this.pageService.updatePage(this.pageId, this.page);
    }
    return this.router.navigate(['/user/' + this.developerId + '/website/' + this.websiteId + '/page']);
  }

  onDelete() {
    this.pageService.deletePage(this.pageId);
    return this.router.navigate(['/user/' + this.developerId + '/website/' + this.websiteId + '/page']);
  }
}
