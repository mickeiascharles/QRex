import { Component, signal } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly link = signal('');
  readonly qrDataUrl = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  onLinkInput(value: string): void {
    this.link.set(value);
    if (this.error()) {
      this.error.set(null);
    }
  }

  async generate(): Promise<void> {
    const raw = this.link().trim();

    if (!raw) {
      this.error.set('Cadê o link? Cola ele ali em cima primeiro!');
      this.qrDataUrl.set(null);
      return;
    }

    const target = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

    this.loading.set(true);
    this.error.set(null);

    try {
      const dataUrl = await QRCode.toDataURL(target, {
        width: 320,
        margin: 1,
        color: { dark: '#241f1c', light: '#fffdf8' },
      });
      this.qrDataUrl.set(dataUrl);
    } catch {
      this.error.set('Esse link deu nó na garganta do QRex. Confere e tenta de novo!');
      this.qrDataUrl.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  download(): void {
    const dataUrl = this.qrDataUrl();
    if (!dataUrl) {
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = 'qrex-qrcode.png';
    anchor.click();
  }

  reset(): void {
    this.qrDataUrl.set(null);
    this.error.set(null);
  }
}
