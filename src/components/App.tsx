import { AppProvider } from '../context/AppContext';
import Navbar from './Navbar';
import Hero from './Hero';
import CallToAction from './CallToAction';
import Testimonials from './Testimonials';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';

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
 * Componente principal App que integra todos los componentes
 * Envuelve todo en el AppProvider para el contexto global
 */
export default function App({ assets }: AppProps) {
    return (
        <AppProvider>
            <div className="min-h-screen bg-white">
                <ScrollProgress />
                <Navbar logoUrl={assets.logoUrl} />

                <main>
                    <Hero
                        mascotImage={assets.mascotImage}
                        lineImage={assets.lineImage}
                    />

                    <CallToAction phoneImage={assets.phoneImage} />

                    <Testimonials />
                </main>

                <Footer
                    vectorBg={assets.vectorBg}
                    twitterIcon={assets.twitterIcon}
                    instagramIcon={assets.instagramIcon}
                    facebookIcon={assets.facebookIcon}
                />
            </div>
        </AppProvider>
    );
}

