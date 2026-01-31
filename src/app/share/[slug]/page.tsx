import { notFound } from 'next/navigation'
import { getShareById } from '@/lib/prismashare'
import { SharedCell } from '@/components/SharedCell';
import SwitchTheme from '@/components/SwitchTheme';
import { BingoCell } from '@/types';
import HomeButton from '@/components/HomeButton';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';

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
  const share = await getShareById(slug as unknown as string);
  if (!share) {
    notFound();
  }
  const { cells, name, year } = share;

  if (!cells || !name) {
    notFound()
  }
  let username = name.split(" ")[0];
  username = username[0].toUpperCase() + username.slice(1);



  const title =
    "Le BINGO d" +
    ("aeiouy".includes(username[0].toLowerCase()) ? "'" : "e ") +
    username;

  return (
    <div className="container mx-auto px-4 py-8 z-1">
      <div className="bottom-5 z-50 right-5 fixed flex-col flex justify-center items-center">
        <HomeButton />
        <form method="post" action="/api/auth/signout">
          <Button type="submit">
            <LogOutIcon />
          </Button>
        </form>
      </div>
      <div className="p-6 text-center">
        <h1 
        className="text-6xl font-bold text-center mb-4 text-primary">
          {title}
        </h1>
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-3xl font-bold text-center text-primary">
            SES {cells.length} CHOSES À FAIRE EN {year}
          </h2>
          <SwitchTheme />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">

          {cells.map((cell: BingoCell & { id: number }) => (
            <SharedCell key={cell.id} id={cell.id} cell={cell} />
          ))}
        </div>
      </div>
    </div>
  )
}