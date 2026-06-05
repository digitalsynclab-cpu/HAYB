import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';

const skills = ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI/LLM', 'UI/UX Tasarım', 'Figma', 'Sosyal Medya', 'SEO', 'DevOps'];

export function AboutSection() {
  return (
    <SectionWrapper id="hakkimda" titleId="hakkimda-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="max-w-2xl">
          <h2 id="hakkimda-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-6">
            Problem Çözmeye Odaklı Yazılım Geliştirici
          </h2>
          <div className="space-y-4 text-[#8BA3C7] leading-relaxed text-lg">
            <p>
              Sadece web sitesi geliştirmiyorum. İşletmeler ve girişimler için dijital ürünler tasarlıyor,
              geliştiriyor ve büyütüyorum. Her projeyi bir büyüme sistemi olarak ele alıyorum.
            </p>
            <p>
              Fikir analizinden yayınlamaya kadar tüm süreci yönetiyorum. Sosyal medya yönetiminden
              özel yazılım geliştirmeye, yapay zeka entegrasyonundan UI/UX tasarımına geniş bir yelpazede hizmet sunuyorum.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#2563EB]/20 bg-[#2563EB]/[0.06] text-[#8BA3C7]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}
