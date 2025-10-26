import { memo, useMemo } from 'react';

/**
 * Componente de la página de Descarga
 * 
 * Características:
 * - Links de descarga para iOS y Android
 * - Información sobre requisitos del sistema
 * - Sección de características destacadas
 * - Optimizado con memo y useMemo
 * - Diseño responsive
 */
const Download = memo(() => {
    // useMemo para las características destacadas
    const features = useMemo(
        () => [
            {
                icon: '📊',
                title: 'Gráficas en Tiempo Real',
                description: 'Visualiza tus gastos e ingresos con gráficas interactivas'
            },
            {
                icon: '🎯',
                title: 'Metas de Ahorro',
                description: 'Define y alcanza tus objetivos financieros'
            },
            {
                icon: '🔔',
                title: 'Recordatorios Inteligentes',
                description: 'Nunca olvides un pago importante'
            },
            {
                icon: '🔒',
                title: 'Seguridad Total',
                description: 'Tus datos protegidos con encriptación de nivel bancario'
            },
            {
                icon: '📱',
                title: 'Sincronización',
                description: 'Accede desde cualquier dispositivo'
            },
            {
                icon: '💰',
                title: 'Múltiples Monedas',
                description: 'Soporte para más de 100 monedas diferentes'
            }
        ],
        []
    );

    // useMemo para los requisitos del sistema
    const systemRequirements = useMemo(
        () => ({
            ios: {
                version: 'iOS 13.0 o superior',
                space: '50 MB de espacio disponible',
                devices: 'iPhone, iPad, iPod touch'
            },
            android: {
                version: 'Android 7.0 o superior',
                space: '45 MB de espacio disponible',
                devices: 'Smartphones y tablets'
            }
        }),
        []
    );

    return (
        <div className="pb-16 w-full">
            <div className="w-full">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
                        Descarga MoneyUp
                    </h1>
                    <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Disponible gratis en iOS y Android. Toma control de tus finanzas hoy mismo.
                    </p>

                    {/* Botones de Descarga */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* App Store */}
                        <a
                            href="#app-store"
                            className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div className="text-left">
                                <p className="text-xs opacity-80">Descarga en</p>
                                <p className="font-bold text-xl">App Store</p>
                            </div>
                        </a>

                        {/* Google Play */}
                        <a
                            href="#google-play"
                            className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <div className="text-left">
                                <p className="text-xs opacity-80">Disponible en</p>
                                <p className="font-bold text-xl">Google Play</p>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Características Destacadas */}
                <section className="mb-16">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-gray-900 mb-8 text-center">
                        ¿Por qué elegir MoneyUp?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="font-inter font-bold text-xl text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="font-inter text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Requisitos del Sistema */}
                <section className="mb-16">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-gray-900 mb-8 text-center">
                        Requisitos del Sistema
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* iOS */}
                        <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <h3 className="font-archivo text-2xl font-black">iOS</h3>
                            </div>
                            <ul className="space-y-3 font-inter text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span>{systemRequirements.ios.version}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span>{systemRequirements.ios.space}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span>{systemRequirements.ios.devices}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Android */}
                        <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6,18c0,0.55 0.45,1 1,1h1v3.5c0,0.83 0.67,1.5 1.5,1.5s1.5,-0.67 1.5,-1.5V19h2v3.5c0,0.83 0.67,1.5 1.5,1.5s1.5,-0.67 1.5,-1.5V19h1c0.55,0 1,-0.45 1,-1V8H6v10zM3.5,8C2.67,8 2,8.67 2,9.5v7c0,0.83 0.67,1.5 1.5,1.5S5,17.33 5,16.5v-7C5,8.67 4.33,8 3.5,8zM20.5,8C19.67,8 19,8.67 19,9.5v7c0,0.83 0.67,1.5 1.5,1.5s1.5,-0.67 1.5,-1.5v-7C22,8.67 21.33,8 20.5,8zM15.53,2.16l1.3,-1.3c0.2,-0.2 0.2,-0.51 0,-0.71c-0.2,-0.2 -0.51,-0.2 -0.71,0l-1.48,1.48C13.85,1.23 12.95,1 12,1c-0.96,0 -1.86,0.23 -2.66,0.63L7.85,0.15c-0.2,-0.2 -0.51,-0.2 -0.71,0c-0.2,0.2 -0.2,0.51 0,0.71l1.31,1.31C6.97,3.26 6,5.01 6,7h12c0,-1.99 -0.97,-3.75 -2.47,-4.84zM10,5H9V4h1V5zM15,5h-1V4h1V5z" />
                                </svg>
                                <h3 className="font-archivo text-2xl font-black">Android</h3>
                            </div>
                            <ul className="space-y-3 font-inter text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span>{systemRequirements.android.version}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span>{systemRequirements.android.space}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lime-500 text-xl">✓</span>
                                    <span>{systemRequirements.android.devices}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-linear-to-r from-lime-400 to-lime-500 rounded-3xl p-12">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-white mb-6">
                        ¡Comienza tu viaje financiero hoy!
                    </h2>
                    <p className="font-inter text-lg text-white mb-8 max-w-2xl mx-auto">
                        Únete a más de 100,000 usuarios que ya están mejorando sus finanzas con MoneyUp
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-inter font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                            Descargar Ahora
                        </button>
                        <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-inter font-bold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg">
                            Ver Demostración
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
});

Download.displayName = 'Download';

export default Download;

