import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'lvSafeHtml',
    standalone: true,
})
export class LvSafeHtmlPipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) { }

    transform(value: string | null | undefined): SafeHtml {
        if (!value) return '';
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}