interface HeroProps {
  onBeginJourney: () => void;
}

export function Hero({ onBeginJourney }: HeroProps) {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] my-auto">
      {/* H1: "Nơi những giấc mơ vươn mình qua miền tĩnh lặng." */}
      <h1
        className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white select-none"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Nơi <em className="not-italic text-[hsl(240,4%,66%)]">những giấc mơ</em> vươn mình{' '}
        <em className="not-italic text-[hsl(240,4%,66%)]">qua miền tĩnh lặng.</em>
      </h1>

      {/* Subtext: Tiếng Việt mang âm hưởng triết lý, truyền cảm hứng */}
      <p className="animate-fade-rise-delay text-[hsl(240,4%,66%)] text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-normal">
        Chúng tôi kiến tạo công cụ cho những tâm trí sâu sắc, người sáng tạo quả cảm và những kẻ nổi loạn trong thầm lặng.
        Giữa dòng đời hỗn tạp xô bồ, chúng tôi tạo dựng không gian kỹ thuật số cho sự tập trung thuần khiết và nguồn cảm hứng bất tận.
      </p>

      {/* CTA button: "Khởi Đầu Hành Trình" */}
      <div className="animate-fade-rise-delay-2 mt-12">
        <button
          onClick={onBeginJourney}
          className="liquid-glass rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] cursor-pointer transition-all duration-300 active:scale-[0.98] select-none shadow-2xl"
        >
          Khởi Đầu Hành Trình
        </button>
      </div>
    </main>
  );
}
