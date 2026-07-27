import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OddsCalculator } from './OddsCalculator';

// Worked examples computed by hand from OR = (a * d) / (b * c)

const cell = (name: string) => screen.getByRole('spinbutton', { name });

const setTable = (a: number, b: number, c: number, d: number) => {
  fireEvent.change(cell('a: Exposed cases'), { target: { value: String(a) } });
  fireEvent.change(cell('b: Exposed controls'), { target: { value: String(b) } });
  fireEvent.change(cell('c: Not exposed cases'), { target: { value: String(c) } });
  fireEvent.change(cell('d: Not exposed controls'), { target: { value: String(d) } });
  fireEvent.click(screen.getByRole('button', { name: /Calculate Odds Ratio/i }));
};

describe('OddsCalculator', () => {
  it('default example a=40 b=20 c=60 d=80: OR = 3200/1200 = 2.67, harmful', () => {
    render(<OddsCalculator />);
    expect(screen.getByText('2.67')).toBeInTheDocument();
    expect(screen.getByText('Exposure is Harmful (Risk Factor)')).toBeInTheDocument();
  });

  it('protective example a=10 b=90 c=30 d=70: OR = 700/2700 = 0.26', () => {
    render(<OddsCalculator />);
    setTable(10, 90, 30, 70);
    expect(screen.getByText('0.26')).toBeInTheDocument();
    expect(screen.getByText('Exposure is Protective')).toBeInTheDocument();
  });

  it('null example a=20 b=20 c=20 d=20: OR = 400/400 = 1.00, no association', () => {
    render(<OddsCalculator />);
    setTable(20, 20, 20, 20);
    expect(screen.getByText('1.00')).toBeInTheDocument();
    expect(screen.getByText('Null (No Association)')).toBeInTheDocument();
  });

  it('is not fooled into computing risk: OR differs from RR for the same table', () => {
    render(<OddsCalculator />);
    // a=30 b=70 c=10 d=90: OR = 2700/700 = 3.86 (RR for this table would be 3.00)
    setTable(30, 70, 10, 90);
    expect(screen.getByText('3.86')).toBeInTheDocument();
  });
});
