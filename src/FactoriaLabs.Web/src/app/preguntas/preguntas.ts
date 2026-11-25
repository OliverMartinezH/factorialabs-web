import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';

const TITLE = 'Preguntas frecuentes sobre software legado | FactoriaLabs';
const DESCRIPTION =
  'Qué es una aplicación heredada, a qué tecnología migrar, cómo se migran los datos y qué pasa con el soporte después del lanzamiento.';

const FAQ: Array<[string, string]> = [
  [
    '¿Qué es una aplicación heredada o software legado?',
    'Es un sistema que sigue en producción pero ya no se puede mantener con comodidad: ASP clásico, WebForms, JavaFX, Xamarin, Access. Funciona, pero cada cambio es un riesgo.',
  ],
  [
    '¿A qué tecnología migran?',
    'Depende del sistema. No imponemos un destino: el stack se define después del inventario, según lo que el software necesite para volver a ser mantenible.',
  ],
  [
    '¿Cómo es la migración de datos desde Access a SQL Server?',
    'Se inventarían tablas y consultas, se limpian claves duplicadas y nulos, se migra por etapas y se comparan conteos y totales contra el sistema original antes de usarlo.',
  ],
  [
    '¿Se puede modernizar sin detener la operación?',
    'Sí. El sistema antiguo sigue funcionando en paralelo y solo se apaga cuando el nuevo cuadra las mismas cifras.',
  ],
  [
    '¿Trabajan con sistemas en ASP clásico, JavaFX o Xamarin?',
    'Sí. Son el tipo de aplicaciones heredadas que modernizamos con más frecuencia, junto a WebForms y bases Access.',
  ],
  [
    '¿Ofrecen soporte después del lanzamiento?',
    'Sí, forma parte del ciclo. No entregamos y desaparecemos: seguimos con actualizaciones, correcciones y mejoras sobre el sistema ya modernizado.',
  ],
  [
    '¿Cuánto demora una modernización?',
    'Depende del inventario: no damos plazo ni precio antes de revisar el sistema. Cualquier cifra sin diagnóstico es una apuesta.',
  ],
];

@Component({
  selector: 'app-preguntas',
  imports: [RouterLink],
  templateUrl: './preguntas.html',
  styleUrl: './preguntas.scss',
})
export class Preguntas {
  protected readonly faq = FAQ;

  constructor() {
    inject(Seo).apply({
      title: TITLE,
      description: DESCRIPTION,
      path: '/preguntas/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    });
  }
}
