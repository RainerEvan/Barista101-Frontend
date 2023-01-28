import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  constructor(protected domSanitizer: DomSanitizer) {}
 
  public transform(value: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+value);
  }

}
