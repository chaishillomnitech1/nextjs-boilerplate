/**
 * API Route: Query Zakat Ledger
 * GET /api/zakat/ledger
 */

import { NextRequest, NextResponse } from 'next/server';
import { ledgerStore } from '@/lib/services/ledger';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'zakat', 'rental', or 'all'
    const propertyId = searchParams.get('propertyId');
    const currency = searchParams.get('currency') || 'USD';

    // Get Zakat ledger summary
    const zakatLedgerSummary = ledgerStore.getZakatLedgerSummary(currency);

    // If property ID is specified, filter by property
    if (propertyId) {
      const propertyLedgers = ledgerStore.getLedgerEntriesByProperty(propertyId);
      
      return NextResponse.json({
        success: true,
        propertyId,
        rentalIncomeLedger: propertyLedgers.rentalIncome,
        zakatLedger: propertyLedgers.zakat,
        zakatSummary: zakatLedgerSummary,
      });
    }

    // Return ledger based on type
    if (type === 'zakat') {
      return NextResponse.json({
        success: true,
        ledger: zakatLedgerSummary,
      });
    } else if (type === 'rental') {
      return NextResponse.json({
        success: true,
        ledger: ledgerStore.getRentalIncomeLedger(),
      });
    } else {
      // Return all ledgers
      return NextResponse.json({
        success: true,
        rentalIncomeLedger: ledgerStore.getRentalIncomeLedger(),
        zakatLedger: zakatLedgerSummary,
      });
    }
  } catch (error) {
    console.error('Error querying ledger:', error);
    return NextResponse.json(
      {
        error: 'Failed to query ledger',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
