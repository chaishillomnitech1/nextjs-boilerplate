/**
 * API Route: Calculate Zakat on Rental Income
 * POST /api/zakat/calculate
 */

import { NextRequest, NextResponse } from 'next/server';
import { RentalIncome, RWAProperty } from '@/lib/types/zakat';
import { calculateZakat, checkHalalCompliance } from '@/lib/utils/zakat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rentalIncome, property } = body as {
      rentalIncome: RentalIncome;
      property: RWAProperty;
    };

    // Validate input
    if (!rentalIncome || !property) {
      return NextResponse.json(
        { error: 'Both rentalIncome and property data are required' },
        { status: 400 }
      );
    }

    // Validate rental income amount
    if (rentalIncome.amount <= 0) {
      return NextResponse.json(
        { error: 'Rental income amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Calculate Zakat
    const zakatCalculation = calculateZakat(rentalIncome, property);

    // Check halal compliance
    const complianceCheck = checkHalalCompliance(rentalIncome, property);

    return NextResponse.json({
      success: true,
      zakatCalculation,
      complianceCheck,
    });
  } catch (error) {
    console.error('Error calculating Zakat:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate Zakat',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
