'use client';
import dynamic from 'next/dynamic';

// Asistan ilk boyamayı geciktirmesin: tarayıcı hazır olunca ayrı chunk olarak yüklenir.
const HAYBAssistant = dynamic(() => import('@/components/assistant/HAYBAssistant'), { ssr: false });

export function AssistantLoader() {
  return <HAYBAssistant />;
}
