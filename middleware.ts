import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PARTNER_PRIVATE_PATHS = [
  '/partner/panel',
  '/partner/leads',
  '/partner/satislar',
  '/partner/satis-olustur',
  '/partner/kazanc',
  '/partner/materyaller',
  '/partner/profil',
  '/partner/destek',
];
const ADMIN_PREFIX = '/secretadmin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminLoginRoute = pathname === `${ADMIN_PREFIX}/giris`;
  const isPartnerLoginRoute = pathname === '/partner/giris';
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX) && !isAdminLoginRoute;
  const isPartnerPrivateRoute = !isPartnerLoginRoute && PARTNER_PRIVATE_PATHS.some((p) => pathname.startsWith(p));

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
  matcher: ['/partner/panel/:path*', '/partner/leads/:path*', '/partner/satislar/:path*', '/partner/satis-olustur/:path*', '/partner/kazanc/:path*', '/partner/materyaller/:path*', '/partner/profil/:path*', '/partner/destek/:path*', '/secretadmin/:path*'],
};
