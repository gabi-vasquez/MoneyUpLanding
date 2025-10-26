import PageLayout from './PageLayout';
import Download from './Download';

interface DownloadPageProps {
    assets: {
        logoUrl: string;
        vectorBg: string;
        twitterIcon: string;
        instagramIcon: string;
        facebookIcon: string;
    };
}

/**
 * Componente de página completa para Download
 * Combina PageLayout con el contenido de Download
 */
export default function DownloadPage({ assets }: DownloadPageProps) {
    return (
        <PageLayout
            logoUrl={assets.logoUrl}
            vectorBg={assets.vectorBg}
            twitterIcon={assets.twitterIcon}
            instagramIcon={assets.instagramIcon}
            facebookIcon={assets.facebookIcon}
        >
            <Download />
        </PageLayout>
    );
}

