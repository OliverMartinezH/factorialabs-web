import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';

const TITLE = 'Arquitectura y stack: migración de ASP, WebForms, JavaFX y Xamarin | FactoriaLabs';
const DESCRIPTION =
  'Stack y arquitectura de FactoriaLabs: Angular 22, .NET 11, SQL Server, Docker y CI. Qué evaluamos en cada sistema heredado y cómo garantizamos que la migración no rompa nada.';

const FAQ = [
  {
    '@type': 'Question',
    name: '¿Qué stack usan?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Angular 22 para la interfaz, .NET 11 para servicios, SQL Server para datos, Docker para entrega y CI en cada push. Se ajusta si el sistema exige otra cosa.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Cómo garantizan que la migración no rompe nada?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Con pruebas sobre el comportamiento actual, migración por fases y comparación de cifras entre el sistema viejo y el nuevo antes de apagar el anterior.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Trabajan on-premise?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Sí. Una instancia por cliente, con despliegue documentado y sin dependencia obligatoria de la nube.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Puedo mantener el sistema por mi cuenta?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Sí. Entregamos código, documentación y pipeline para que el sistema no dependa de nosotros.',
    },
  },
];

@Component({
  selector: 'app-stack',
  imports: [RouterLink],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack {
  constructor() {
    inject(Seo).apply({
      title: TITLE,
      description: DESCRIPTION,
      path: '/stack/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            '@id': 'https://olivermartinezh.github.io/factorialabs-web/stack/#articulo',
            headline: 'Arquitectura y stack',
            description: DESCRIPTION,
            inLanguage: 'es-CL',
            about: ['modernización de software legacy', 'migración de datos', '.NET', 'Angular'],
            author: { '@type': 'Organization', name: 'FactoriaLabs' },
          },
          {
            '@type': 'FAQPage',
            mainEntity: FAQ,
          },
        ],
      },
    });
  }
}
