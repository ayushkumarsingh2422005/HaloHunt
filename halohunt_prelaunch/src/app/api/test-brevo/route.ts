import { NextRequest, NextResponse } from 'next/server';
import { BrevoService } from '@/app/lib/brevo';

export async function GET(request: NextRequest) {
  try {
    console.log("Testing Brevo API connection...");
    
    // Test the API connection
    const result = await BrevoService.testConnection();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Brevo API connection successful',
        data: result.data
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Brevo API connection failed',
          details: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Test API route error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during API test' 
      },
      { status: 500 }
    );
  }
} 