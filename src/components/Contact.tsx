import { memo, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

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
 * - Soporte para múltiples idiomas
 * - Tema claro/oscuro
 */
const Contact = memo(() => {
    const { state } = useAppContext();
    const t = getTranslations(state.language);

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
        <div className="pb-16 w-full">
            <div className="w-full">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                        {t.contact.title}
                    </h1>
                    <p className="font-inter text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        {t.contact.subtitle}
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formulario de Contacto */}
                    <section>
                        <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
                            <h2 className="font-archivo text-2xl sm:text-3xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                                {state.language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nombre */}
                                <div>
                                    <label htmlFor="name" className="block font-inter font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {t.contact.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter"
                                        style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)',
                                            borderWidth: '1px'
                                        }}
                                        placeholder={state.language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block font-inter font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {t.contact.form.email}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter"
                                        style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)',
                                            borderWidth: '1px'
                                        }}
                                        placeholder={state.language === 'es' ? 'tu@email.com' : 'your@email.com'}
                                    />
                                </div>

                                {/* Asunto */}
                                <div>
                                    <label htmlFor="subject" className="block font-inter font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {state.language === 'es' ? 'Asunto' : 'Subject'}
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter"
                                        style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)',
                                            borderWidth: '1px'
                                        }}
                                        placeholder={state.language === 'es' ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
                                    />
                                </div>

                                {/* Mensaje */}
                                <div>
                                    <label htmlFor="message" className="block font-inter font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {t.contact.form.message}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 font-inter resize-none"
                                        style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)',
                                            borderWidth: '1px'
                                        }}
                                        placeholder={state.language === 'es' ? 'Cuéntanos más detalles...' : 'Tell us more details...'}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-4 rounded-lg font-inter font-bold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#a3e635', color: '#1f2937' }}
                                >
                                    {isSubmitting
                                        ? (state.language === 'es' ? 'Enviando...' : 'Sending...')
                                        : t.contact.form.submit
                                    }
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg font-inter">
                                        {state.language === 'es'
                                            ? '¡Mensaje enviado con éxito! Te responderemos pronto.'
                                            : 'Message sent successfully! We\'ll get back to you soon.'
                                        }
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg font-inter">
                                        {state.language === 'es'
                                            ? 'Hubo un error. Por favor, intenta de nuevo.'
                                            : 'There was an error. Please try again.'
                                        }
                                    </div>
                                )}
                            </form>
                        </div>
                    </section>

                    {/* Información de Contacto */}
                    <section>
                        <div className="space-y-8">
                            {/* Tarjeta de Email */}
                            <div className="rounded-3xl p-8 shadow-xl" style={{ background: 'linear-gradient(135deg, #a3e635, #84cc16)' }}>
                                <div className="text-4xl mb-4">📧</div>
                                <h3 className="font-inter font-bold text-2xl mb-3" style={{ color: 'var(--text-inverse)' }}>
                                    Email
                                </h3>
                                <p className="font-inter text-lg" style={{ color: 'var(--text-inverse)' }}>
                                    contacto@moneyup.com
                                </p>
                                <p className="font-inter mt-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                    {state.language === 'es'
                                        ? 'Respuesta en menos de 24 horas'
                                        : 'Response within 24 hours'
                                    }
                                </p>
                            </div>

                            {/* Tarjeta de Redes Sociales */}
                            <div className="rounded-3xl p-8 shadow-xl" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <div className="text-4xl mb-4">💬</div>
                                <h3 className="font-inter font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                                    {state.language === 'es' ? 'Redes Sociales' : 'Social Media'}
                                </h3>
                                <p className="font-inter mb-6" style={{ color: 'var(--text-secondary)' }}>
                                    {state.language === 'es'
                                        ? 'Síguenos y mantente al día con las últimas novedades'
                                        : 'Follow us and stay up to date with the latest news'
                                    }
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
                            <div className="rounded-3xl p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="font-inter font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                                    {state.language === 'es' ? 'Horario de Atención' : 'Business Hours'}
                                </h3>
                                <p className="font-inter" style={{ color: 'var(--text-primary)' }}>
                                    {state.language === 'es'
                                        ? 'Lunes a Viernes: 9:00 AM - 6:00 PM'
                                        : 'Monday to Friday: 9:00 AM - 6:00 PM'
                                    }
                                </p>
                                <p className="font-inter" style={{ color: 'var(--text-primary)' }}>
                                    {state.language === 'es'
                                        ? 'Sábados: 10:00 AM - 2:00 PM'
                                        : 'Saturdays: 10:00 AM - 2:00 PM'
                                    }
                                </p>
                                <p className="font-inter mt-2" style={{ color: 'var(--text-secondary)' }}>
                                    {state.language === 'es'
                                        ? '(Horario de Colombia)'
                                        : '(Colombia Time)'
                                    }
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

