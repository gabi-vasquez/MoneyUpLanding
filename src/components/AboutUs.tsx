import { memo } from 'react';

/**
 * Componente de la página Sobre Nosotros
 * 
 * Características:
 * - Diseño responsive
 * - Secciones: Misión, Visión, Valores, Equipo
 * - Optimizado con memo para evitar re-renders innecesarios
 */
const AboutUs = memo(() => {
    return (
        <div className="pb-16 w-full">
            <div className="w-full">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
                        Sobre Nosotros
                    </h1>
                    <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        MoneyUp nace de la necesidad de democratizar el acceso a herramientas
                        financieras de calidad para todos.
                    </p>
                </section>

                {/* Misión */}
                <section className="mb-16 bg-lime-50 rounded-3xl p-8 md:p-12">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                        Nuestra Misión
                    </h2>
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                        Empoderar a las personas para que tomen control de sus finanzas personales
                        a través de una aplicación intuitiva, accesible y efectiva. Creemos que
                        todos merecen tener claridad sobre sus ingresos y gastos, y las herramientas
                        para alcanzar sus metas financieras.
                    </p>
                </section>

                {/* Visión */}
                <section className="mb-16 bg-gray-50 rounded-3xl p-8 md:p-12">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                        Nuestra Visión
                    </h2>
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                        Convertirnos en la aplicación de finanzas personales más confiable y
                        utilizada en América Latina, ayudando a millones de personas a mejorar
                        su salud financiera y alcanzar sus sueños.
                    </p>
                </section>

                {/* Valores */}
                <section className="mb-16">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-gray-900 mb-8 text-center">
                        Nuestros Valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Transparencia',
                                description: 'Operamos con total claridad y honestidad en todo lo que hacemos.',
                                icon: '🔍'
                            },
                            {
                                title: 'Innovación',
                                description: 'Constantemente mejoramos nuestras funcionalidades para servir mejor.',
                                icon: '💡'
                            },
                            {
                                title: 'Accesibilidad',
                                description: 'Diseñamos para que todos puedan usar nuestra app sin complicaciones.',
                                icon: '🌐'
                            },
                            {
                                title: 'Seguridad',
                                description: 'Protegemos tus datos financieros con los más altos estándares.',
                                icon: '🔒'
                            },
                            {
                                title: 'Empatía',
                                description: 'Entendemos los desafíos financieros de nuestros usuarios.',
                                icon: '❤️'
                            },
                            {
                                title: 'Excelencia',
                                description: 'Buscamos la calidad en cada detalle de nuestro servicio.',
                                icon: '⭐'
                            }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="font-inter font-bold text-xl text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="font-inter text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-linear-to-r from-lime-400 to-lime-500 rounded-3xl p-12">
                    <h2 className="font-archivo text-3xl sm:text-4xl font-black text-white mb-6">
                        ¿Listo para transformar tus finanzas?
                    </h2>
                    <p className="font-inter text-lg text-white mb-8 max-w-2xl mx-auto">
                        Únete a miles de usuarios que ya están tomando control de su dinero.
                    </p>
                    <button
                        className="bg-gray-800 text-white px-8 py-4 rounded-full font-inter font-bold text-lg hover:bg-gray-900 transition-colors duration-300 shadow-lg"
                    >
                        Descargar MoneyUp
                    </button>
                </section>
            </div>
        </div>
    );
});

AboutUs.displayName = 'AboutUs';

export default AboutUs;

