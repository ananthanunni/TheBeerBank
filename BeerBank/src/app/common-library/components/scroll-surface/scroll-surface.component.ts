import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'common-library-scroll-surface',
  templateUrl: './scroll-surface.component.html',
  styleUrls: ['./scroll-surface.component.scss']
})
export class ScrollSurfaceComponent implements OnInit,OnDestroy {

  constructor() { }

  @Input("ignore")
  ignore:boolean;

  @Output("onScrollEnd")
  onScrollEnd=new EventEmitter();

  ngOnInit() {
    this.enableScrollNotifications();
  }

  ngOnDestroy(){
    window.onscroll=null;
  }
  
  private enableScrollNotifications() {
    window.onscroll = (event: any) => {
      if(this.ignore) return;

      if ((window.scrollY + window.innerHeight) === document.body.scrollHeight)
        this.onScrollEnd.emit();
        //this.beerProvider.getPage();
    }
  }
}
