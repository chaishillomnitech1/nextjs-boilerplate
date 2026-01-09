/**
 * Zakat and RWA (Real World Assets) Type Definitions
 * For tracking rental income from tokenized real estate and Zakat deductions
 */

/**
 * Represents a tokenized real estate property
 */
export interface RWAProperty {
  id: string;
  name: string;
  address: string;
  tokenId: string;
  totalValue: number;
  currency: string;
  ownershipPercentage: number; // User's ownership percentage (0-100)
  isHalalCertified: boolean;
}

/**
 * Represents rental income from a property
 */
export interface RentalIncome {
  id: string;
  propertyId: string;
  amount: number;
  currency: string;
  period: string; // e.g., "2026-01", "2026-Q1"
  receivedDate: Date;
  source: string; // Source of the rental income data
  apideekSyncId?: string; // Reference to Apideck sync
}

/**
 * Zakat calculation result
 */
export interface ZakatCalculation {
  id: string;
  rentalIncomeId: string;
  propertyId: string;
  baseAmount: number;
  zakatRate: number; // 7.77% = 0.0777
  zakatAmount: number;
  currency: string;
  calculatedDate: Date;
  isPaid: boolean;
  paidDate?: Date;
  isHalalCompliant: boolean;
}

/**
 * Ledger entry types
 */
export enum LedgerEntryType {
  RENTAL_INCOME = 'RENTAL_INCOME',
  ZAKAT_DEDUCTION = 'ZAKAT_DEDUCTION',
  ZAKAT_PAYMENT = 'ZAKAT_PAYMENT',
}

/**
 * Ledger entry for tracking all financial movements
 */
export interface LedgerEntry {
  id: string;
  type: LedgerEntryType;
  propertyId: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: Date;
  referenceId: string; // Reference to RentalIncome or ZakatCalculation
  metadata?: Record<string, any>;
}

/**
 * Separated Zakat Ledger
 */
export interface ZakatLedger {
  entries: LedgerEntry[];
  totalZakatDeducted: number;
  totalZakatPaid: number;
  totalZakatPending: number;
  currency: string;
  lastUpdated: Date;
}

/**
 * Apideck sync status
 */
export interface ApideekSyncStatus {
  lastSyncDate: Date;
  syncId: string;
  status: 'success' | 'failed' | 'pending';
  recordsSynced: number;
  errors?: string[];
}

/**
 * Halal compliance check result
 */
export interface HalalComplianceCheck {
  isCompliant: boolean;
  checks: {
    noInterestIncome: boolean;
    halalCertifiedProperty: boolean;
    validZakatCalculation: boolean;
  };
  violations: string[];
}
