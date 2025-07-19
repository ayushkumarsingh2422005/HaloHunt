"use client";
import { useState } from 'react';
import { ChevronLeft, Search, Filter, ArrowDownLeft, ArrowUpRight, Download, CreditCard, AlertCircle, CheckCircle, Clock, ChevronDown, ChevronRight, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';

// Sample transaction data
const transactionData = {
  balance: 4250.75,
  pendingBalance: 750.25,
  totalEarnings: 15750.50,
  transactions: [
    {
      id: "TRX12345678",
      date: "July 15, 2023",
      amount: 450.00,
      type: "sale",
      status: "completed",
      description: "Order #ORD12345678",
      customer: "John Doe",
      product: "Nike Air Max 270",
      fee: 22.50
    },
    {
      id: "TRX87654321",
      date: "July 10, 2023",
      amount: 299.99,
      type: "sale",
      status: "completed",
      description: "Order #ORD87654321",
      customer: "Sarah Johnson",
      product: "Premium Smart Watch",
      fee: 15.00
    },
    {
      id: "TRX56781234",
      date: "July 5, 2023",
      amount: 750.25,
      type: "sale",
      status: "pending",
      description: "Order #ORD56781234",
      customer: "Michael Brown",
      product: "Smartphone Flagship Model",
      fee: 37.51
    },
    {
      id: "TRX43218765",
      date: "June 28, 2023",
      amount: 1000.00,
      type: "withdrawal",
      status: "completed",
      description: "Bank Transfer",
      paymentMethod: "Bank Account (ending in 4321)",
      processingTime: "2-3 business days"
    },
    {
      id: "TRX98765432",
      date: "June 20, 2023",
      amount: 1250.50,
      type: "sale",
      status: "completed",
      description: "Order #ORD98765432",
      customer: "Emily Wilson",
      product: "Professional Camera Set",
      fee: 62.53
    },
    {
      id: "TRX23456789",
      date: "June 15, 2023",
      amount: 500.00,
      type: "withdrawal",
      status: "completed",
      description: "PayPal Transfer",
      paymentMethod: "PayPal (user@example.com)",
      processingTime: "Instant"
    },
    {
      id: "TRX34567890",
      date: "June 10, 2023",
      amount: 199.99,
      type: "sale",
      status: "completed",
      description: "Order #ORD34567890",
      customer: "David Miller",
      product: "Wireless Earbuds Pro",
      fee: 10.00
    },
    {
      id: "TRX45678901",
      date: "June 5, 2023",
      amount: 2500.00,
      type: "withdrawal",
      status: "failed",
      description: "Bank Transfer",
      paymentMethod: "Bank Account (ending in 4321)",
      failureReason: "Insufficient account verification"
    }
  ],
  withdrawalMethods: [
    {
      id: 1,
      type: "bank",
      name: "Bank Account",
      accountNumber: "****4321",
      bankName: "Chase Bank",
      isDefault: true
    },
    {
      id: 2,
      type: "paypal",
      name: "PayPal",
      email: "user@example.com",
      isDefault: false
    }
  ]
};

const TransactionStatusBadge = ({ status }) => {
  const statusConfig = {
    completed: {
      color: "bg-green-100 text-green-600",
      icon: CheckCircle
    },
    pending: {
      color: "bg-blue-100 text-blue-600",
      icon: Clock
    },
    failed: {
      color: "bg-red-100 text-red-600",
      icon: AlertCircle
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${config.color}`}>
      <StatusIcon className="w-3.5 h-3.5" />
      <span className="text-xs font-medium capitalize">{status}</span>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  const [expanded, setExpanded] = useState(false);
  
  const isSale = transaction.type === 'sale';
  const isWithdrawal = transaction.type === 'withdrawal';
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isSale ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {isSale ? (
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {isSale ? 'Sale' : 'Withdrawal'}
              </h3>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`font-medium ${isSale ? 'text-green-600' : 'text-blue-600'}`}>
                {isSale ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              <TransactionStatusBadge status={transaction.status} />
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} 
            />
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
              <p className="text-sm font-medium">{transaction.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <p className="text-sm font-medium">{transaction.description}</p>
            </div>
            
            {isSale && (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="text-sm font-medium">{transaction.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Product</p>
                  <p className="text-sm font-medium">{transaction.product}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Platform Fee</p>
                  <p className="text-sm font-medium text-gray-600">-${transaction.fee.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Net Amount</p>
                  <p className="text-sm font-medium text-green-600">+${(transaction.amount - transaction.fee).toFixed(2)}</p>
                </div>
              </>
            )}
            
            {isWithdrawal && (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                  <p className="text-sm font-medium">{transaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Processing Time</p>
                  <p className="text-sm font-medium">{transaction.processingTime || 'N/A'}</p>
                </div>
                {transaction.status === 'failed' && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Failure Reason</p>
                    <p className="text-sm font-medium text-red-600">{transaction.failureReason}</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700">
              <Download className="w-3.5 h-3.5" />
              Download Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const WithdrawalModal = ({ isOpen, onClose, withdrawalMethods, availableBalance }) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      // In a real app, you would handle the withdrawal API call here
      alert(`Withdrawal of $${amount} initiated successfully!`);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Withdraw Funds</h2>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-xl font-bold text-gray-900">${availableBalance.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Withdraw
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  max={availableBalance}
                  step="0.01"
                  required
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              {parseFloat(amount) > availableBalance && (
                <p className="text-xs text-red-600 mt-1">
                  Amount exceeds available balance
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="space-y-2">
                {withdrawalMethods.map((method) => (
                  <label 
                    key={method.id}
                    className={`block p-3 border rounded-lg cursor-pointer ${
                      selectedMethod === method.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={() => setSelectedMethod(method.id)}
                        className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{method.name}</p>
                            {method.type === 'bank' ? (
                              <p className="text-xs text-gray-500">{method.bankName} ({method.accountNumber})</p>
                            ) : (
                              <p className="text-xs text-gray-500">{method.email}</p>
                            )}
                          </div>
                          {method.isDefault && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button 
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 mt-2 flex items-center gap-1"
              >
                <span>Add New Payment Method</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!amount || parseFloat(amount) > availableBalance || isProcessing}
                className={`flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center ${
                  (!amount || parseFloat(amount) > availableBalance || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Withdraw Funds'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  
  // Filter transactions based on search and filters
  const filteredTransactions = transactionData.transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    // Simple date filtering (in a real app, use proper date comparison)
    let matchesDate = true;
    if (filterDateRange === 'last7days') {
      matchesDate = transaction.date.includes('July'); // Just for demo
    } else if (filterDateRange === 'last30days') {
      matchesDate = true; // All our demo data is within 30 days
    } else if (filterDateRange === 'last3months') {
      matchesDate = true; // All our demo data is within 3 months
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/profile" className="mr-4">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-gray-900">${transactionData.balance.toFixed(2)}</p>
            <button 
              onClick={() => setShowWithdrawalModal(true)}
              className="mt-3 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Withdraw Funds
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Pending Balance</p>
            <p className="text-2xl font-bold text-gray-900">${transactionData.pendingBalance.toFixed(2)}</p>
            <p className="mt-3 text-xs text-gray-500">Available after order completion</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">${transactionData.totalEarnings.toFixed(2)}</p>
            <Link 
              href="/profile/transactions/history" 
              className="mt-3 inline-block text-sm text-purple-600 hover:text-purple-700"
            >
              View Earnings Report
            </Link>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by ID or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="all">All Types</option>
                <option value="sale">Sales</option>
                <option value="withdrawal">Withdrawals</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date Range</label>
              <select
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="all">All Time</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last3months">Last 3 Months</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          
          {filterDateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-3 pr-8 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-3 pr-8 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Transaction History</h2>
          {filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map(transaction => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || filterType !== 'all' || filterStatus !== 'all' || filterDateRange !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "You don't have any transactions yet"}
              </p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{transactionData.transactions.length}</span> transactions
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        withdrawalMethods={transactionData.withdrawalMethods}
        availableBalance={transactionData.balance}
      />
    </div>
  );
}
