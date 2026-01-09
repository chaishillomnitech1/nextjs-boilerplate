/**
 * Ledger Service for tracking Zakat and Rental Income
 * Maintains separated ledgers for halal compliance
 */

import {
  LedgerEntry,
  LedgerEntryType,
  ZakatLedger,
  RentalIncome,
  ZakatCalculation,
} from '../types/zakat';

/**
 * In-memory storage for ledger entries (in production, use a database)
 */
class LedgerStore {
  private rentalIncomeLedger: LedgerEntry[] = [];
  private zakatLedger: LedgerEntry[] = [];

  /**
   * Add rental income entry to the ledger
   */
  addRentalIncomeEntry(income: RentalIncome): LedgerEntry {
    const entry: LedgerEntry = {
      id: `ledger-income-${income.id}-${Date.now()}`,
      type: LedgerEntryType.RENTAL_INCOME,
      propertyId: income.propertyId,
      amount: income.amount,
      currency: income.currency,
      description: `Rental income for period ${income.period}`,
      timestamp: new Date(),
      referenceId: income.id,
      metadata: {
        period: income.period,
        receivedDate: income.receivedDate,
        source: income.source,
      },
    };

    this.rentalIncomeLedger.push(entry);
    return entry;
  }

  /**
   * Add Zakat deduction entry to the separated Zakat ledger
   */
  addZakatDeductionEntry(calculation: ZakatCalculation): LedgerEntry {
    const entry: LedgerEntry = {
      id: `ledger-zakat-deduction-${calculation.id}-${Date.now()}`,
      type: LedgerEntryType.ZAKAT_DEDUCTION,
      propertyId: calculation.propertyId,
      amount: calculation.zakatAmount,
      currency: calculation.currency,
      description: `Zakat deduction (7.77%) on rental income`,
      timestamp: new Date(),
      referenceId: calculation.id,
      metadata: {
        rentalIncomeId: calculation.rentalIncomeId,
        baseAmount: calculation.baseAmount,
        zakatRate: calculation.zakatRate,
        isHalalCompliant: calculation.isHalalCompliant,
      },
    };

    this.zakatLedger.push(entry);
    return entry;
  }

  /**
   * Add Zakat payment entry to the separated Zakat ledger
   */
  addZakatPaymentEntry(calculation: ZakatCalculation): LedgerEntry {
    const entry: LedgerEntry = {
      id: `ledger-zakat-payment-${calculation.id}-${Date.now()}`,
      type: LedgerEntryType.ZAKAT_PAYMENT,
      propertyId: calculation.propertyId,
      amount: calculation.zakatAmount,
      currency: calculation.currency,
      description: `Zakat payment for calculation ${calculation.id}`,
      timestamp: new Date(),
      referenceId: calculation.id,
      metadata: {
        paidDate: calculation.paidDate,
        isHalalCompliant: calculation.isHalalCompliant,
      },
    };

    this.zakatLedger.push(entry);
    return entry;
  }

  /**
   * Get all rental income ledger entries
   */
  getRentalIncomeLedger(): LedgerEntry[] {
    return [...this.rentalIncomeLedger];
  }

  /**
   * Get the separated Zakat ledger
   */
  getZakatLedgerEntries(): LedgerEntry[] {
    return [...this.zakatLedger];
  }

  /**
   * Get Zakat ledger summary
   */
  getZakatLedgerSummary(currency: string = 'USD'): ZakatLedger {
    const entries = this.zakatLedger.filter(e => e.currency === currency);

    const totalZakatDeducted = entries
      .filter(e => e.type === LedgerEntryType.ZAKAT_DEDUCTION)
      .reduce((sum, e) => sum + e.amount, 0);

    const totalZakatPaid = entries
      .filter(e => e.type === LedgerEntryType.ZAKAT_PAYMENT)
      .reduce((sum, e) => sum + e.amount, 0);

    const totalZakatPending = totalZakatDeducted - totalZakatPaid;

    return {
      entries,
      totalZakatDeducted: Number(totalZakatDeducted.toFixed(2)),
      totalZakatPaid: Number(totalZakatPaid.toFixed(2)),
      totalZakatPending: Number(totalZakatPending.toFixed(2)),
      currency,
      lastUpdated: new Date(),
    };
  }

  /**
   * Get ledger entries by property ID
   */
  getLedgerEntriesByProperty(propertyId: string): {
    rentalIncome: LedgerEntry[];
    zakat: LedgerEntry[];
  } {
    return {
      rentalIncome: this.rentalIncomeLedger.filter(e => e.propertyId === propertyId),
      zakat: this.zakatLedger.filter(e => e.propertyId === propertyId),
    };
  }

  /**
   * Get ledger entries within a date range
   */
  getLedgerEntriesByDateRange(
    startDate: Date,
    endDate: Date
  ): {
    rentalIncome: LedgerEntry[];
    zakat: LedgerEntry[];
  } {
    const filterByDate = (entry: LedgerEntry) =>
      entry.timestamp >= startDate && entry.timestamp <= endDate;

    return {
      rentalIncome: this.rentalIncomeLedger.filter(filterByDate),
      zakat: this.zakatLedger.filter(filterByDate),
    };
  }

  /**
   * Clear all ledger entries (for testing purposes)
   */
  clearAllLedgers(): void {
    this.rentalIncomeLedger = [];
    this.zakatLedger = [];
  }
}

// Singleton instance
export const ledgerStore = new LedgerStore();

/**
 * Process rental income and automatically calculate and record Zakat
 */
export function processRentalIncomeWithZakat(
  income: RentalIncome,
  calculation: ZakatCalculation
): {
  incomeEntry: LedgerEntry;
  zakatEntry: LedgerEntry;
} {
  // Record rental income in the ledger
  const incomeEntry = ledgerStore.addRentalIncomeEntry(income);

  // Record Zakat deduction in the separated Zakat ledger
  const zakatEntry = ledgerStore.addZakatDeductionEntry(calculation);

  return {
    incomeEntry,
    zakatEntry,
  };
}

/**
 * Mark Zakat as paid and record payment in ledger
 */
export function recordZakatPayment(calculation: ZakatCalculation): LedgerEntry {
  // Update calculation to mark as paid
  calculation.isPaid = true;
  calculation.paidDate = new Date();

  // Record payment in the Zakat ledger
  return ledgerStore.addZakatPaymentEntry(calculation);
}
