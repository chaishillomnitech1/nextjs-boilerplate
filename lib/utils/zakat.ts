/**
 * Zakat Calculation Utilities
 * Implements the 7.77% Zakat rate on rental income from RWA assets
 */

import {
  RentalIncome,
  ZakatCalculation,
  HalalComplianceCheck,
  RWAProperty,
} from '../types/zakat';

/**
 * Standard Zakat rate for rental income (7.77%)
 */
export const ZAKAT_RATE = 0.0777;

/**
 * Calculate Zakat on rental income
 * @param rentalIncome - The rental income to calculate Zakat on
 * @param property - The associated property
 * @returns ZakatCalculation object
 */
export function calculateZakat(
  rentalIncome: RentalIncome,
  property: RWAProperty
): ZakatCalculation {
  // Apply user's ownership percentage to the rental income
  const adjustedAmount = rentalIncome.amount * (property.ownershipPercentage / 100);
  
  // Calculate Zakat amount (7.77% of rental income)
  const zakatAmount = adjustedAmount * ZAKAT_RATE;

  // Perform halal compliance check
  const complianceCheck = checkHalalCompliance(rentalIncome, property);

  const calculation: ZakatCalculation = {
    id: `zakat-${rentalIncome.id}-${Date.now()}`,
    rentalIncomeId: rentalIncome.id,
    propertyId: rentalIncome.propertyId,
    baseAmount: adjustedAmount,
    zakatRate: ZAKAT_RATE,
    zakatAmount: Number(zakatAmount.toFixed(2)), // Round to 2 decimal places
    currency: rentalIncome.currency,
    calculatedDate: new Date(),
    isPaid: false,
    isHalalCompliant: complianceCheck.isCompliant,
  };

  return calculation;
}

/**
 * Check halal compliance for rental income
 * @param rentalIncome - The rental income to check
 * @param property - The associated property
 * @returns HalalComplianceCheck result
 */
export function checkHalalCompliance(
  rentalIncome: RentalIncome,
  property: RWAProperty
): HalalComplianceCheck {
  const violations: string[] = [];
  
  const checks = {
    noInterestIncome: true, // Rental income is not interest-based
    halalCertifiedProperty: property.isHalalCertified,
    validZakatCalculation: rentalIncome.amount > 0,
  };

  // Check if property is halal certified
  if (!checks.halalCertifiedProperty) {
    violations.push('Property is not halal certified');
  }

  // Check if rental income amount is valid
  if (!checks.validZakatCalculation) {
    violations.push('Invalid rental income amount');
  }

  const isCompliant = violations.length === 0;

  return {
    isCompliant,
    checks,
    violations,
  };
}

/**
 * Calculate total Zakat for multiple rental incomes
 * @param rentalIncomes - Array of rental incomes
 * @param properties - Map of property ID to property
 * @returns Array of ZakatCalculation objects
 */
export function calculateBulkZakat(
  rentalIncomes: RentalIncome[],
  properties: Map<string, RWAProperty>
): ZakatCalculation[] {
  return rentalIncomes.map(income => {
    const property = properties.get(income.propertyId);
    if (!property) {
      throw new Error(`Property not found for rental income ${income.id}`);
    }
    return calculateZakat(income, property);
  });
}

/**
 * Calculate total pending Zakat amount
 * @param calculations - Array of Zakat calculations
 * @returns Total pending Zakat amount
 */
export function calculateTotalPendingZakat(calculations: ZakatCalculation[]): number {
  return calculations
    .filter(calc => !calc.isPaid)
    .reduce((total, calc) => total + calc.zakatAmount, 0);
}

/**
 * Calculate total paid Zakat amount
 * @param calculations - Array of Zakat calculations
 * @returns Total paid Zakat amount
 */
export function calculateTotalPaidZakat(calculations: ZakatCalculation[]): number {
  return calculations
    .filter(calc => calc.isPaid)
    .reduce((total, calc) => total + calc.zakatAmount, 0);
}

/**
 * Format Zakat amount for display
 * @param amount - Zakat amount
 * @param currency - Currency code
 * @returns Formatted string
 */
export function formatZakatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
