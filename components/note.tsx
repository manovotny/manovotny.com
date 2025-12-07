import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-100 p-4 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
      <InformationCircleIcon className="size-5 shrink-0 stroke-neutral-700 dark:stroke-neutral-300" />
      {children}
    </div>
  );
}
