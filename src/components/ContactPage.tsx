import PageLayout from './PageLayout';
import Contact from './Contact';

interface ContactPageProps {
    assets: {
        logoUrl: string;
        vectorBg: string;
        twitterIcon: string;
        instagramIcon: string;
        facebookIcon: string;
    };
}

/**
 * Componente de página completa para Contact
 * Combina PageLayout con el contenido de Contact
 */
export default function ContactPage({ assets }: ContactPageProps) {
    return (
        <PageLayout
            logoUrl={assets.logoUrl}
            vectorBg={assets.vectorBg}
            twitterIcon={assets.twitterIcon}
            instagramIcon={assets.instagramIcon}
            facebookIcon={assets.facebookIcon}
        >
            <Contact />
        </PageLayout>
    );
}

