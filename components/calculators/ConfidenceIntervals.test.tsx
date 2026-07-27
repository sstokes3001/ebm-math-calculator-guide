import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfidenceIntervals } from './ConfidenceIntervals';

// Golden rules being verified: for DIFFERENCE data the null value is 0,
// for RATIO data (OR/RR/HR) the null value is 1. An interval that touches
// or crosses its null value is not statistically significant.

const setCiBounds = (lower: string, upper: string) => {
  fireEvent.change(screen.getByLabelText('95% CI Lower Bound'), { target: { value: lower } });
  fireEvent.change(screen.getByLabelText('95% CI Upper Bound'), { target: { value: upper } });
  fireEvent.click(screen.getByRole('button', { name: /Calculate Interpretation/i }));
};

describe('ConfidenceIntervals', () => {
  it('difference CI -6.3 to -1.7 (default): entirely below 0, significant', () => {
    render(<ConfidenceIntervals />);
    expect(screen.getByText('Statistically Significant')).toBeInTheDocument();
    expect(screen.getByText('The range DOES NOT touch 0.')).toBeInTheDocument();
  });

  it('difference CI -2.0 to 3.0: crosses 0, not significant', () => {
    render(<ConfidenceIntervals />);
    setCiBounds('-2.0', '3.0');
    expect(screen.getByText('Not Statistically Significant')).toBeInTheDocument();
    expect(screen.getByText('The range TOUCHES or CROSSES 0.')).toBeInTheDocument();
  });

  it('ratio CI 0.85 to 1.34: crosses 1, not significant', () => {
    render(<ConfidenceIntervals />);
    fireEvent.click(screen.getByRole('button', { name: /Ratio Data/i }));
    setCiBounds('0.85', '1.34');
    expect(screen.getByText('Not Statistically Significant')).toBeInTheDocument();
    expect(screen.getByText('The range TOUCHES or CROSSES 1.')).toBeInTheDocument();
  });

  it('ratio CI 1.20 to 1.80: entirely above 1, significant', () => {
    render(<ConfidenceIntervals />);
    fireEvent.click(screen.getByRole('button', { name: /Ratio Data/i }));
    setCiBounds('1.20', '1.80');
    expect(screen.getByText('Statistically Significant')).toBeInTheDocument();
    expect(screen.getByText('The range DOES NOT touch 1.')).toBeInTheDocument();
  });

  it('ratio CI 0.40 to 0.90: entirely below 1, significant (protective but real)', () => {
    render(<ConfidenceIntervals />);
    fireEvent.click(screen.getByRole('button', { name: /Ratio Data/i }));
    setCiBounds('0.40', '0.90');
    expect(screen.getByText('Statistically Significant')).toBeInTheDocument();
  });

  it('lower bound above upper bound is rejected as invalid', () => {
    render(<ConfidenceIntervals />);
    setCiBounds('5.0', '2.0');
    expect(screen.getByText('Invalid Range or Click Calculate')).toBeInTheDocument();
    expect(screen.queryByText('Statistically Significant')).not.toBeInTheDocument();
  });
});
