import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

export interface HlsPlayerProps {
  /** URL to the .m3u8 HLS playlist (e.g. from CloudFront) */
  src: string;
  /** Poster image shown before playback starts */
  poster?: string;
  /** Autoplay on mount (muted autoplay is recommended by browsers) */
  autoplay?: boolean;
  /** Show/hide native video.js controls */
  controls?: boolean;
  /** Muted playback */
  muted?: boolean;
  /** Loop playback */
  loop?: boolean;
  /** Width in px or CSS value */
  width?: string | number;
  /** Height in px or CSS value */
  height?: string | number;
  /** Extra class name for the wrapper */
  className?: string;
  /** Called once the player is ready */
  onReady?: (player: Player) => void;
  /** Called on player error */
  onError?: (error: unknown) => void;
}

/**
 * HlsPlayer
 *
 * A React wrapper around video.js configured for HLS streaming
 * (e.g. .m3u8 playlists served from S3 + CloudFront).
 *
 * video.js has built-in HLS support via video.js/http-streaming (VHS),
 * which is bundled automatically — no separate hls.js needed.
 */
const HlsPlayer: React.FC<HlsPlayerProps> = ({
  src,
  poster,
  autoplay = false,
  controls = true,
  muted = false,
  loop = false,
  width = '100%',
  height = 'auto',
  className,
  onReady,
  onError,
}) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Guard: only initialize once
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = videojs(
        videoElement,
        {
          autoplay,
          controls,
          muted,
          loop,
          responsive: true,
          fluid: height === 'auto',
          preload: 'auto',
          poster,
          sources: [
            {
              src,
              type: 'application/x-mpegURL', // HLS MIME type
            },
          ],
          html5: {
            vhs: {
              // Enables adaptive bitrate switching based on bandwidth
              overrideNative: true,
              enableLowInitialPlaylist: true,
              smoothQualityChange: true,
            },
          },
        },
        () => {
          onReady?.(player);
        }
      );

      player.on('error', () => {
        const error = player.error();
        onError?.(error);
      });

      playerRef.current = player;
    } else if (playerRef.current) {
      // Update source if `src` prop changes
      const player = playerRef.current;
      player.src({ src, type: 'application/x-mpegURL' });
    }
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dispose the player on unmount
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      data-vjs-player
      className={className}
      style={{ width, height }}
      ref={videoRef}
    />
  );
};

export default HlsPlayer;
