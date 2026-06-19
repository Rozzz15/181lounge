import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { stores } from '@/db/schema';

export async function GET() {
  try {
    const allStores = await db.select().from(stores);
    return NextResponse.json(allStores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { branchName, address, city, latitude, longitude, phone, hours, active } = body;

    const newStore = await db.insert(stores).values({
      branchName,
      address,
      city,
      latitude,
      longitude,
      phone,
      hours,
      active: active ?? true,
    }).returning();

    return NextResponse.json(newStore[0], { status: 201 });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json({ error: 'Failed to create store' }, { status: 500 });
  }
}
