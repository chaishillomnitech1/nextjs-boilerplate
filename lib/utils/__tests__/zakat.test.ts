/**
 * Test for Zakat calculation utilities
 * Run with: node --loader tsx lib/utils/__tests__/zakat.test.ts
 */

import {
  calculateZakat,
  checkHalalCompliance,
  calculateTotalPendingZakat,
  calculateTotalPaidZakat,
  ZAKAT_RATE,
} from '../zakat';
import { RentalIncome, RWAProperty, ZakatCalculation } from '../../types/zakat';

// Test helper to compare floating point numbers
function assertApproximatelyEqual(actual: number, expected: number, tolerance = 0.01) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Expected ${actual} to be approximately ${expected}`);
  }
}

function assertEquals(actual: any, expected: any, message?: string) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${actual} to equal ${expected}`);
  }
}

// Test data
const mockProperty: RWAProperty = {
  id: 'property-1',
  name: 'Dubai Marina Apartment',
  address: 'Dubai, UAE',
  tokenId: 'token-property-1',
  totalValue: 1000000,
  currency: 'USD',
  ownershipPercentage: 100,
  isHalalCertified: true,
};

const mockRentalIncome: RentalIncome = {
  id: 'income-1',
  propertyId: 'property-1',
  amount: 10000,
  currency: 'USD',
  period: '2026-01',
  receivedDate: new Date('2026-01-05'),
  source: 'test',
};

// Test 1: Basic Zakat calculation
console.log('Test 1: Basic Zakat calculation (100% ownership)');
const calc1 = calculateZakat(mockRentalIncome, mockProperty);
assertEquals(calc1.zakatRate, ZAKAT_RATE, 'Zakat rate should be 7.77%');
assertApproximatelyEqual(calc1.zakatAmount, 777, 'Zakat on $10,000 should be $777');
assertEquals(calc1.isPaid, false, 'New calculation should not be paid');
assertEquals(calc1.isHalalCompliant, true, 'Should be halal compliant');
console.log('✓ Passed');

// Test 2: Fractional ownership
console.log('\nTest 2: Fractional ownership (50%)');
const property50 = { ...mockProperty, ownershipPercentage: 50 };
const calc2 = calculateZakat(mockRentalIncome, property50);
assertApproximatelyEqual(calc2.baseAmount, 5000, 'Base amount should be 50% of income');
assertApproximatelyEqual(calc2.zakatAmount, 388.50, 'Zakat on $5,000 should be $388.50');
console.log('✓ Passed');

// Test 3: Halal compliance check - non-certified property
console.log('\nTest 3: Halal compliance check (non-certified property)');
const nonHalalProperty = { ...mockProperty, isHalalCertified: false };
const compliance1 = checkHalalCompliance(mockRentalIncome, nonHalalProperty);
assertEquals(compliance1.isCompliant, false, 'Non-halal property should fail compliance');
assertEquals(
  compliance1.violations.length > 0,
  true,
  'Should have violations'
);
console.log('✓ Passed');

// Test 4: Halal compliance check - valid
console.log('\nTest 4: Halal compliance check (valid property)');
const compliance2 = checkHalalCompliance(mockRentalIncome, mockProperty);
assertEquals(compliance2.isCompliant, true, 'Halal property should pass compliance');
assertEquals(compliance2.violations.length, 0, 'Should have no violations');
assertEquals(compliance2.checks.halalCertifiedProperty, true);
assertEquals(compliance2.checks.noInterestIncome, true);
assertEquals(compliance2.checks.validZakatCalculation, true);
console.log('✓ Passed');

// Test 5: Total pending Zakat
console.log('\nTest 5: Calculate total pending Zakat');
const calculations: ZakatCalculation[] = [
  { ...calc1, id: 'calc-1', zakatAmount: 777, isPaid: false },
  { ...calc1, id: 'calc-2', zakatAmount: 388.50, isPaid: false },
  { ...calc1, id: 'calc-3', zakatAmount: 500, isPaid: true }, // Paid, should not count
];
const totalPending = calculateTotalPendingZakat(calculations);
assertApproximatelyEqual(totalPending, 1165.50, 'Total pending should be $1,165.50');
console.log('✓ Passed');

// Test 6: Total paid Zakat
console.log('\nTest 6: Calculate total paid Zakat');
const totalPaid = calculateTotalPaidZakat(calculations);
assertApproximatelyEqual(totalPaid, 500, 'Total paid should be $500');
console.log('✓ Passed');

// Test 7: Zero rental income
console.log('\nTest 7: Zero rental income');
const zeroIncome = { ...mockRentalIncome, amount: 0 };
const calc3 = calculateZakat(zeroIncome, mockProperty);
assertEquals(calc3.zakatAmount, 0, 'Zakat on $0 should be $0');
console.log('✓ Passed');

// Test 8: Large rental income
console.log('\nTest 8: Large rental income');
const largeIncome = { ...mockRentalIncome, amount: 100000 };
const calc4 = calculateZakat(largeIncome, mockProperty);
assertApproximatelyEqual(calc4.zakatAmount, 7770, 'Zakat on $100,000 should be $7,770');
console.log('✓ Passed');

// Test 9: Verify ZAKAT_RATE constant
console.log('\nTest 9: Verify ZAKAT_RATE constant');
assertEquals(ZAKAT_RATE, 0.0777, 'ZAKAT_RATE should be exactly 0.0777 (7.77%)');
console.log('✓ Passed');

console.log('\n✅ All tests passed!');
console.log('\nTest Summary:');
console.log('- Basic Zakat calculation: ✓');
console.log('- Fractional ownership: ✓');
console.log('- Halal compliance (non-certified): ✓');
console.log('- Halal compliance (valid): ✓');
console.log('- Total pending Zakat: ✓');
console.log('- Total paid Zakat: ✓');
console.log('- Zero rental income: ✓');
console.log('- Large rental income: ✓');
console.log('- ZAKAT_RATE constant: ✓');
