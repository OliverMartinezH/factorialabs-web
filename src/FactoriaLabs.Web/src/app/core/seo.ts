import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  jsonLd?: unknown;
}

const SITE = 'https://olivermartinezh.github.io/factorialabs-web';

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply(config: SeoConfig): void {
    this.title.setTitle(config.title);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });

    const url = `${SITE}${config.path}`;
    this.meta.updateTag({ property: 'og:url', content: url });

    let canonical = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.doc.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    if (config.jsonLd) {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(config.jsonLd);
      this.doc.head.appendChild(script);
    }
  }
}
