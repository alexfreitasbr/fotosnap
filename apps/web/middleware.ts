import { AUTH_TOKEN_COOKIE } from "@/lib/auth-constants";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;

  // 2. Se o usuário NÃO tiver o token e tentar acessar uma rota protegida
  if (!token) {
    // Redireciona ele imediatamente para a página de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se ele tiver o token, permite que a navegação continue normalmente
  return NextResponse.next();
}

// 3. Configure quais rotas este Middleware deve proteger
export const config = {
  matcher: [
    '/dashboard/:path*', // Protege /dashboard e qualquer sub-rota (ex: /dashboard/perfil)
    '/gallery/:path*', // Protege /gallery e qualquer sub-rota (ex: /gallery/perfil)
  ],
};