import { JsonLd } from '@/components/seo/JsonLd';

interface FAQItem {
  question: string;
  answer: string;
}

/** Sayfada GÖRÜNEN SSS ile AYNI diziden beslenmelidir (tek `faqs` sabiti, iki yerde kullanılır). */
export function FAQSchema({ items }: { items: FAQItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  );
}
