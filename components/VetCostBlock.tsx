interface CostItem {
  label:     string
  low:       number
  high:      number
  frequency: string
  note?:     string
}

interface VetCostBlockProps {
  title?:     string
  items?:     CostItem[]
  className?: string
}

const DEFAULT_ITEMS: CostItem[] = [
  { label: 'Initial wellness exam',        low: 45,  high: 100, frequency: 'Once',     note: 'Varies by clinic and location' },
  { label: 'Core vaccine series (puppy)',  low: 75,  high: 200, frequency: 'First year' },
  { label: 'Spay / neuter',               low: 200, high: 600, frequency: 'Once' },
  { label: 'Annual wellness exam',         low: 50,  high: 150, frequency: 'Per year' },
  { label: 'Heartworm prevention',         low: 60,  high: 120, frequency: 'Per year' },
  { label: 'Flea & tick prevention',       low: 80,  high: 200, frequency: 'Per year' },
]

export default function VetCostBlock({
  title     = 'Typical vet costs for new dog owners',
  items     = DEFAULT_ITEMS,
  className = '',
}: VetCostBlockProps) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <aside
      aria-label="Vet cost breakdown"
      className={`not-prose rounded-2xl border border-forest-200 bg-forest-50 p-6 md:p-8 my-8 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center text-lg">🩺</div>
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900 tracking-editorial-sm">{title}</h3>
          <p className="text-sm text-stone-500 mt-0.5">US averages — local costs vary. Always call ahead.</p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 md:-mx-8 px-6 md:px-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forest-200 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
              <th className="pb-2.5 pr-4">Service</th>
              <th className="pb-2.5 pr-4 text-right whitespace-nowrap">Est. Cost</th>
              <th className="pb-2.5 text-right">Frequency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-100">
            {items.map((item) => (
              <tr key={item.label} className="hover:bg-forest-50/80 transition-colors">
                <td className="py-3 pr-4 text-stone-700 font-medium">
                  {item.label}
                  {item.note && <span className="block text-xs text-stone-400 font-normal mt-0.5">{item.note}</span>}
                </td>
                <td className="py-3 pr-4 text-right text-stone-900 font-bold whitespace-nowrap">
                  {fmt(item.low)}–{fmt(item.high)}
                </td>
                <td className="py-3 text-right text-stone-500 whitespace-nowrap">{item.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-xs text-stone-400 border-t border-forest-200 pt-4">
        * US national averages (2024–2025). Emergency and specialist costs not included.{' '}
        <a href="/category/pet-insurance" className="underline hover:text-brand-600 transition-colors">
          Consider pet insurance →
        </a>
      </p>
    </aside>
  )
}
