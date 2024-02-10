import CalendarGrid from '@/components/calendar-grid';
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
      <Legend />
      <CalendarGrid entries={entries} moods={moods} />
    </>
  );
}