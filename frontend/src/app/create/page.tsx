import Link from 'next/link';
import { CommitmentForm } from '@/components/commitment-form';
import { Button } from '@/components/ui/button';

export default function CreatePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
      <div className="mb-10 flex items-center justify-between border-b border-neutral-900 pb-6">
        <div>
          <p className="text-sm text-neutral-500">Create commitment</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Define the outcome before you begin</h1>
        </div>
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
      </div>
      <CommitmentForm />
    </main>
  );
}
