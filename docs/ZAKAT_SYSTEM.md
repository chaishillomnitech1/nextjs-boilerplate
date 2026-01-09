# Rental Income Zakat Tracking System

## Overview

This system integrates the Apideck Unified API to automatically sync and track Zakat (7.77%) on rental income from tokenized real estate (RWA - Real World Assets). It provides automated Zakat calculations, deductions, and a separated ledger system to ensure full halal compliance.

## Features

- **Apideck Unified API Integration**: Syncs rental income data from property management and accounting systems
- **Automated Zakat Calculation**: Automatically calculates 7.77% Zakat on rental yields
- **Separated Ledger System**: Maintains distinct ledgers for rental income and Zakat deductions
- **Halal Compliance**: Ensures all transactions meet Islamic financial principles
- **RWA Asset Support**: Full support for tokenized real estate properties

## Architecture

### Components

1. **Type Definitions** (`lib/types/zakat.ts`)
   - RWAProperty: Tokenized real estate property
   - RentalIncome: Rental income records
   - ZakatCalculation: Zakat computation results
   - LedgerEntry: Financial transaction records
   - ZakatLedger: Separated Zakat tracking ledger

2. **Zakat Utilities** (`lib/utils/zakat.ts`)
   - `calculateZakat()`: Calculates 7.77% Zakat on rental income
   - `checkHalalCompliance()`: Validates halal compliance
   - `calculateBulkZakat()`: Batch Zakat calculations
   - `formatZakatAmount()`: Currency formatting

3. **Ledger Service** (`lib/services/ledger.ts`)
   - Maintains separated ledgers for rental income and Zakat
   - Tracks total Zakat deducted, paid, and pending
   - Provides ledger queries by property and date range

4. **Apideck Service** (`lib/services/apideck.ts`)
   - Integrates with Apideck Unified API
   - Syncs rental income from connected systems
   - Fetches property data

5. **API Routes**
   - `POST /api/zakat/sync`: Sync rental income and calculate Zakat
   - `POST /api/zakat/calculate`: Calculate Zakat on specific income
   - `GET /api/zakat/ledger`: Query Zakat and rental income ledgers

## Zakat Calculation

### Rate
- **Zakat Rate**: 7.77% (0.0777)
- Applied to rental income from halal-certified properties

### Formula
```
Adjusted Amount = Rental Income × (Ownership Percentage / 100)
Zakat Amount = Adjusted Amount × 0.0777
```

### Example
```typescript
// Property with $10,000 monthly rental income
// User owns 50% of the property
Adjusted Amount = $10,000 × 0.5 = $5,000
Zakat = $5,000 × 0.0777 = $388.50
```

## Halal Compliance Checks

The system ensures halal compliance through:

1. **No Interest Income**: Verifies rental income is not interest-based
2. **Halal Certification**: Checks if property is halal certified
3. **Valid Calculations**: Ensures rental income amounts are valid (> 0)

Properties that fail compliance checks are flagged, and violations are recorded.

## API Usage

### 1. Sync Rental Income from Apideck

```bash
POST /api/zakat/sync
Content-Type: application/json

{
  "propertyIds": ["property-1", "property-2"]
}
```

**Response:**
```json
{
  "success": true,
  "syncStatus": {
    "lastSyncDate": "2026-01-09T18:00:00Z",
    "syncId": "sync-1234567890",
    "status": "success",
    "recordsSynced": 2
  },
  "processedRecords": 2,
  "data": [
    {
      "rentalIncome": { ... },
      "zakatCalculation": { ... },
      "ledgerEntries": { ... }
    }
  ]
}
```

### 2. Calculate Zakat

```bash
POST /api/zakat/calculate
Content-Type: application/json

{
  "rentalIncome": {
    "id": "income-123",
    "propertyId": "property-1",
    "amount": 10000,
    "currency": "USD",
    "period": "2026-01",
    "receivedDate": "2026-01-05T00:00:00Z",
    "source": "manual"
  },
  "property": {
    "id": "property-1",
    "name": "Dubai Marina Apartment",
    "address": "Dubai, UAE",
    "tokenId": "token-property-1",
    "totalValue": 1000000,
    "currency": "USD",
    "ownershipPercentage": 100,
    "isHalalCertified": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "zakatCalculation": {
    "id": "zakat-income-123-1234567890",
    "rentalIncomeId": "income-123",
    "propertyId": "property-1",
    "baseAmount": 10000,
    "zakatRate": 0.0777,
    "zakatAmount": 777,
    "currency": "USD",
    "calculatedDate": "2026-01-09T18:00:00Z",
    "isPaid": false,
    "isHalalCompliant": true
  },
  "complianceCheck": {
    "isCompliant": true,
    "checks": {
      "noInterestIncome": true,
      "halalCertifiedProperty": true,
      "validZakatCalculation": true
    },
    "violations": []
  }
}
```

### 3. Query Ledgers

```bash
# Get Zakat ledger summary
GET /api/zakat/ledger?type=zakat&currency=USD

# Get rental income ledger
GET /api/zakat/ledger?type=rental

# Get all ledgers
GET /api/zakat/ledger

# Get ledgers for specific property
GET /api/zakat/ledger?propertyId=property-1
```

**Response:**
```json
{
  "success": true,
  "rentalIncomeLedger": [ ... ],
  "zakatLedger": {
    "entries": [ ... ],
    "totalZakatDeducted": 1554.00,
    "totalZakatPaid": 777.00,
    "totalZakatPending": 777.00,
    "currency": "USD",
    "lastUpdated": "2026-01-09T18:00:00Z"
  }
}
```

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```bash
# Apideck Unified API Configuration
APIDECK_API_KEY=your-apideck-api-key-here
APIDECK_APP_ID=your-apideck-app-id-here
```

### Obtaining Apideck Credentials

1. Sign up at [Apideck](https://www.apideck.com/)
2. Create a new application
3. Copy your API Key and App ID
4. Configure integrations (Accounting, CRM, etc.)

**Example placeholders:**
```bash
APIDECK_API_KEY=sk_live_1234567890abcdef
APIDECK_APP_ID=app_test_9876543210zyxwvu
```

## Ledger Structure

### Rental Income Ledger
Tracks all rental income received:
- Income entries with property reference
- Period and received date
- Source (Apideck, manual, etc.)

### Zakat Ledger (Separated)
Tracks all Zakat-related transactions:
- Zakat deduction entries
- Zakat payment entries
- Running totals (deducted, paid, pending)

This separation ensures clear tracking for halal compliance and audit purposes.

## Integration with RWA Assets

The system is designed to work with tokenized real estate (RWA) assets:

1. **Property Tokenization**: Each property has a unique token ID
2. **Ownership Tracking**: Supports fractional ownership percentages
3. **Yield Distribution**: Calculates Zakat based on user's ownership share
4. **Halal Certification**: Tracks certification status for compliance

## Development

### Build
```bash
npm run build
```

### Run Development Server
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use `.env.local` for sensitive data
3. **Input Validation**: All API routes validate input data
4. **Error Handling**: Comprehensive error handling and logging

## Future Enhancements

- [ ] Database integration for persistent storage
- [ ] Automated Zakat payment scheduling
- [ ] Multi-currency support with exchange rates
- [ ] Advanced reporting and analytics
- [ ] Integration with more property management systems
- [ ] Mobile app for Zakat tracking
- [ ] Blockchain-based audit trail

## Support

For questions or issues, please contact the development team or open an issue in the repository.

## License

See LICENSE file in the repository.
