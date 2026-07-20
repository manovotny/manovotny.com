type YouTubeProps = {
  caption?: string;
  id: string;
  title: string;
};

export function YouTube({ caption, id, title }: YouTubeProps) {
  return (
    <figure className="mb-6">
      <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-xs dark:border-neutral-700 dark:bg-neutral-800">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full rounded-md border border-neutral-200"
          loading="lazy"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
        />
      </div>
      {caption && caption.length > 0 && (
        <figcaption className="pt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
