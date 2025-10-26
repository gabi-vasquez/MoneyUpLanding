import { memo, useState, useCallback } from 'react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Componente de la página de Contacto
 * 
 * Características:
 * - Formulario de contacto con validación
 * - Información de contacto
 * - Optimizado con memo, useState y useCallback
 * - Diseño responsive
 */
const Contact = memo(() => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // useCallback para memorizar el handler de cambios en el formulario
    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    // useCallback para memorizar el handler de submit
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simulación de envío (aquí iría la lógica real de envío)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData]);

    return (
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
                        Contáctanos
                    </h1>
                    <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ti.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formulario de Contacto */}
                    <section>
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="font-archivo text-2xl sm:text-3xl font-black text-gray-900 mb-6">
                                Envíanos un mensaje
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nombre */}
                                <div>
                                    <label htmlFor="name" className="block font-inter font-semibold text-gray-700 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block font-inter font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                {/* Asunto */}
                                <div>
                                    <label htmlFor="subject" className="block font-inter font-semibold text-gray-700 mb-2">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter"
                                        placeholder="¿En qué podemos ayudarte?"
                                    />
                                </div>

                                {/* Mensaje */}
                                <div>
                                    <label htmlFor="message" className="block font-inter font-semibold text-gray-700 mb-2">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter resize-none"
                                        placeholder="Cuéntanos más detalles..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-lime-400 text-gray-900 px-6 py-4 rounded-lg font-inter font-bold text-lg hover:bg-lime-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg font-inter">
                                        ¡Mensaje enviado con éxito! Te responderemos pronto.
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg font-inter">
                                        Hubo un error. Por favor, intenta de nuevo.
                                    </div>
                                )}
                            </form>
                        </div>
                    </section>

                    {/* Información de Contacto */}
                    <section>
                        <div className="space-y-8">
                            {/* Tarjeta de Email */}
                            <div className="bg-gradient-to-br from-lime-400 to-lime-500 rounded-3xl p-8 text-white shadow-xl">
                                <div className="text-4xl mb-4">📧</div>
                                <h3 className="font-inter font-bold text-2xl mb-3">
                                    Email
                                </h3>
                                <p className="font-inter text-lg">
                                    contacto@moneyup.com
                                </p>
                                <p className="font-inter text-white/80 mt-2">
                                    Respuesta en menos de 24 horas
                                </p>
                            </div>

                            {/* Tarjeta de Redes Sociales */}
                            <div className="bg-white rounded-3xl p-8 shadow-xl">
                                <div className="text-4xl mb-4">💬</div>
                                <h3 className="font-inter font-bold text-2xl mb-3 text-gray-900">
                                    Redes Sociales
                                </h3>
                                <p className="font-inter text-gray-600 mb-6">
                                    Síguenos y mantente al día con las últimas novedades
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200"
                                        aria-label="Twitter"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200"
                                        aria-label="Facebook"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Tarjeta de Horarios */}
                            <div className="bg-gray-50 rounded-3xl p-8">
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="font-inter font-bold text-2xl mb-3 text-gray-900">
                                    Horario de Atención
                                </h3>
                                <p className="font-inter text-gray-700">
                                    Lunes a Viernes: 9:00 AM - 6:00 PM
                                </p>
                                <p className="font-inter text-gray-700">
                                    Sábados: 10:00 AM - 2:00 PM
                                </p>
                                <p className="font-inter text-gray-500 mt-2">
                                    (Horario de Colombia)
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
});

Contact.displayName = 'Contact';

export default Contact;

