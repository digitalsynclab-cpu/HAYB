/**
 * Şablon (demo site) ortak tipleri. Yeni nesil şablonlar (WEB 09 ve sonrası) "site" tanımıyla çizilir:
 * tema + üstbilgi + blok listesi + altbilgi. Bloklar components/templates/v2 içinde çizilir.
 */

/** Şablonun kullanılabileceği en düşük web sitesi paketi (Starter pakette hazır tasarım kullanılmaz). */
export type MinimumPackage = 'business' | 'professional' | 'premium';

/** /template sayfasındaki sektör filtresi. */
export type TemplateCategory =
  | 'Kafe ve Gıda'
  | 'E-ticaret'
  | 'Sağlık'
  | 'Güzellik ve Bakım'
  | 'Hukuk'
  | 'Otel ve Turizm'
  | 'Otomotiv'
  | 'Moda'
  | 'İnşaat ve Mimarlık'
  | 'Spor ve Yaşam'
  | 'Emlak'
  | 'Ajans';

export interface TemplateMeta {
  slug: string;
  /**
   * Kalıcı HAYB şablon kodu (WEB 01, WEB 02 …). /template/webN adresiyle eşleşir.
   * Bir şablon silinse bile kodlar yeniden numaralandırılmaz; yeni şablon bir sonraki numarayı alır.
   */
  code: string;
  minimumPackage: MinimumPackage;
  brand: string;
  sector: string;
  category: TemplateCategory;
  /** Galeri kartı ve meta açıklaması */
  summary: string;
  features: string[];
}

/* ───────────── Yeni nesil şablon motoru ───────────── */

export type V2Font = 'cormorant' | 'instrument' | 'playfair' | 'manrope' | 'archivo' | 'barlow' | 'inter' | 'caveat';
export type V2Tone = 'light' | 'soft' | 'dark' | 'accent' | 'paper';

export type V2Icon =
  | 'calendar' | 'smile' | 'shield' | 'stethoscope' | 'heart' | 'sparkles' | 'leaf' | 'waves' | 'utensils' | 'wine' | 'bed'
  | 'car' | 'wrench' | 'zap' | 'gauge' | 'snowflake' | 'shirt' | 'gem' | 'recycle' | 'truck' | 'dumbbell' | 'flame' | 'timer'
  | 'users' | 'activity' | 'droplets' | 'sun' | 'pin' | 'phone' | 'mail' | 'key' | 'scale' | 'landmark' | 'building' | 'hammer'
  | 'ruler' | 'home' | 'trees' | 'compass' | 'camera' | 'award' | 'clock' | 'check' | 'star' | 'wind' | 'flower' | 'sofa' | 'bath'
  | 'briefcase' | 'factory' | 'route' | 'bag' | 'music' | 'ship' | 'palette' | 'microscope' | 'hand' | 'infinity' | 'mountain'
  | 'file' | 'globe';

export interface V2Theme {
  bg: string;
  ink: string;
  accent: string;
  accentInk: string;
  /** Yumuşak yüzey (soft ton) */
  surface: string;
  dark: string;
  darkInk: string;
  /** Koyu temada açık renkli bant (paper ton) */
  paper?: string;
  paperInk?: string;
  heading: V2Font;
  body: V2Font;
  /** El yazısı vurgu (isteğe bağlı) */
  script?: V2Font;
  headingWeight: number;
  /** ör. "-0.02em" */
  headingTracking: string;
  headingCase?: 'none' | 'uppercase';
  headingLeading?: number;
  radius: 'sharp' | 'soft' | 'round' | 'pill';
}

export interface V2Cta {
  label: string;
  /** Sayfa içi blok kimliği */
  to?: string;
  /** Tanıtım filmi düğmesi (demoda bilgi mesajı gösterir) */
  play?: boolean;
}

export interface V2Head {
  kicker?: string;
  title: string[];
  italic?: number[];
  text?: string;
  cta?: V2Cta;
}

export interface V2Logo {
  text: string;
  sub?: string;
  /** Marka işareti biçimi */
  mark?: 'ring' | 'square' | 'dot' | 'slash' | 'bars' | 'none';
  /** İşaret içindeki harf */
  letter?: string;
}

export interface V2Header {
  style: 'overlay' | 'solid';
  tone: 'light' | 'dark';
  links: { label: string; to: string }[];
  cta: V2Cta;
  phone?: string;
  extras?: ('search' | 'cart' | 'heart' | 'lang')[];
}

export interface V2Footer {
  tone: 'dark' | 'light';
  blurb: string;
  quote?: string;
  links: { label: string; to?: string }[];
  social?: ('instagram' | 'youtube' | 'pinterest' | 'linkedin' | 'x' | 'facebook')[];
  newsletter?: string;
  contact?: string[];
}

interface Base {
  id?: string;
  tone?: V2Tone;
}

export interface Metric {
  v: string;
  l: string;
}

export interface BookField {
  id: string;
  label: string;
  kind: 'select' | 'date' | 'text' | 'guests';
  options?: string[];
  value?: string;
  placeholder?: string;
}

export interface BookingBlock extends Base {
  type: 'booking';
  layout: 'bar' | 'card' | 'stepper' | 'car';
  title?: string;
  kicker?: string;
  text?: string;
  tabs?: string[];
  fields: BookField[];
  /** stepper: her adımın alanları (fields yerine) */
  steps?: { label: string; fields: BookField[] }[];
  submit: string;
  note?: string;
  /** Sonuç mesajı (demo) */
  done?: string;
  car?: { image: string; models: Record<string, string[]>; results: Record<string, string[]> };
}

export interface HeroBlock extends Base {
  type: 'hero';
  variant: 'split' | 'full' | 'poster' | 'arch';
  image: string;
  alt: string;
  /** object-position */
  focus?: string;
  kicker?: string;
  lines: string[];
  italic?: number[];
  accent?: number[];
  text: string;
  primary: V2Cta;
  secondary?: V2Cta;
  metrics?: Metric[];
  note?: string[];
  steps?: { n: string; t: string }[];
  panel?: BookingBlock;
  badge?: { title: string; text: string };
  marquee?: string[];
  coords?: string;
  script?: string;
}

export interface StripItem {
  icon?: V2Icon;
  n?: string;
  title: string;
  text?: string;
  image?: string;
  to?: string;
}

export interface StripBlock extends Base {
  type: 'strip';
  layout: 'numbered' | 'icons' | 'thumbs' | 'ticker';
  items: StripItem[];
}

export interface CardItem {
  image: string;
  title: string;
  text?: string;
  sub?: string;
  n?: string;
  tag?: string;
  meta?: string[];
  to?: string;
  date?: { d: string; m: string };
  icon?: V2Icon;
  /** Kartın görselinde nesne konumu */
  focus?: string;
}

export interface CardsBlock extends Base {
  type: 'cards';
  layout: 'overlay' | 'poster' | 'caption' | 'feature' | 'events' | 'wide';
  head?: V2Head;
  items: CardItem[];
  arrows?: boolean;
  bgImage?: string;
  /** Kart başına kısa sütun sayısı (masaüstü) */
  cols?: 2 | 3 | 4 | 5;
}

export interface Profile {
  name: string;
  role: string;
  text: string;
  image: string;
  creds?: { icon: V2Icon; t: string }[];
  kpis?: Metric[];
  signature?: string;
}

export interface SplitBlock extends Base {
  type: 'split';
  flip?: boolean;
  media: {
    image: string;
    alt: string;
    focus?: string;
    badge?: Metric;
    play?: string;
    aspect?: 'portrait' | 'landscape' | 'square';
    frame?: 'plain' | 'arch' | 'oval';
    stack?: string[];
    compare?: { before: string; after: string; labels: [string, string]; note: string };
  };
  content: {
    kicker?: string;
    title: string[];
    italic?: number[];
    text?: string;
    list?: { icon?: V2Icon; t: string; x?: string }[];
    facts?: [string, string][];
    kpis?: Metric[];
    steps?: { n: string; t: string; x?: string }[];
    profiles?: Profile[];
    cta?: V2Cta;
    quote?: string;
  };
}

export interface ShowcaseItem {
  title: string;
  image: string;
  text: string;
  facts?: [string, string][];
  n?: string;
  cta: V2Cta;
  focus?: string;
}

export interface ShowcaseBlock extends Base {
  type: 'showcase';
  layout: 'rooms' | 'projects' | 'list';
  head?: V2Head;
  items: ShowcaseItem[];
  side?: { image: string; alt: string; text: string[] };
}

export interface StatsBlock extends Base {
  type: 'stats';
  image?: string;
  kicker?: string;
  title?: string[];
  quote?: string;
  items: Metric[];
}

export interface ScheduleClass {
  time: string;
  name: string;
  coach: string;
  spots: number;
}

export interface ScheduleBlock extends Base {
  type: 'schedule';
  head: V2Head;
  days: { label: string; date: string; classes: ScheduleClass[] }[];
  image: string;
  imageAlt: string;
  imageLabel: string;
}

export interface PricingBlock extends Base {
  type: 'pricing';
  head: V2Head;
  plans: { name: string; tag?: string; price: string; per: string; note: string; features: string[]; featured?: boolean }[];
}

export interface Product {
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  tag?: string;
}

export interface ShopBlock extends Base {
  type: 'shop';
  layout: 'sidebar' | 'carousel';
  head: V2Head;
  categories: string[];
  sizes: string[];
  maxPrice: number;
  products: Product[];
}

export interface QuotesBlock extends Base {
  type: 'quotes';
  head: V2Head;
  items: { text: string; name: string }[];
  note: string;
}

export interface JournalItem {
  title: string;
  date: string;
  tag?: string;
  image?: string;
}

export interface JournalBlock extends Base {
  type: 'journal';
  layout: 'cards' | 'panel';
  head: V2Head;
  image?: string;
  items: JournalItem[];
}

export interface CountdownBlock extends Base {
  type: 'countdown';
  kicker: string;
  title: string[];
  text: string;
  cta: V2Cta;
  image: string;
  alt: string;
  days: number;
}

export interface GalleryBlock extends Base {
  type: 'gallery';
  head: V2Head;
  items: { image: string; alt: string; play?: boolean }[];
}

export interface CtaBlock extends Base {
  type: 'cta';
  layout: 'banner' | 'contact' | 'newsletter' | 'features';
  kicker?: string;
  title: string[];
  italic?: number[];
  text?: string;
  primary?: V2Cta;
  image?: string;
  features?: { icon: V2Icon; t: string; x: string }[];
  /** contact: form alanları ve yan bilgi */
  projectTypes?: string[];
  typeLabel?: string;
  info?: string[];
  metrics?: Metric[];
}

export interface MarqueeBlock extends Base {
  type: 'marquee';
  words: string[];
}

export type V2Block =
  | HeroBlock
  | BookingBlock
  | StripBlock
  | CardsBlock
  | SplitBlock
  | ShowcaseBlock
  | StatsBlock
  | ScheduleBlock
  | PricingBlock
  | ShopBlock
  | QuotesBlock
  | JournalBlock
  | CountdownBlock
  | GalleryBlock
  | CtaBlock
  | MarqueeBlock;

export interface V2Site {
  theme: V2Theme;
  logo: V2Logo;
  header: V2Header;
  blocks: V2Block[];
  footer: V2Footer;
}

export interface TemplateV2Def extends TemplateMeta {
  site: V2Site;
}
