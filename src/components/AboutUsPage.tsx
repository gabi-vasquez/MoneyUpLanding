import PageLayout from './PageLayout';
import AboutUs from './AboutUs';

interface AboutUsPageProps {
    assets: {
        logoUrl: string;
        vectorBg: string;
        twitterIcon: string;
        instagramIcon: string;
        facebookIcon: string;
    };
}

/**
 * Componente de página completa para About Us
 * Combina PageLayout con el contenido de AboutUs
 */
export default function AboutUsPage({ assets }: AboutUsPageProps) {
    return (
        <PageLayout
            logoUrl={assets.logoUrl}
            vectorBg={assets.vectorBg}
            twitterIcon={assets.twitterIcon}
            instagramIcon={assets.instagramIcon}
            facebookIcon={assets.facebookIcon}
        >
            <AboutUs />
        </PageLayout>
    );
}

