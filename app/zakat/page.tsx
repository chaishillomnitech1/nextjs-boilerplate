/**
 * Zakat Dashboard Page
 * Displays rental income and Zakat tracking information
 */

'use client';

import { useState, useEffect } from 'react';
import { ZakatLedger } from '@/lib/types/zakat';

export default function ZakatDashboard() {
  const [ledgerData, setLedgerData] = useState<{
    zakatLedger: ZakatLedger;
    rentalIncomeLedger: any[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLedgerData();
  }, []);

  const fetchLedgerData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/zakat/ledger');
      if (!response.ok) {
        throw new Error('Failed to fetch ledger data');
      }
      const data = await response.json();
      setLedgerData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Zakat data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">Error</h3>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchLedgerData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const zakatLedger = ledgerData?.zakatLedger;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Zakat Tracking Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time tracking of Zakat (7.77%) from tokenized real estate rental income
          </p>
        </div>

        {/* Zakat Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Zakat Deducted */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Zakat Deducted
              </h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {zakatLedger?.currency} {zakatLedger?.totalZakatDeducted.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              From rental income @ 7.77%
            </p>
          </div>

          {/* Total Zakat Paid */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Zakat Paid
              </h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {zakatLedger?.currency} {zakatLedger?.totalZakatPaid.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Halal-compliant payments
            </p>
          </div>

          {/* Pending Zakat */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Zakat
              </h3>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {zakatLedger?.currency} {zakatLedger?.totalZakatPending.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Awaiting payment
            </p>
          </div>
        </div>

        {/* Halal Compliance Badge */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☪️</span>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Halal Certified System
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                All rental income sources are verified for halal compliance. Zakat calculations
                follow Islamic financial principles.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Ledger Entries */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Recent Zakat Ledger Entries
          </h2>
          
          {zakatLedger?.entries && zakatLedger.entries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Property ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {zakatLedger.entries.slice(0, 10).map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            entry.type === 'ZAKAT_DEDUCTION'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}
                        >
                          {entry.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {entry.currency} {entry.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {entry.propertyId.substring(0, 12)}...
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📝</span>
              <p className="text-gray-600 dark:text-gray-400">No ledger entries yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Sync rental income to start tracking Zakat
              </p>
            </div>
          )}
        </div>

        {/* System Information */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            System Information
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li>• <strong>Zakat Rate:</strong> 7.77% on rental income</li>
            <li>• <strong>Integration:</strong> Apideck Unified API</li>
            <li>• <strong>Ledger:</strong> Separated tracking for compliance</li>
            <li>• <strong>Assets:</strong> Tokenized real estate (RWA)</li>
            <li>
              • <strong>Last Updated:</strong>{' '}
              {zakatLedger?.lastUpdated
                ? new Date(zakatLedger.lastUpdated).toLocaleString()
                : 'N/A'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
