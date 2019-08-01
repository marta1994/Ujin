import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  public copyToClipboard(text: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    selBox.setAttribute("contenteditable", "true");
    selBox.removeAttribute("readonly");
    document.body.appendChild(selBox);

    selBox.focus();
    selBox.select();

    let range = document.createRange();
    range.selectNodeContents(selBox);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);
    selBox.setSelectionRange(0, 999999);

    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
