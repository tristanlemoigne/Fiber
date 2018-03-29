import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DomController } from 'ionic-angular';
import { AccueilPage } from '../../pages/accueil/accueil';


@Directive({
  selector: '[absolute-drag]'
})
export class AbsoluteDrag {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;

    public newLeft:any;
    public swipe:boolean = false;

    constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {

    }

    ngAfterViewInit() {

        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

        hammer.on('pan', (ev) => {
          this.handlePan(ev);
        });

        console.log("clic")
    }


    handlePan(ev){
        // this.newLeft = ev.center.x;
        // this.newLeft = ev.center.x - (window.innerWidth/2)
        this.newLeft = ev.deltaX
        console.log(this.newLeft)

        if(this.newLeft >= 235){
          this.newLeft = 0;
        }

        if(this.newLeft <= - 235){
          this.newLeft = 0;
        }

        this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'left', this.newLeft + 'px');
        });
    }


    coucou(){
      console.log("coucou")
    }

}
