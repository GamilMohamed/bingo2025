
import type React from "react"
import { BingoCell } from "./BingoCell"

export const BingoBoard: React.FC = () => {
  const cells = Array.from({ length: 25 }, (_, i) => <BingoCell key={i} index={i} />)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl font-bold text-center mb-4 text-[#9BC6B9]">BINGO</h1>
      <h2 className="text-3xl font-bold text-center mb-8 text-[#9BC6B9]">25 CHOSES À FAIRE EN 2025</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">{cells}</div>
    </div>
  )
}

