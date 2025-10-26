/**
 * Sistema de internacionalización (i18n)
 * Soporta español (es) e inglés (en)
 * 
 * Uso: const t = translations[language];
 * Acceso: t.navbar.home
 */

export type Language = 'es' | 'en';

export interface Translations {
    navbar: {
        home: string;
        aboutUs: string;
        contact: string;
        download: string;
    };
    hero: {
        title: string;
        subtitle: string;
        cta: string;
    };
    callToAction: {
        title: string;
        subtitle: string;
        downloadButton: string;
    };
    testimonials: {
        title: string;
        subtitle: string;
    };
    footer: {
        description: string;
        followUs: string;
        links: {
            aboutUs: string;
            contact: string;
            privacy: string;
            terms: string;
        };
        copyright: string;
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            name: string;
            email: string;
            message: string;
            submit: string;
        };
    };
    aboutUs: {
        title: string;
        subtitle: string;
        description: string;
    };
    download: {
        title: string;
        subtitle: string;
        androidButton: string;
        iosButton: string;
    };
    theme: {
        light: string;
        dark: string;
    };
}

export const translations: Record<Language, Translations> = {
    es: {
        navbar: {
            home: 'Inicio',
            aboutUs: 'Sobre Nosotros',
            contact: 'Contacto',
            download: 'Descargar',
        },
        hero: {
            title: '¡Bienvenido a MoneyUp!',
            subtitle: 'La mejor aplicación para gestionar tus finanzas personales',
            cta: 'Comenzar ahora',
        },
        callToAction: {
            title: 'Descarga MoneyUp',
            subtitle: 'Disponible en iOS y Android',
            downloadButton: 'Descargar ahora',
        },
        testimonials: {
            title: 'Lo que dicen nuestros usuarios',
            subtitle: 'Miles de personas ya confían en MoneyUp',
        },
        footer: {
            description: 'MoneyUp - Tu aliado financiero personal',
            followUs: 'Síguenos',
            links: {
                aboutUs: 'Sobre Nosotros',
                contact: 'Contacto',
                privacy: 'Privacidad',
                terms: 'Términos',
            },
            copyright: '© 2025 MoneyUp. Todos los derechos reservados.',
        },
        contact: {
            title: 'Contáctanos',
            subtitle: 'Estamos aquí para ayudarte',
            form: {
                name: 'Nombre',
                email: 'Correo electrónico',
                message: 'Mensaje',
                submit: 'Enviar mensaje',
            },
        },
        aboutUs: {
            title: 'Sobre Nosotros',
            subtitle: 'Conoce nuestra historia',
            description: 'MoneyUp nació con la misión de democratizar las finanzas personales.',
        },
        download: {
            title: 'Descarga MoneyUp',
            subtitle: 'Disponible en todas las plataformas',
            androidButton: 'Descargar para Android',
            iosButton: 'Descargar para iOS',
        },
        theme: {
            light: 'Modo claro',
            dark: 'Modo oscuro',
        },
    },
    en: {
        navbar: {
            home: 'Home',
            aboutUs: 'About Us',
            contact: 'Contact',
            download: 'Download',
        },
        hero: {
            title: 'Welcome to MoneyUp!',
            subtitle: 'The best app to manage your personal finances',
            cta: 'Get started now',
        },
        callToAction: {
            title: 'Download MoneyUp',
            subtitle: 'Available on iOS and Android',
            downloadButton: 'Download now',
        },
        testimonials: {
            title: 'What our users say',
            subtitle: 'Thousands of people already trust MoneyUp',
        },
        footer: {
            description: 'MoneyUp - Your personal finance ally',
            followUs: 'Follow us',
            links: {
                aboutUs: 'About Us',
                contact: 'Contact',
                privacy: 'Privacy',
                terms: 'Terms',
            },
            copyright: '© 2025 MoneyUp. All rights reserved.',
        },
        contact: {
            title: 'Contact Us',
            subtitle: "We're here to help",
            form: {
                name: 'Name',
                email: 'Email',
                message: 'Message',
                submit: 'Send message',
            },
        },
        aboutUs: {
            title: 'About Us',
            subtitle: 'Know our story',
            description: 'MoneyUp was born with the mission to democratize personal finance.',
        },
        download: {
            title: 'Download MoneyUp',
            subtitle: 'Available on all platforms',
            androidButton: 'Download for Android',
            iosButton: 'Download for iOS',
        },
        theme: {
            light: 'Light mode',
            dark: 'Dark mode',
        },
    },
};

/**
 * Hook helper para obtener las traducciones del idioma actual
 * Uso: const t = getTranslations(language);
 */
export function getTranslations(language: Language): Translations {
    return translations[language];
}

