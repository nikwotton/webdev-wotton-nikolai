import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHTMLComponent } from './widget-html.component';

describe('WidgetHTMLComponent', () => {
  let component: WidgetHTMLComponent;
  let fixture: ComponentFixture<WidgetHTMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHTMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHTMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
