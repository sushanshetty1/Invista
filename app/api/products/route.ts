import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/actions/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    
    const result = await getProducts({ 
      page,
      limit,
      search,
      sortBy: 'name',
      sortOrder: 'asc'
    });
      if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    // result.data contains { products, pagination }
    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
