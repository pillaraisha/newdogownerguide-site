interface YoutubeEmbedProps {
  /** YouTube video ID — the part after ?v= */
  videoId:    string
  title:      string
  /** Optional aspect ratio class — defaults to 16:9 */
  aspectClass?: string
  className?: string
}

/**
 * Lazy-loading YouTube embed that uses the privacy-enhanced nocookie domain.
 * Renders a facade (thumbnail + play button) initially to avoid
 * loading the heavy YouTube iframe on page load.
 */
export default function YoutubeEmbed({
  videoId,
  title,
  aspectClass = 'aspect-video',
  className   = '',
}: YoutubeEmbedProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  return (
    <figure className={`not-prose my-8 rounded-2xl overflow-hidden shadow-card ring-1 ring-neutral-100 ${className}`}>
      <div className={`relative w-full ${aspectClass} bg-stone-900`}>
        {/*
         * Facade approach: clicking replaces the thumbnail with the real iframe.
         * This avoids loading ~500 KB of YouTube scripts until the user opts in.
         * TODO: Convert to a Client Component with useState to implement the
         * click-to-load facade pattern interactively.
         */}
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <figcaption className="bg-stone-900 px-5 py-3 text-xs text-stone-400 text-center tracking-wide">
        {title}
      </figcaption>
    </figure>
  )
}
