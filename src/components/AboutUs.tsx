import { memo, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

/**
 * Componente de la página Sobre Nosotros
 * 
 * Características:
 * - Diseño responsive
 * - Secciones: Misión, Visión, Valores, Equipo
 * - Optimizado con memo para evitar re-renders innecesarios
 * - Soporte para múltiples idiomas
 * - Tema claro/oscuro
 */
const AboutUs = memo(() => {
    const { state } = useAppContext();
    const t = getTranslations(state.language);

    // useMemo para los valores - traducidos
    const values = useMemo(
        () => [
            {
                title: state.language === 'es' ? 'Transparencia' : 'Transparency',
                description: state.language === 'es'
                    ? 'Operamos con total claridad y honestidad en todo lo que hacemos.'
                    : 'We operate with complete clarity and honesty in everything we do.',
                icon: '🔍'
            },
            {
                title: state.language === 'es' ? 'Innovación' : 'Innovation',
                description: state.language === 'es'
                    ? 'Constantemente mejoramos nuestras funcionalidades para servir mejor.'
                    : 'We constantly improve our features to serve you better.',
                icon: '💡'
            },
            {
                title: state.language === 'es' ? 'Accesibilidad' : 'Accessibility',
                description: state.language === 'es'
                    ? 'Diseñamos para que todos puedan usar nuestra app sin complicaciones.'
                    : 'We design so everyone can use our app without complications.',
                icon: '🌐'
            },
            {
                title: state.language === 'es' ? 'Seguridad' : 'Security',
                description: state.language === 'es'
                    ? 'Protegemos tus datos financieros con los más altos estándares.'
                    : 'We protect your financial data with the highest standards.',
                icon: '🔒'
            },
            {
                title: state.language === 'es' ? 'Empatía' : 'Empathy',
                description: state.language === 'es'
                    ? 'Entendemos los desafíos financieros de nuestros usuarios.'
                    : 'We understand our users\' financial challenges.',
                icon: '❤️'
            },
            {
                title: state.language === 'es' ? 'Excelencia' : 'Excellence',
                description: state.language === 'es'
                    ? 'Buscamos la calidad en cada detalle de nuestro servicio.'
                    : 'We seek quality in every detail of our service.',
                icon: '⭐'
            }
        ],
        [state.language]
    );

    return (
        <div className="pb-16 w-full">
            <div className="w-full">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                        {t.aboutUs.title}
                    </h1>
                    <p className="font-inter text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        {t.aboutUs.description}
                    </p>
                </section>

                {/* Misión */}
                <section className="mb-16 rounded-3xl p-8 md:p-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es' ? 'Nuestra Misión' : 'Our Mission'}
                    </h2>
                    <p className="font-inter text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {state.language === 'es'
                            ? 'Empoderar a las personas para que tomen control de sus finanzas personales a través de una aplicación intuitiva, accesible y efectiva. Creemos que todos merecen tener claridad sobre sus ingresos y gastos, y las herramientas para alcanzar sus metas financieras.'
                            : 'Empower people to take control of their personal finances through an intuitive, accessible, and effective application. We believe everyone deserves clarity about their income and expenses, and the tools to achieve their financial goals.'
                        }
                    </p>
                </section>

                {/* Visión */}
                <section className="mb-16 rounded-3xl p-8 md:p-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es' ? 'Nuestra Visión' : 'Our Vision'}
                    </h2>
                    <p className="font-inter text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {state.language === 'es'
                            ? 'Convertirnos en la aplicación de finanzas personales más confiable y utilizada en América Latina, ayudando a millones de personas a mejorar su salud financiera y alcanzar sus sueños.'
                            : 'Become the most trusted and widely used personal finance app in Latin America, helping millions of people improve their financial health and achieve their dreams.'
                        }
                    </p>
                </section>

                {/* Valores */}
                <section className="mb-16">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es' ? 'Nuestros Valores' : 'Our Values'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="font-inter font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
                                    {value.title}
                                </h3>
                                <p className="font-inter" style={{ color: 'var(--text-secondary)' }}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center rounded-3xl p-12" style={{ background: 'linear-gradient(to right, #a3e635, #84cc16)' }}>
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-6" style={{ color: 'var(--text-inverse)' }}>
                        {state.language === 'es'
                            ? '¿Listo para transformar tus finanzas?'
                            : 'Ready to transform your finances?'
                        }
                    </h2>
                    <p className="font-inter text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-inverse)' }}>
                        {state.language === 'es'
                            ? 'Únete a miles de usuarios que ya están tomando control de su dinero.'
                            : 'Join thousands of users who are already taking control of their money.'
                        }
                    </p>
                    <a
                        href="/download/"
                        className="inline-block px-8 py-4 rounded-full font-inter font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
                    >
                        {t.navbar.download}
                    </a>
                </section>
            </div>
        </div>
    );
});

AboutUs.displayName = 'AboutUs';

export default AboutUs;

