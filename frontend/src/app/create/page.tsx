import Link from "next/link";
import { CommitmentForm } from "@/components/commitment-form";

export default function CreatePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">Create commitment</p>
          <h1 className="text-4xl font-semibold text-white">Put skin in the game</h1>
        </div>
        <Link href="/" className="text-sm text-neutral-300 underline-offset-4 hover:underline">
          Back home
        </Link>
      </div>
      <CommitmentForm />
    </main>
  );
}
