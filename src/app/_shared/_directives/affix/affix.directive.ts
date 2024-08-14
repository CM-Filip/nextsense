import { Directive, ElementRef, Host, HostListener, inject, Renderer2 } from "@angular/core";

@Directive({
  selector: '[affix]',
  standalone: true
})
export class AffixDirective {

  private _renderer: Renderer2 = inject(Renderer2);
  private _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  private _update(): void {
    const elementHeight: number = this._elementRef.nativeElement.offsetHeight;
    const viewportHeight: number = window.innerHeight;
    const scrollY: number = window.scrollY;
    const outOfBounds: boolean = scrollY >= viewportHeight - elementHeight;

    this._toggleClass(outOfBounds);
  }
  
  private _toggleClass(fixed: boolean): void {
    const element: HTMLElement = this._elementRef.nativeElement;
    fixed ? this._renderer.addClass(element, 'fixed-bottom') : this._renderer.removeClass(element, 'fixed-bottom');
  }
}