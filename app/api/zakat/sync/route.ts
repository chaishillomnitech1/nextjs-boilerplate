/**
 * API Route: Sync Rental Income from Apideck
 * POST /api/zakat/sync
 */

import { NextRequest, NextResponse } from 'next/server';
import { syncRentalIncome, fetchPropertyData } from '@/lib/services/apideck';
import { calculateZakat } from '@/lib/utils/zakat';
import { processRentalIncomeWithZakat } from '@/lib/services/ledger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyIds } = body;

    if (!propertyIds || !Array.isArray(propertyIds)) {
      return NextResponse.json(
        { error: 'Property IDs are required and must be an array' },
        { status: 400 }
      );
    }

    // Fetch property data
    const properties = await fetchPropertyData(propertyIds);

    if (properties.length === 0) {
      return NextResponse.json(
        { error: 'No properties found' },
        { status: 404 }
      );
    }

    // Sync rental income from Apideck
    const { rentalIncomes, syncStatus } = await syncRentalIncome(properties);

    // Calculate Zakat and record in ledgers
    const processedData = rentalIncomes.map((income) => {
      const property = properties.find(p => p.id === income.propertyId);
      if (!property) {
        return null;
      }

      // Calculate Zakat
      const zakatCalculation = calculateZakat(income, property);

      // Record in ledgers
      const ledgerEntries = processRentalIncomeWithZakat(income, zakatCalculation);

      return {
        rentalIncome: income,
        zakatCalculation,
        ledgerEntries,
      };
    }).filter(item => item !== null);

    return NextResponse.json({
      success: true,
      syncStatus,
      processedRecords: processedData.length,
      data: processedData,
    });
  } catch (error) {
    console.error('Error syncing rental income:', error);
    return NextResponse.json(
      {
        error: 'Failed to sync rental income',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
