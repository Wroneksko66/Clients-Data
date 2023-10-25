import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighLight]',
})
export class HighLightDirective implements OnInit {
  @Input() appHighLight = '';
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') enter() {
    this.el.nativeElement.style.color = this.appHighLight;
  }

  @HostListener('mouseleave') leave() {
    this.el.nativeElement.style.color = '';
  }
  ngOnInit() {}
}
