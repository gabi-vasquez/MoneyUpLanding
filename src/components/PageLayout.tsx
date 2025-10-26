import type { ReactNode } from 'react';
import { AppProvider } from '../context/AppContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';

interface PageLayoutProps {
    children: ReactNode;
    logoUrl: string;
    vectorBg: string;
    twitterIcon: string;
    instagramIcon: string;
    facebookIcon: string;
}

/**
 * Layout reutilizable para todas las páginas
 * 
 * Arquitectura Inteligente:
 * - Usa Flexbox para layout adaptativo automático
 * - CSS Variables para dimensiones dinámicas (ver global.css)
 * - Sin valores hardcodeados - todo se adapta automáticamente
 * - Principio DRY: cambiar dimensiones solo requiere actualizar variables CSS
 * 
 * Características:
 * - Envuelve el contenido con AppProvider para estado global
 * - Incluye Navbar y Footer consistentes
 * - Incluye ScrollProgress para feedback visual
 * - Single Responsibility: Solo se encarga del layout general
 * 
 * Clases CSS utilizadas:
 * - .page-container: Flexbox container (min-height: 100vh)
 * - .main-content: Padding dinámico + flex: 1 (ocupa espacio disponible)
 * - .footer-container: Margin dinámico + flex-shrink: 0
 * 
 * @param children - Contenido específico de cada página
 * @param logoUrl - URL del logo para el Navbar
 * @param vectorBg - Background decorativo para el Footer
 * @param twitterIcon - Icono de Twitter para el Footer
 * @param instagramIcon - Icono de Instagram para el Footer
 * @param facebookIcon - Icono de Facebook para el Footer
 */
export default function PageLayout({
    children,
    logoUrl,
    vectorBg,
    twitterIcon,
    instagramIcon,
    facebookIcon,
}: PageLayoutProps) {
    return (
        <AppProvider>
            <div className="page-container bg-white">
                <ScrollProgress />
                <Navbar logoUrl={logoUrl} />
                <main className="main-content">
                    {children}
                </main>
                <Footer
                    vectorBg={vectorBg}
                    twitterIcon={twitterIcon}
                    instagramIcon={instagramIcon}
                    facebookIcon={facebookIcon}
                />
            </div>
        </AppProvider>
    );
}

