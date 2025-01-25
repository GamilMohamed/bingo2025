import { notFound } from 'next/navigation'
import { getShareById } from '@/lib/prismashare'
import { SharedCell } from '@/components/SharedCell';

export default async function SharePage({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string[]
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>;
}) {
  const {
    slug
  } = await params;
  const sp = await searchParams;
  console.log(slug);
  console.log(sp);
  const cells = await getShareById(slug as unknown as string);

  if (!cells) {
    notFound()
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Le bingo de qqun d;autre</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">

        {cells.map((cell) => (
          <SharedCell key={cell.id} id={cell.id} cell={cell} />
        ))}
      </div>
    </div>
  )
}