import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @Input() defaultBackgroundColor: string = 'transparent';
  @Input() defaultColor: string = 'black';
  @Input() highlightBackgroundColor: string = 'blue';
  @Input() highlightColor: string = 'white';

  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultBackgroundColor;
  @HostBinding('style.color') color: string = this.defaultColor;

  ngOnInit(): void {
    this.backgroundColor = this.defaultBackgroundColor;
    this.color = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }

  @HostListener('mouseenter') mouseEnter(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.backgroundColor = this.highlightBackgroundColor;
    this.color = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(event: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'backgroundColor',
    //   'transparent'
    // );
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultBackgroundColor;
    this.color = this.defaultColor;
  }
}
