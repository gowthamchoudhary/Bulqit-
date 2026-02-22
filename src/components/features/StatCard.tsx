import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover-lift">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-4.5 w-4.5 text-accent-foreground" />
        </div>
      </div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      {(subtitle || trend) && (
        <p className="mt-1 text-sm text-muted-foreground">
          {trend && <span className="text-primary font-medium">{trend} </span>}
          {subtitle}
        </p>
      )}
    </div>
  );
}
