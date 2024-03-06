import CalendarGrid from '@/components/calendar-grid';
import Header from '@/components/header';
import Legend from '@/components/legend';
import { db } from '@/db';

export default async function Home() {
  const entries = await db.entry.findMany({
    include: {
      mood: true
    }
  });
  const moods = await db.mood.findMany();

  return (
    <>
      <Header />
      <CalendarGrid entries={entries} moods={moods} />
      <Legend />
    </>
  );
}

export async function generateStaticParams() {
  const entries = await db.entry.findMany();

  return entries.map((entry) => {
    return {
      id: entry.id.toString()
    };
  });
}