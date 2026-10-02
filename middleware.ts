import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_PREFIX = '/secretadmin';

// /partner/* altında yalnızca bunlar PUBLIC'tir; geri kalan HER /partner/... sayfası
// varsayılan olarak authenticated kabul edilir (yeni sayfa eklenince unutma riski olmasın diye).
const PUBLIC_PARTNER_PREFIXES = ['/partner/basvuru', '/partner/giris'];

function isPublicPartnerPath(pathname: string): boolean {
  if (pathname === '/partner') return true;
  return PUBLIC_PARTNER_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminLoginRoute = pathname === `${ADMIN_PREFIX}/giris`;
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX) && !isAdminLoginRoute;
  const isPartnerPrivateRoute = pathname.startsWith('/partner') && !isPublicPartnerPath(pathname);

  if (!isAdminRoute && !isPartnerPrivateRoute) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = isAdminRoute ? '/secretadmin/giris' : '/partner/giris';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const role = profile?.role;

  if (isAdminRoute) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/secretadmin/giris', request.url));
    }
    // İkinci faktör (e-posta kodu) doğrulanmadan admin alanına giriş yok.
    const otpVerified = request.cookies.get('hayb_admin_otp_ok')?.value === '1';
    if (!otpVerified) {
      return NextResponse.redirect(new URL('/secretadmin/giris?step=otp', request.url));
    }
  }

  if (isPartnerPrivateRoute && role !== 'partner' && role !== 'admin') {
    return NextResponse.redirect(new URL('/partner/giris', request.url));
  }

  if (isPartnerPrivateRoute && role === 'partner') {
    const { data: partner } = await supabase
      .from('partners')
      .select('status')
      .eq('profile_id', user.id)
      .single();
    if (partner?.status !== 'active') {
      return NextResponse.redirect(new URL('/partner/basvuru/durum', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/partner/:path*', '/secretadmin/:path*'],
};
