import { Typewriter } from 'react-simple-typewriter';

export function TypingGradientText() {
    return (
        <span className="font-semibold tracking-wide bg-gradient-to-r from-teal-600  to-teal-200 bg-clip-text text-transparent whitespace-nowrap">
            <Typewriter
                words={[
                    "Acceso libre, sin registros.",
                    "Cuidamos tu anonimato.",
                    "Salarios tech, sin filtros ni vueltas.",
                    "La data es de todos, no de una empresa."
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={50}
                deleteSpeed={38}
                delaySpeed={1400}
            />
        </span>
    );
}