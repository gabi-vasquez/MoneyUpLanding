import { memo, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

/**
 * Componente de la página de Descarga
 * 
 * Características:
 * - Links de descarga para iOS y Android
 * - Información sobre requisitos del sistema
 * - Sección de características destacadas
 * - Optimizado con memo y useMemo
 * - Diseño responsive
 * - Soporte para múltiples idiomas
 * - Tema claro/oscuro
 */
const Download = memo(() => {
    const { state } = useAppContext();
    const t = getTranslations(state.language);

    // useMemo para las características destacadas - traducidas
    const features = useMemo(
        () => [
            {
                icon: '📊',
                title: state.language === 'es' ? 'Gráficas en Tiempo Real' : 'Real-Time Charts',
                description: state.language === 'es'
                    ? 'Visualiza tus gastos e ingresos con gráficas interactivas'
                    : 'Visualize your expenses and income with interactive charts'
            },
            {
                icon: '🎯',
                title: state.language === 'es' ? 'Metas de Ahorro' : 'Savings Goals',
                description: state.language === 'es'
                    ? 'Define y alcanza tus objetivos financieros'
                    : 'Define and achieve your financial goals'
            },
            {
                icon: '🔔',
                title: state.language === 'es' ? 'Recordatorios Inteligentes' : 'Smart Reminders',
                description: state.language === 'es'
                    ? 'Nunca olvides un pago importante'
                    : 'Never forget an important payment'
            },
            {
                icon: '🔒',
                title: state.language === 'es' ? 'Seguridad Total' : 'Total Security',
                description: state.language === 'es'
                    ? 'Tus datos protegidos con encriptación de nivel bancario'
                    : 'Your data protected with bank-level encryption'
            },
            {
                icon: '📱',
                title: state.language === 'es' ? 'Sincronización' : 'Synchronization',
                description: state.language === 'es'
                    ? 'Accede desde cualquier dispositivo'
                    : 'Access from any device'
            },
            {
                icon: '💰',
                title: state.language === 'es' ? 'Múltiples Monedas' : 'Multiple Currencies',
                description: state.language === 'es'
                    ? 'Soporte para más de 100 monedas diferentes'
                    : 'Support for over 100 different currencies'
            }
        ],
        [state.language]
    );

    // useMemo para los requisitos del sistema - traducidos
    const systemRequirements = useMemo(
        () => ({
            ios: {
                version: state.language === 'es' ? 'iOS 13.0 o superior' : 'iOS 13.0 or higher',
                space: state.language === 'es' ? '50 MB de espacio disponible' : '50 MB available space',
                devices: 'iPhone, iPad, iPod touch'
            },
            android: {
                version: state.language === 'es' ? 'Android 7.0 o superior' : 'Android 7.0 or higher',
                space: state.language === 'es' ? '45 MB de espacio disponible' : '45 MB available space',
                devices: state.language === 'es' ? 'Smartphones y tablets' : 'Smartphones and tablets'
            }
        }),
        [state.language]
    );

    return (
        <div className="pb-16 w-full">
            <div className="w-full">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                        {t.download.title}
                    </h1>
                    <p className="font-inter text-lg sm:text-xl max-w-3xl mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
                        {t.download.subtitle}
                    </p>

                    {/* Botones de Descarga */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* App Store */}
                        <a
                            href="#app-store"
                            className="group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
                        >
                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div className="text-left">
                                <p className="text-xs opacity-80">
                                    {state.language === 'es' ? 'Descarga en' : 'Download on'}
                                </p>
                                <p className="font-bold text-xl">App Store</p>
                            </div>
                        </a>

                        {/* Google Play */}
                        <a
                            href="#google-play"
                            className="group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
                        >
                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <div className="text-left">
                                <p className="text-xs opacity-80">
                                    {state.language === 'es' ? 'Disponible en' : 'Get it on'}
                                </p>
                                <p className="font-bold text-xl">Google Play</p>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Características Destacadas */}
                <section className="mb-16">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es' ? '¿Por qué elegir MoneyUp?' : 'Why choose MoneyUp?'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                style={{ backgroundColor: 'var(--bg-primary)' }}
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="font-inter font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
                                    {feature.title}
                                </h3>
                                <p className="font-inter" style={{ color: 'var(--text-secondary)' }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Requisitos del Sistema */}
                <section className="mb-16">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es' ? 'Requisitos del Sistema' : 'System Requirements'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* iOS */}
                        <div className="rounded-3xl p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                            <div className="flex items-center gap-4 mb-6">
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)' }}>
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <h3 className="font-archivo text-2xl font-black" style={{ color: 'var(--text-primary)' }}>iOS</h3>
                            </div>
                            <ul className="space-y-3 font-inter">
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span style={{ color: 'var(--text-primary)' }}>{systemRequirements.ios.version}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span style={{ color: 'var(--text-primary)' }}>{systemRequirements.ios.space}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span style={{ color: 'var(--text-primary)' }}>{systemRequirements.ios.devices}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Android */}
                        <div className="rounded-3xl p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                            <div className="flex items-center gap-4 mb-6">
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)' }}>
                                    <path d="M6,18c0,0.55 0.45,1 1,1h1v3.5c0,0.83 0.67,1.5 1.5,1.5s1.5,-0.67 1.5,-1.5V19h2v3.5c0,0.83 0.67,1.5 1.5,1.5s1.5,-0.67 1.5,-1.5V19h1c0.55,0 1,-0.45 1,-1V8H6v10zM3.5,8C2.67,8 2,8.67 2,9.5v7c0,0.83 0.67,1.5 1.5,1.5S5,17.33 5,16.5v-7C5,8.67 4.33,8 3.5,8zM20.5,8C19.67,8 19,8.67 19,9.5v7c0,0.83 0.67,1.5 1.5,1.5s1.5,-0.67 1.5,-1.5v-7C22,8.67 21.33,8 20.5,8zM15.53,2.16l1.3,-1.3c0.2,-0.2 0.2,-0.51 0,-0.71c-0.2,-0.2 -0.51,-0.2 -0.71,0l-1.48,1.48C13.85,1.23 12.95,1 12,1c-0.96,0 -1.86,0.23 -2.66,0.63L7.85,0.15c-0.2,-0.2 -0.51,-0.2 -0.71,0c-0.2,0.2 -0.2,0.51 0,0.71l1.31,1.31C6.97,3.26 6,5.01 6,7h12c0,-1.99 -0.97,-3.75 -2.47,-4.84zM10,5H9V4h1V5zM15,5h-1V4h1V5z" />
                                </svg>
                                <h3 className="font-archivo text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Android</h3>
                            </div>
                            <ul className="space-y-3 font-inter">
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span style={{ color: 'var(--text-primary)' }}>{systemRequirements.android.version}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span style={{ color: 'var(--text-primary)' }}>{systemRequirements.android.space}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span style={{ color: 'var(--text-primary)' }}>{systemRequirements.android.devices}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center rounded-3xl p-12" style={{ background: 'linear-gradient(to right, #a3e635, #84cc16)' }}>
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black mb-6" style={{ color: 'var(--text-inverse)' }}>
                        {state.language === 'es'
                            ? '¡Comienza tu viaje financiero hoy!'
                            : 'Start your financial journey today!'
                        }
                    </h2>
                    <p className="font-inter text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-inverse)' }}>
                        {state.language === 'es'
                            ? 'Únete a más de 100,000 usuarios que ya están mejorando sus finanzas con MoneyUp'
                            : 'Join over 100,000 users who are already improving their finances with MoneyUp'
                        }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#download"
                            className="px-8 py-4 rounded-full font-inter font-bold text-lg transition-colors duration-300 shadow-lg"
                            style={{ backgroundColor: '#ffffff', color: '#1f2937' }}
                        >
                            {state.language === 'es' ? 'Descargar Ahora' : 'Download Now'}
                        </a>
                        <a
                            href="#demo"
                            className="px-8 py-4 rounded-full font-inter font-bold text-lg transition-colors duration-300 shadow-lg"
                            style={{ backgroundColor: '#1f2937', color: '#ffffff' }}
                        >
                            {state.language === 'es' ? 'Ver Demostración' : 'View Demo'}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
});

Download.displayName = 'Download';

export default Download;

