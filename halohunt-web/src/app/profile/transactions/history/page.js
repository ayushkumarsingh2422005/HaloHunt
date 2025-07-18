"use client";
import { useState } from 'react';
import { ChevronLeft, Download, Calendar, ArrowUpRight, ArrowDownLeft, ChevronDown, Filter } from 'lucide-react';
import Link from 'next/link';

// Sample earnings data
const earningsData = {
  summary: {
    totalEarnings: 15750.50,
    totalSales: 12500.25,
    totalWithdrawals: 3500.00,
    platformFees: 625.01,
    netEarnings: 11875.24,
  },
  monthlySummary: [
    { month: 'Jan', earnings: 1250.50 },
    { month: 'Feb', earnings: 1450.75 },
    { month: 'Mar', earnings: 1350.25 },
    { month: 'Apr', earnings: 1550.00 },
    { month: 'May', earnings: 1650.50 },
    { month: 'Jun', earnings: 1750.25 },
    { month: 'Jul', earnings: 1200.00 },
  ],
  categorySummary: [
    { category: 'Electronics', amount: 5250.50, percentage: 42 },
    { category: 'Fashion', amount: 3750.25, percentage: 30 },
    { category: 'Home & Living', amount: 2500.75, percentage: 20 },
    { category: 'Others', amount: 1000.00, percentage: 8 },
  ],
  yearlyData: {
    '2023': {
      totalEarnings: 10250.50,
      totalSales: 8500.25,
      totalWithdrawals: 2500.00,
      platformFees: 425.01,
      netEarnings: 8075.24,
      monthlySummary: [
        { month: 'Jan', earnings: 1250.50 },
        { month: 'Feb', earnings: 1450.75 },
        { month: 'Mar', earnings: 1350.25 },
        { month: 'Apr', earnings: 1550.00 },
        { month: 'May', earnings: 1650.50 },
        { month: 'Jun', earnings: 1750.25 },
        { month: 'Jul', earnings: 1200.00 },
      ]
    },
    '2022': {
      totalEarnings: 5500.00,
      totalSales: 4000.00,
      totalWithdrawals: 1000.00,
      platformFees: 200.00,
      netEarnings: 3800.00,
      monthlySummary: [
        { month: 'Jan', earnings: 350.00 },
        { month: 'Feb', earnings: 400.00 },
        { month: 'Mar', earnings: 450.00 },
        { month: 'Apr', earnings: 500.00 },
        { month: 'May', earnings: 550.00 },
        { month: 'Jun', earnings: 600.00 },
        { month: 'Jul', earnings: 650.00 },
        { month: 'Aug', earnings: 500.00 },
        { month: 'Sep', earnings: 450.00 },
        { month: 'Oct', earnings: 400.00 },
        { month: 'Nov', earnings: 350.00 },
        { month: 'Dec', earnings: 300.00 },
      ]
    }
  }
};

const EarningsChart = ({ data }) => {
  // Find the maximum value to scale the chart
  const maxEarnings = Math.max(...data.map(item => item.earnings));
  
  return (
    <div className="mt-4">
      <div className="flex items-end h-40 gap-2">
        {data.map((item, index) => {
          // Calculate height percentage based on max value
          const heightPercentage = (item.earnings / maxEarnings) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full">
                <div 
                  className="bg-purple-200 rounded-t-sm w-full"
                  style={{ height: `${heightPercentage}%` }}
                >
                  <div className="absolute bottom-0 w-full h-1/3 bg-purple-600 rounded-t-sm"></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">{item.month}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
            <span>Earnings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryPieChart = ({ data }) => {
  const colors = ['bg-purple-600', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
  
  return (
    <div className="mt-4">
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              // Calculate the start and end angles for the pie slice
              const startAngle = index > 0 
                ? data.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) * 3.6 
                : 0;
              const endAngle = startAngle + item.percentage * 3.6;
              
              // Convert angles to radians
              const startRad = (startAngle - 90) * Math.PI / 180;
              const endRad = (endAngle - 90) * Math.PI / 180;
              
              // Calculate the SVG arc path
              const x1 = 50 + 40 * Math.cos(startRad);
              const y1 = 50 + 40 * Math.sin(startRad);
              const x2 = 50 + 40 * Math.cos(endRad);
              const y2 = 50 + 40 * Math.sin(endRad);
              
              // Determine if the arc should be drawn as a large arc
              const largeArcFlag = item.percentage > 50 ? 1 : 0;
              
              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={`var(--${colors[index % colors.length].replace('bg-', '')})`}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="white" />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${colors[index % colors.length]}`}></div>
            <div className="text-xs">
              <div className="font-medium">{item.category}</div>
              <div className="text-gray-500">${item.amount.toFixed(2)} ({item.percentage}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EarningsHistoryPage() {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [dateRange, setDateRange] = useState('year');
  
  const years = Object.keys(earningsData.yearlyData);
  const currentYearData = earningsData.yearlyData[selectedYear];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/profile/transactions" className="mr-4">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Earnings History</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filters and Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative">
            <button 
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center gap-2"
              onClick={() => setShowYearDropdown(!showYearDropdown)}
            >
              {selectedYear}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showYearDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full">
                {years.map(year => (
                  <button
                    key={year}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setSelectedYear(year);
                      setShowYearDropdown(false);
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-300 rounded-lg p-1 flex">
              <button 
                className={`px-3 py-1 text-xs rounded-md ${dateRange === 'year' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
                onClick={() => setDateRange('year')}
              >
                Year
              </button>
              <button 
                className={`px-3 py-1 text-xs rounded-md ${dateRange === 'quarter' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
                onClick={() => setDateRange('quarter')}
              >
                Quarter
              </button>
              <button 
                className={`px-3 py-1 text-xs rounded-md ${dateRange === 'month' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
                onClick={() => setDateRange('month')}
              >
                Month
              </button>
            </div>
            
            <button className="bg-white border border-gray-300 rounded-lg p-2">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Total Earnings</p>
            <p className="text-lg font-bold text-gray-900">${currentYearData.totalEarnings.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Total Sales</p>
            <p className="text-lg font-bold text-gray-900">${currentYearData.totalSales.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Total Withdrawals</p>
            <p className="text-lg font-bold text-gray-900">${currentYearData.totalWithdrawals.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Platform Fees</p>
            <p className="text-lg font-bold text-gray-900">${currentYearData.platformFees.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Net Earnings</p>
            <p className="text-lg font-bold text-green-600">${currentYearData.netEarnings.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Monthly Earnings Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900">Monthly Earnings</h2>
            <p className="text-sm text-gray-500">Earnings trend for {selectedYear}</p>
            <EarningsChart data={currentYearData.monthlySummary} />
          </div>
          
          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900">Sales by Category</h2>
            <p className="text-sm text-gray-500">Distribution of sales across categories</p>
            <CategoryPieChart data={earningsData.categorySummary} />
          </div>
        </div>
        
        {/* Detailed Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Transaction Details</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Transaction</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Order ID</th>
                  <th className="py-3 px-4 text-right font-medium text-gray-500">Amount</th>
                  <th className="py-3 px-4 text-right font-medium text-gray-500">Fee</th>
                  <th className="py-3 px-4 text-right font-medium text-gray-500">Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 text-gray-800">Jul 15, 2023</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Sale</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">ORD12345678</td>
                  <td className="py-3 px-4 text-right font-medium">$450.00</td>
                  <td className="py-3 px-4 text-right text-red-600">-$22.50</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">$427.50</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800">Jul 10, 2023</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Sale</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">ORD87654321</td>
                  <td className="py-3 px-4 text-right font-medium">$299.99</td>
                  <td className="py-3 px-4 text-right text-red-600">-$15.00</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">$284.99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800">Jun 28, 2023</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Withdrawal</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">TRX43218765</td>
                  <td className="py-3 px-4 text-right font-medium">$1,000.00</td>
                  <td className="py-3 px-4 text-right">$0.00</td>
                  <td className="py-3 px-4 text-right font-medium text-blue-600">-$1,000.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800">Jun 20, 2023</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Sale</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">ORD98765432</td>
                  <td className="py-3 px-4 text-right font-medium">$1,250.50</td>
                  <td className="py-3 px-4 text-right text-red-600">-$62.53</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">$1,187.97</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">10</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Tax Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tax Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Annual Income ({selectedYear})</p>
              <p className="text-xl font-bold text-gray-900">${currentYearData.netEarnings.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">After platform fees</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">Tax Documents</p>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
                <div>
                  <p className="text-sm font-medium">2023 Annual Statement</p>
                  <p className="text-xs text-gray-500">Available January 31, 2024</p>
                </div>
                <button className="text-purple-600 hover:text-purple-700" disabled>
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium">2022 Annual Statement</p>
                  <p className="text-xs text-gray-500">Available for download</p>
                </div>
                <button className="text-purple-600 hover:text-purple-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 