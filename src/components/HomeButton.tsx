import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HomeButton() {
	  return (
	<Button asChild className="mb-3">
		<Link href="/">
		<HomeIcon />
		</Link>
	</Button >
  );
}