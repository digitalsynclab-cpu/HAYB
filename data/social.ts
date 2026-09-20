/** Sosyal medya örnek şablonları (public/images/social). Gerçek müşteri paylaşımı değildir. */
export interface SocialTemplate {
  src: string;
  kind: 'post' | 'story';
  alt: string;
}

export const socialTemplates: SocialTemplate[] = [
  { src: '/images/social/post1.webp', kind: 'post', alt: 'Kahve markası için koyu temalı örnek post şablonu' },
  { src: '/images/social/story1.webp', kind: 'story', alt: 'Finans uygulaması için örnek story şablonu' },
  { src: '/images/social/post2.webp', kind: 'post', alt: 'Kulaklık markası için açık temalı örnek post şablonu' },
  { src: '/images/social/story2.webp', kind: 'story', alt: 'Günlük rutin uygulaması için örnek story şablonu' },
  { src: '/images/social/post3.webp', kind: 'post', alt: 'Seyahat markası için örnek post şablonu' },
  { src: '/images/social/story3.webp', kind: 'story', alt: 'Kahve markası için örnek story şablonu' },
  { src: '/images/social/post4.webp', kind: 'post', alt: 'Kahve laboratuvarı markası için örnek post şablonu' },
];
