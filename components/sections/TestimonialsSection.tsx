import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';

const testimonials = [
  {
    name: 'Mehmet A.',
    role: 'Girişimci',
    text: 'Fikirden canlı ürüne giden süreci inanılmaz yönetti. Tek tek her adımda bilgilendirdi, sonuç beklentimin çok üzerindeydi.',
    stars: 5,
    initials: 'MA',
    color: 'from-[#2563EB] to-[#1D4ED8]',
  },
  {
    name: 'Selin K.',
    role: 'Küçük İşletme Sahibi',
    text: 'Web sitemiz artık çok daha profesyonel ve hızlı. Hem tasarım hem teknik kalite açısından gerçekten fark yarattı.',
    stars: 5,
    initials: 'SK',
    color: 'from-[#7C3AED] to-[#6D28D9]',
  },
  {
    name: 'Burak T.',
    role: 'Startup Kurucusu',
    text: 'MVP\'yi çok kısa sürede tamamladık. Hangi teknoloji, hangi mimari, nasıl ölçeklenecek — her soruya net cevap verdi.',
    stars: 5,
    initials: 'BT',
    color: 'from-[#0891B2] to-[#0E7490]',
  },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper id="yorumlar" titleId="yorumlar-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="text-center mb-12">
          <h2 id="yorumlar-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
            Müşteriler Ne Diyor?
          </h2>
          <p className="text-[#8BA3C7] max-w-lg mx-auto">
            Birlikte çalıştığım kişilerin deneyimleri.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl border border-[#2563EB]/12 bg-[#0D1526] flex flex-col gap-4 hover:border-[#2563EB]/25 transition-colors duration-300"
            >
              {/* Yıldızlar */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Yorum */}
              <p className="text-[#8BA3C7] text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Kişi */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F0F6FF]">{t.name}</p>
                  <p className="text-xs text-[#8BA3C7]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}
