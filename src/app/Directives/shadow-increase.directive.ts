import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ShadowIncrease]'
})
export class ShadowIncreaseDirective implements OnChanges {
  @Input() backgroundColor:string="white";
  constructor(private elemRef: ElementRef) 
  {
    this.elemRef.nativeElement.style.boxShadow =" 5px 5px  5px #aaaaaa" 
  }
  ngOnChanges(): void {
    this.elemRef.nativeElement.style.backgroundColor = `${this.backgroundColor}` 
  }
  @HostListener('mouseover') onMouseOver()
  {
    this.elemRef.nativeElement.style.boxShadow =" 10px 10px  5px #0ec99a" ;
    this.elemRef.nativeElement.style.backgroundColor = `${this.backgroundColor}` 
  }

  @HostListener('mouseout') onMouseOut()
  {
    this.elemRef.nativeElement.style.boxShadow =" 5px 5px  5px #aaaaaa" ;
    this.elemRef.nativeElement.style.backgroundColor = `white` 
  }

}
