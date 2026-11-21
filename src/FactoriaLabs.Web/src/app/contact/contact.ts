import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../core/config';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'name' | 'email' | 'message';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly status = signal<Status>('idle');
  protected readonly errorMessage = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    currentSystem: [''],
    message: ['', [Validators.required, Validators.minLength(12)]],
  });

  protected readonly email = CONTACT.email;

  protected get contactHref(): string {
    if (CONTACT.whatsapp) {
      return `https://wa.me/${CONTACT.whatsapp}`;
    }
    return `mailto:${CONTACT.email}?subject=Consulta%20desde%20factorialabs`;
  }

  protected get contactLabel(): string {
    return CONTACT.whatsapp ? 'Escribir por WhatsApp' : 'Escribir por correo';
  }

  protected invalid(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    this.http.post('/api/contact', this.form.getRawValue()).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
      },
      error: (response: HttpErrorResponse) => {
        this.applyServerErrors(response);
        this.status.set('error');
        this.errorMessage.set(
          `No pudimos enviar el formulario. Escríbenos directo a ${this.email}.`,
        );
      },
    });
  }

  /** Si el servidor devuelve errores por campo, se marcan en el formulario. */
  private applyServerErrors(response: HttpErrorResponse): void {
    const errors = (response.error as { errors?: Record<string, string[]> } | null)?.errors;

    if (!errors) {
      return;
    }

    for (const [field, messages] of Object.entries(errors)) {
      if (field === 'name' || field === 'email' || field === 'message') {
        this.form.controls[field].setErrors({ server: messages[0] ?? 'Inválido' });
      }
    }
  }
}
