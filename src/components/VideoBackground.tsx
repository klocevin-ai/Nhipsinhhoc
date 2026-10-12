import { forwardRef, useState } from 'react';

interface VideoBackgroundProps {
  showGrain?: boolean;
  showVignette?: boolean;
  aspect239?: boolean;
}

export const VideoBackground = forwardRef<HTMLVideoElement, VideoBackgroundProps>(
  ({ showGrain = false, showVignette = false, aspect239 = false }, ref) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {/* Fullscreen Video element with exact specs */}
        <video
          ref={ref}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />

        {/* Optional subtle film grain (toggleable) */}
        {showGrain && (
          <div className="absolute inset-0 film-grain pointer-events-none z-[1] opacity-70" />
        )}

        {/* Optional subtle cinematic vignette (toggleable) */}
        {showVignette && (
          <div
            className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0, 15, 28, 0.45) 100%)',
            }}
          />
        )}

        {/* Optional 2.39:1 CinemaScope letterbox bars (toggleable) */}
        {aspect239 && (
          <>
            <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-black/95 z-[2] transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-black/95 z-[2] transition-all duration-500" />
          </>
        )}
      </div>
    );
  }
);

VideoBackground.displayName = 'VideoBackground';
