type Props = {
  label?: string
}

export default function DoubleDivider({ label = "OR" }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-full border border-divider" />
      <span className="text-foreground/50">{label}</span>
      <div className="w-full border border-divider" />
    </div>
  )
}
