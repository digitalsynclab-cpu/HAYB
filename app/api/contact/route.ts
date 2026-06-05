import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as unknown;
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz form verisi.' },
        { status: 400 }
      );
    }

    // TODO: E-posta gönderimi veya CRM entegrasyonu buraya eklenecek
    // Şimdilik başarılı yanıt döndürülüyor
    return NextResponse.json(
      { success: true, message: 'Mesajınız alındı. En kısa sürede iletişime geçeceğim.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
