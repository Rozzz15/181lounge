import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobs } from '@/db/schema';

export async function GET() {
  try {
    const allJobs = await db.select().from(jobs);
    return NextResponse.json(allJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, location, type, description, requirements, status } = body;

    const newJob = await db.insert(jobs).values({
      title,
      department,
      location,
      type,
      description,
      requirements,
      status: status ?? 'active',
    }).returning();

    return NextResponse.json(newJob[0], { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
