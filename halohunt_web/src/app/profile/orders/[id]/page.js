"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, Package, Truck, CheckCircle, Clock, MapPin, Download, Copy, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Sample order data - in a real app, this would come from an API call
const ordersData = {
  "ORD12345678": {
    id: "ORD12345678",
    date: "June 15, 2023",
    total: 449.98,
    subtotal: 449.98,
    shipping: 0,
    tax: 0,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Nike Air Max 270",
        price: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        quantity: 1,
        color: "Black/White",
        size: "US 10"
      },
      {
        id: 2,
        name: "Wireless Noise Cancelling Headphones",
        price: 299.98,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        quantity: 1,
        color: "Silver",
        size: "One Size"
      }
    ],
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    timeline: [
      { status: "ordered", date: "June 15, 2023, 10:30 AM", description: "Order placed" },
      { status: "processing", date: "June 16, 2023, 9:15 AM", description: "Order processed" },
      { status: "shipped", date: "June 17, 2023, 2:45 PM", description: "Order shipped" },
      { status: "delivered", date: "June 20, 2023, 11:20 AM", description: "Order delivered" }
    ],
    deliveredDate: "June 20, 2023"
  },
  "ORD87654321": {
    id: "ORD87654321",
    date: "May 28, 2023",
    total: 349.99,
    subtotal: 349.99,
    shipping: 0,
    tax: 0,
    status: "delivered",
    items: [
      {
        id: 3,
        name: "Premium Smart Watch",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        quantity: 1,
        color: "Space Gray",
        size: "44mm"
      }
    ],
    paymentMethod: "PayPal",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    timeline: [
      { status: "ordered", date: "May 28, 2023, 3:45 PM", description: "Order placed" },
      { status: "processing", date: "May 29, 2023, 10:20 AM", description: "Order processed" },
      { status: "shipped", date: "May 30, 2023, 1:15 PM", description: "Order shipped" },
      { status: "delivered", date: "June 2, 2023, 2:30 PM", description: "Order delivered" }
    ],
    deliveredDate: "June 2, 2023"
  },
  "ORD56781234": {
    id: "ORD56781234",
    date: "June 25, 2023",
    total: 129.99,
    subtotal: 129.99,
    shipping: 0,
    tax: 0,
    status: "processing",
    items: [
      {
        id: 4,
        name: "Bluetooth Portable Speaker",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        quantity: 1,
        color: "Black",
        size: "Standard"
      }
    ],
    paymentMethod: "Credit Card (ending in 1234)",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    timeline: [
      { status: "ordered", date: "June 25, 2023, 5:20 PM", description: "Order placed" },
      { status: "processing", date: "June 26, 2023, 9:45 AM", description: "Order processed" }
    ],
    estimatedDelivery: "July 2, 2023"
  },
  "ORD43218765": {
    id: "ORD43218765",
    date: "June 27, 2023",
    total: 599.98,
    subtotal: 599.98,
    shipping: 0,
    tax: 0,
    status: "shipped",
    items: [
      {
        id: 5,
        name: "Smartphone Flagship Model",
        price: 599.98,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9",
        quantity: 1,
        color: "Midnight Blue",
        size: "128GB"
      }
    ],
    paymentMethod: "Credit Card (ending in 5678)",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    timeline: [
      { status: "ordered", date: "June 27, 2023, 11:30 AM", description: "Order placed" },
      { status: "processing", date: "June 28, 2023, 8:15 AM", description: "Order processed" },
      { status: "shipped", date: "June 29, 2023, 3:45 PM", description: "Order shipped" }
    ],
    trackingNumber: "TRK987654321",
    carrier: "FedEx",
    trackingUrl: "https://www.fedex.com/tracking",
    estimatedDelivery: "July 5, 2023"
  }
};

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    ordered: {
      color: "bg-gray-100 text-gray-600",
      icon: Package
    },
    processing: {
      color: "bg-blue-100 text-blue-600",
      icon: Clock
    },
    shipped: {
      color: "bg-orange-100 text-orange-600",
      icon: Truck
    },
    delivered: {
      color: "bg-green-100 text-green-600",
      icon: CheckCircle
    },
    cancelled: {
      color: "bg-red-100 text-red-600",
      icon: Package
    }
  };

  const config = statusConfig[status] || statusConfig.processing;
  const StatusIcon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${config.color}`}>
      <StatusIcon className="w-3.5 h-3.5" />
      <span className="text-xs font-medium capitalize">{status}</span>
    </div>
  );
};

const OrderTimeline = ({ timeline, status }) => {
  return (
    <div className="space-y-4">
      {timeline.map((event, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === timeline.length - 1 ? 'bg-purple-100' : 'bg-green-100'
            }`}>
              {index === 0 && <Package className={`w-4 h-4 ${index === timeline.length - 1 ? 'text-purple-600' : 'text-green-600'}`} />}
              {index === 1 && <Clock className={`w-4 h-4 ${index === timeline.length - 1 ? 'text-purple-600' : 'text-green-600'}`} />}
              {index === 2 && <Truck className={`w-4 h-4 ${index === timeline.length - 1 ? 'text-purple-600' : 'text-green-600'}`} />}
              {index === 3 && <CheckCircle className={`w-4 h-4 ${index === timeline.length - 1 ? 'text-purple-600' : 'text-green-600'}`} />}
            </div>
            {index < timeline.length - 1 && (
              <div className="w-0.5 bg-green-100 h-full"></div>
            )}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium text-gray-900">{event.description}</p>
            <p className="text-xs text-gray-500">{event.date}</p>
          </div>
        </div>
      ))}
      
      {status === "shipped" && (
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
              <CheckCircle className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Delivery pending</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulate fetching order data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setOrder(ordersData[orderId] || null);
      setLoading(false);
    }, 300);
  }, [orderId]);

  const handleCopyTrackingNumber = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate PDF directly using jsPDF
  const handleDownloadInvoice = () => {
    if (order) {
      try {
        setIsDownloading(true);
        
        // Create new PDF document
        const doc = new jsPDF();
        
        // Set document properties
        doc.setProperties({
          title: `Invoice ${order.id}`,
          subject: 'Order Invoice',
          author: 'HaloHunt',
          creator: 'HaloHunt'
        });
        
        // Add logo/header
        doc.setFontSize(20);
        doc.setTextColor(147, 51, 234); // Purple color
        doc.text('HaloHunt', 20, 20);
        
        // Invoice title
        doc.setFontSize(16);
        doc.setTextColor(147, 51, 234);
        doc.text('INVOICE', 190, 20, { align: 'right' });
        
        // Company details
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('123 Commerce Street', 20, 30);
        doc.text('Tech City, TC 12345', 20, 35);
        doc.text('United States', 20, 40);
        
        // Invoice details
        const invoiceNumber = `INV-${order.id.substring(3)}`;
        const invoiceDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        doc.setFontSize(10);
        doc.text(`Invoice #: ${invoiceNumber}`, 190, 30, { align: 'right' });
        doc.text(`Order #: ${order.id}`, 190, 35, { align: 'right' });
        doc.text(`Date: ${invoiceDate}`, 190, 40, { align: 'right' });
        doc.text(`Payment: ${order.paymentMethod}`, 190, 45, { align: 'right' });
        
        // Billing address
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('Bill To:', 20, 55);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(order.shippingAddress.name, 20, 62);
        doc.text(order.shippingAddress.line1, 20, 67);
        if (order.shippingAddress.line2) {
          doc.text(order.shippingAddress.line2, 20, 72);
          doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`, 20, 77);
          doc.text(order.shippingAddress.country, 20, 82);
        } else {
          doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`, 20, 72);
          doc.text(order.shippingAddress.country, 20, 77);
        }
        
        // Items table
        const startY = order.shippingAddress.line2 ? 90 : 85;
        
        // Prepare table data
        const tableColumn = ["#", "Description", "Qty", "Unit Price", "Amount"];
        const tableRows = [];
        
        // Add items to table
        order.items.forEach((item, index) => {
          const itemData = [
            (index + 1).toString(),
            `${item.name} (${item.color}, ${item.size})`,
            item.quantity.toString(),
            `$${item.price.toFixed(2)}`,
            `$${(item.price * item.quantity).toFixed(2)}`
          ];
          tableRows.push(itemData);
        });
        
        // Generate the table
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: startY,
          theme: 'grid',
          styles: {
            fontSize: 9,
            cellPadding: 3
          },
          headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [248, 248, 248]
          }
        });
        
        // Get the final y position after the table
        const finalY = (doc.lastAutoTable || {}).finalY || (startY + 50);
        
        // Summary table (subtotal, shipping, tax, total)
        const summaryData = [
          ["Subtotal:", `$${order.subtotal.toFixed(2)}`],
          ["Shipping:", order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`]
        ];
        
        if (order.tax > 0) {
          summaryData.push(["Tax:", `$${order.tax.toFixed(2)}`]);
        }
        
        autoTable(doc, {
          body: summaryData,
          startY: finalY + 10,
          theme: 'plain',
          styles: {
            fontSize: 10
          },
          columnStyles: {
            0: {
              cellWidth: 130,
              halign: 'right',
              fontStyle: 'bold'
            },
            1: {
              cellWidth: 30,
              halign: 'right'
            }
          }
        });
        
        // Total row
        const totalY = (doc.lastAutoTable || {}).finalY || (finalY + 30);
        
        autoTable(doc, {
          body: [["Total:", `$${order.total.toFixed(2)}`]],
          startY: totalY + 1,
          theme: 'plain',
          styles: {
            fontSize: 11,
            fontStyle: 'bold'
          },
          columnStyles: {
            0: {
              cellWidth: 130,
              halign: 'right'
            },
            1: {
              cellWidth: 30,
              halign: 'right'
            }
          }
        });
        
        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text('Thank you for shopping with HaloHunt!', 105, pageHeight - 30, { align: 'center' });
        doc.text('If you have any questions about this invoice, please contact our customer support at support@halohunt.com', 105, pageHeight - 25, { align: 'center' });
        
        // Save the PDF
        doc.save(`${invoiceNumber}.pdf`);
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating your invoice. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4">
            <div className="py-4 flex items-center">
              <Link href="/profile/orders" className="mr-4">
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order not found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the order you're looking for.</p>
          <Link 
            href="/profile/orders" 
            className="inline-flex items-center px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/profile/orders" className="mr-4">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{order.id}</h2>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
          
          {/* Tracking Information (if shipped) */}
          {order.status === 'shipped' && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Your order is on the way</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Estimated delivery: {order.estimatedDelivery}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs bg-white rounded-md px-2 py-1 border border-gray-200 flex items-center gap-1">
                      <span className="font-medium">{order.trackingNumber}</span>
                      <button onClick={handleCopyTrackingNumber} className="text-purple-600 hover:text-purple-700">
                        {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <a 
                      href={order.trackingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-white rounded-md px-2 py-1 border border-gray-200 text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      Track Package
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Order Timeline */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Order Progress</h3>
            <OrderTimeline timeline={order.timeline} status={order.status} />
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Items in your order</h3>
          <div className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-purple-600">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                {order.status === 'delivered' && (
                  <div className="flex-shrink-0">
                    <button className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors">
                      Buy Again
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary and Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-medium text-gray-900">Shipping Address</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-sm">
              <p className="text-gray-500">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
          <button 
            className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium ${
              isDownloading ? 'bg-gray-100 text-gray-400' : 'text-gray-700 hover:bg-gray-50'
            } transition-colors`}
            onClick={handleDownloadInvoice}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Invoice PDF
              </>
            )}
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            Share Order Details
          </button>
          {order?.status !== 'delivered' && order?.status !== 'cancelled' && (
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 