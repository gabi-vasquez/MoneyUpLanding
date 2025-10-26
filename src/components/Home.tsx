import Hero from './Hero';
import CallToAction from './CallToAction';
import Testimonials from './Testimonials';

interface HomeProps {
    mascotImage: string;
    lineImage: string;
    phoneImage: string;
}

/**
 * Componente con el contenido específico de la página de inicio
 * 
 * Secciones:
 * - Hero: Banner principal con mascota
 * - CallToAction: Sección de descarga de la app
 * - Testimonials: Testimonios de usuarios
 * 
 * Este componente solo contiene el contenido específico del home,
 * el layout (Navbar, Footer) se maneja en PageLayout
 */
export default function Home({ mascotImage, lineImage, phoneImage }: HomeProps) {
    return (
        <>
            <Hero mascotImage={mascotImage} lineImage={lineImage} />
            <CallToAction phoneImage={phoneImage} />
            <Testimonials />
        </>
    );
}

