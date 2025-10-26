import { memo } from 'react';

interface TestimonialCardProps {
    name: string;
    comment: string;
    delay?: number;
}

/**
 * Componente TestimonialCard optimizado con React.memo
 * Se renderiza solo cuando sus props cambian
 */
const TestimonialCard = memo(({ name, comment, delay = 0 }: TestimonialCardProps) => {
    return (
        <div
            className="bg-white rounded-[30px] p-8 shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            style={{
                animationDelay: `${delay}ms`,
            }}
        >
            <div className="text-center mb-4">
                <h4 className="font-inter font-bold text-xl text-gray-800">{name}</h4>
            </div>
            <p className="font-inter text-lg text-black opacity-50 leading-relaxed">
                {comment}
            </p>
        </div>
    );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;

