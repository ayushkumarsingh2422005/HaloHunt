import { NextRequest, NextResponse } from 'next/server';
import { BrevoService, ContactData } from '@/app/lib/brevo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phoneNumber } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData: ContactData = {
      email: email.toLowerCase().trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      phoneNumber: phoneNumber?.trim()
    };

    // Subscribe to early access list
    const result = await BrevoService.subscribeToEarlyAccess(contactData);

    if (result.success) {
      const isExistingContact = 'isExistingContact' in result ? result.isExistingContact : false;
      
      return NextResponse.json({
        success: true,
        message: isExistingContact 
          ? 'You\'re already subscribed! Welcome back to HaloHunt! 🎉' 
          : 'Successfully subscribed to early access list!',
        isExistingContact,
        data: {
          contact: 'contact' in result ? result.contact : undefined,
          list: 'list' in result ? result.list : undefined,
          email: 'email' in result ? result.email : undefined
        }
      });
    } else {
      console.error('Subscription failed:', 'error' in result ? result.error : 'Unknown error');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to subscribe. Please try again later.',
          details: 'error' in result ? result.error : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 