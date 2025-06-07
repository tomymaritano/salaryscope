import { Typewriter } from 'react-simple-typewriter';

export function TypingGradientText() {
  return (
    <span className="font-mono font-semibold tracking-wide bg-gradient-to-r from-teal-500 to-teal-200 bg-clip-text text-transparent whitespace-nowrap">
      <Typewriter
        words={[
          ">> data loaded...",
          ">> anon mode: ENABLED",
          ">> no emails, just numbers.",
          ">> $ open-salary --latam --eu",
          ">> data > drama;",
          ">> transparency: 100%;",
          ">> hacklab > bullshit;",
        ]}
        loop={true}
        cursor
        cursorStyle="_"
        typeSpeed={49}
        deleteSpeed={36}
        delaySpeed={1200}
      />
    </span>
  );
}