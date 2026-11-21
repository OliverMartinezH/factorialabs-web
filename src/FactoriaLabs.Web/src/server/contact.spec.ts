import { describe, expect, it } from 'vitest';
import { validateContact } from './contact';

const valid = {
  name: 'Ana Perez',
  email: 'Ana@Retail.CL',
  company: 'Retail Uno',
  currentSystem: 'Access 2003',
  message: 'Tenemos tres sistemas en Access y queremos unificarlos.',
};

describe('validateContact', () => {
  it('acepta un payload válido y normaliza el email', () => {
    const result = validateContact(valid);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.email).toBe('ana@retail.cl');
      expect(result.lead.company).toBe('Retail Uno');
    }
  });

  it('rechaza un email inválido', () => {
    const result = validateContact({ ...valid, email: 'no-es-email' });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors['email']).toBeDefined();
    }
  });

  it('rechaza nombre y mensaje demasiado cortos', () => {
    const result = validateContact({ name: 'A', email: 'a@b.cl', message: 'corto' });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors['name']).toBeDefined();
      expect(result.errors['message']).toBeDefined();
    }
  });

  it('convierte campos opcionales vacíos en null', () => {
    const result = validateContact({ ...valid, company: '   ', currentSystem: undefined });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.company).toBeNull();
      expect(result.lead.currentSystem).toBeNull();
    }
  });

  it('sobrevive a un cuerpo nulo', () => {
    const result = validateContact(null);

    expect(result.ok).toBe(false);
  });
});
