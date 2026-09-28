import {
  BarChart3, BrainCircuit, CalendarCheck, Cloud, Code2, Compass, CreditCard, Database, FileText, Globe, Headset,
  Infinity as InfinityIcon, LayoutDashboard, ListChecks, Lock, MapPin, MessageCircle, Monitor, MousePointerClick,
  PenTool, Plug, Puzzle, RefreshCw, Server, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Store, Target, TrendingUp,
  Trophy, UserPlus, Users, Zap, type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/data/icons';

const MAP: Record<IconName, LucideIcon> = {
  basari: Trophy,
  bulutcozumleri: Cloud,
  dijitalbuyume: TrendingUp,
  entegrasyon: Plug,
  entegrecozumler: Puzzle,
  eticaret: ShoppingBag,
  globaluyum: Globe,
  guvenlik: ShieldCheck,
  hedefodakli: Target,
  hizliperformans: Zap,
  icerikyonetimi: FileText,
  iletisim: MessageCircle,
  isletmeler: Store,
  kolaykullanim: MousePointerClick,
  konumveyerelisletmeler: MapPin,
  mobiluyumlu: Smartphone,
  musteriodakli: Users,
  odemesistemleri: CreditCard,
  ozelyazilim: Code2,
  projeyonetimi: ListChecks,
  randevusistemi: CalendarCheck,
  raporlama: BarChart3,
  sinirsiz: InfinityIcon,
  strateji: Compass,
  sunucualtyapisi: Server,
  surekligelisim: RefreshCw,
  tasarim: PenTool,
  teknikdestek: Headset,
  veriguvenligi: Lock,
  veriyonetimi: Database,
  websitesi: Monitor,
  yapayzeka: Sparkles,
  yapayzeka2: BrainCircuit,
  yenimusteri: UserPlus,
  yonetimpaneli: LayoutDashboard,
};

/**
 * Sade çizgi ikon: yuvarlatılmış kare zemin, ince beyaz çizgi. 3D ikonların yerine geçer.
 * size: kare zeminin kenarı (px). className ile responsive boyut verilebilir.
 */
export function LineIcon({ name, size = 48, className = '' }: { name: IconName; size?: number; className?: string }) {
  const Icon = MAP[name];
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderColor: 'color-mix(in srgb, currentColor 16%, transparent)',
        background: 'color-mix(in srgb, currentColor 5%, transparent)',
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-[26%] border ${className}`}
    >
      <Icon strokeWidth={1.6} style={{ width: size * 0.46, height: size * 0.46 }} />
    </span>
  );
}
