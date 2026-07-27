import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiagnosticTesting } from './DiagnosticTesting';

// Worked examples computed by hand from the definitions:
//   Sens = TP/(TP+FN), Spec = TN/(TN+FP), PPV = TP/(TP+FP), NPV = TN/(TN+FN),
//   LR+ = Sens/(1-Spec), LR- = (1-Sens)/Spec

const cell = (name: string) => screen.getByRole('spinbutton', { name });

const setTable = (tp: number, fp: number, fn: number, tn: number) => {
  fireEvent.change(cell('TP: True positives'), { target: { value: String(tp) } });
  fireEvent.change(cell('FP: False positives'), { target: { value: String(fp) } });
  fireEvent.change(cell('FN: False negatives'), { target: { value: String(fn) } });
  fireEvent.change(cell('TN: True negatives'), { target: { value: String(tn) } });
  fireEvent.click(screen.getByRole('button', { name: /Calculate Stats/i }));
};

describe('DiagnosticTesting', () => {
  it('default example TP=80 FP=10 FN=20 TN=90: Sens 80.0%, Spec 90.0%, PPV 88.9%, NPV 81.8%, LR+ 8.00, LR- 0.22', () => {
    render(<DiagnosticTesting />);
    // Sens = 80/100 = 80.0%; Spec = 90/100 = 90.0%
    expect(screen.getByText('80.0%')).toBeInTheDocument();
    expect(screen.getByText('90.0%')).toBeInTheDocument();
    // PPV = 80/90 = 88.9%; NPV = 90/110 = 81.8%
    expect(screen.getByText('88.9%')).toBeInTheDocument();
    expect(screen.getByText('81.8%')).toBeInTheDocument();
    // LR+ = 0.80/0.10 = 8.00; LR- = 0.20/0.90 = 0.22
    expect(screen.getByText('8.00')).toBeInTheDocument();
    expect(screen.getByText('0.22')).toBeInTheDocument();
  });

  it('low-prevalence screening TP=90 FP=990 FN=10 TN=8910: same Sens/Spec but PPV collapses to 8.3%', () => {
    render(<DiagnosticTesting />);
    setTable(90, 990, 10, 8910);
    // Sens = 90/100 = 90.0% and Spec = 8910/9900 = 90.0% — both tiles
    expect(screen.getAllByText('90.0%').length).toBeGreaterThanOrEqual(2);
    // PPV = 90/1080 = 8.3% despite a 90%-sensitive test (prevalence 1%)
    expect(screen.getByText('8.3%')).toBeInTheDocument();
    // NPV = 8910/8920 = 99.9%
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    // LR+ = 0.90/0.10 = 9.00; LR- = 0.10/0.90 = 0.11 (prevalence-independent)
    expect(screen.getByText('9.00')).toBeInTheDocument();
    expect(screen.getByText('0.11')).toBeInTheDocument();
  });

  it('perfect test TP=50 FP=0 FN=0 TN=50: Sens/Spec/PPV/NPV all 100.0%', () => {
    render(<DiagnosticTesting />);
    setTable(50, 0, 0, 50);
    // Sens, Spec, PPV, NPV each 100.0% (four tiles)
    expect(screen.getAllByText('100.0%').length).toBeGreaterThanOrEqual(4);
  });
});
