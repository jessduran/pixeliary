import CalendarGrid from '@/components/calendar-grid';
import Legend from '@/components/legend';
import prisma from '@/db';

export default async function Home() {
  const entries = await prisma.entry.findMany({
    include: {
      mood: true
    }
  });
  const moods = await prisma.mood.findMany();

  console.log(entries);

  return (
    <>
      <Legend />
      <CalendarGrid entries={entries} moods={moods} />
    </>
  );
}