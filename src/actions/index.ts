'use server'

import prisma from '@/db';
import { revalidatePath } from 'next/cache';

export async function addEntry(
  formState: { message: string },
  date: string,
  mood: number
) {
  try {

    if (typeof date !== 'string' || typeof mood != 'number') {
      return {
        message: 'Sorry, invalid inputs'
      };
    }
  
    const entry = await prisma.entry.create({
      data: {
        date,
        moodId: mood,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) 
      return { message: error.message }
    else {
      return { message: 'Sorry, something went wrong.' }
    }
  }

  revalidatePath('/');
}
