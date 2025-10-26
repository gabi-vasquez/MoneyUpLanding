import PageLayout from './PageLayout';
import Home from './Home';

interface AppProps {
    assets: {
        logoUrl: string;
        mascotImage: string;
        lineImage: string;
        phoneImage: string;
        vectorBg: string;
        twitterIcon: string;
        instagramIcon: string;
        facebookIcon: string;
    };
}

/**
 * Componente principal App para la página de inicio
 * Utiliza PageLayout para el layout común (Navbar, Footer)
 * y Home para el contenido específico
 * 
 * Refactorizado para seguir principios:
 * - DRY: Reutiliza PageLayout en lugar de repetir Navbar/Footer
 * - Single Responsibility: Solo compone layout + contenido
 * - Clean Code: Estructura clara y mantenible
 */
export default function App({ assets }: AppProps) {
    return (
        <PageLayout
            logoUrl={assets.logoUrl}
            vectorBg={assets.vectorBg}
            twitterIcon={assets.twitterIcon}
            instagramIcon={assets.instagramIcon}
            facebookIcon={assets.facebookIcon}
        >
            <Home
                mascotImage={assets.mascotImage}
                lineImage={assets.lineImage}
                phoneImage={assets.phoneImage}
            />
        </PageLayout>
    );
}

