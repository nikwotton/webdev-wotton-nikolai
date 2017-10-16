import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()

export class PageService {

  constructor() {
  }

  pages = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];

  api = {
    'createPage': this.createPage,
    'findPageById': this.findPageById,
    'findPagesByWebsiteId': this.findPagesByWebsiteId,
    'updatePage': this.updatePage,
    'deletePage': this.deletePage
  };

  createPage(websiteId: string, page: any) {
    page.websiteId = websiteId;
    page._id = Math.random().toString();
    this.pages.push(page);
    return page;
  }

  findPagesByWebsiteId(websiteId: string) {
    const ret: any[] = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        ret.push(this.pages[x]);
      }
    }
    return ret;
  }

  findPageById(pageId: string) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        return this.pages[x];
      }
    }
  }

  updatePage(pageId: string, page: any) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages[x] = page;
      }
    }
  }

  deletePage(pageId: string) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages.splice(x, 1);
      }
    }
  }
}
