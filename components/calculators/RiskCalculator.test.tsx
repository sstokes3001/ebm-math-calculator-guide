import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RiskCalculator } from './RiskCalculator';

// Worked examples computed by hand from the definitions:
//   EER = a/(a+b), CER = c/(c+d), RR = EER/CER, ARR = |CER - EER|, NNT = ceil(1/ARR)

const cell = (name: string) => screen.getByRole('spinbutton', { name });

const setTable = (a: number, b: number, c: number, d: number) => {
  fireEvent.change(cell('a: Treatment group, bad outcome'), { target: { value: String(a) } });
  fireEvent.change(cell('b: Treatment group, good outcome'), { target: { value: String(b) } });
  fireEvent.change(cell('c: Control group, bad outcome'), { target: { value: String(c) } });
  fireEvent.change(cell('d: Control group, good outcome'), { target: { value: String(d) } });
  fireEvent.click(screen.getByRole('button', { name: /Calculate Results/i }));
};

describe('RiskCalculator', () => {
  it('default example a=15 b=85 c=20 d=80: EER 15.0%, CER 20.0%, RR 0.75, ARR 5.0%, NNT 20', () => {
    render(<RiskCalculator />);
    // EER = 15/100 = 15.0%; CER = 20/100 = 20.0%
    expect(screen.getByText('15.0%')).toBeInTheDocument();
    expect(screen.getByText('20.0%')).toBeInTheDocument();
    // RR = 0.15/0.20 = 0.75
    expect(screen.getByText('0.75')).toBeInTheDocument();
    // ARR = 0.20 - 0.15 = 0.05 -> 5.0% (also quoted in the clinical interpretation)
    expect(screen.getAllByText(/5\.0%/).length).toBeGreaterThanOrEqual(1);
    // NNT = 1/0.05 = 20, benefit direction
    expect(screen.getByText('Number Needed to Treat (NNT)')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('benefit example a=10 b=90 c=20 d=80: RR 0.50, ARR 10.0%, NNT 10', () => {
    render(<RiskCalculator />);
    setTable(10, 90, 20, 80);
    // EER = 10/100 = 10%; CER = 20/100 = 20%; RR = 0.50
    expect(screen.getByText('0.50')).toBeInTheDocument();
    // ARR = 10.0% — shown in the ARR tile; EER tile also reads 10.0%
    expect(screen.getAllByText('10.0%').length).toBeGreaterThanOrEqual(2);
    // NNT = 1/0.10 = 10
    expect(screen.getByText('Number Needed to Treat (NNT)')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/reduces the absolute risk/)).toBeInTheDocument();
  });

  it('harm example a=30 b=70 c=10 d=90: RR 3.00, ARR 20.0%, NNH 5', () => {
    render(<RiskCalculator />);
    setTable(30, 70, 10, 90);
    // EER = 30%; CER = 10%; RR = 0.30/0.10 = 3.00
    expect(screen.getByText('3.00')).toBeInTheDocument();
    // |CER - EER| = 20.0%
    expect(screen.getAllByText('20.0%').length).toBeGreaterThanOrEqual(1);
    // Treatment increases risk: NNH = 1/0.20 = 5
    expect(screen.getByText('Number Needed to Harm (NNH)')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/increases the absolute risk/)).toBeInTheDocument();
  });

  it('results only update after Calculate is clicked', () => {
    render(<RiskCalculator />);
    fireEvent.change(cell('a: Treatment group, bad outcome'), { target: { value: '10' } });
    // RR still reflects the committed defaults (0.75), not the edited input
    expect(screen.getByText('0.75')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Calculate Results/i }));
    // Now RR = (10/95)/(20/100) = 0.105.../0.20 = 0.53
    expect(screen.getByText('0.53')).toBeInTheDocument();
  });
});
