import React, { useEffect, useRef, useState } from "react";


interface MusicPlayerProps {
src: string;
autoStart: boolean; // whether to attempt autoplay after user gesture
}


export const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, autoStart }) => {
// This component will play background music in a forever loop
const audioRef = useRef<HTMLAudioElement | null>(null);
const [enabled, setEnabled] = useState<boolean>(false);


useEffect(() => {
// This effect will attempt to start/resume audio when enabled changes
const audio = audioRef.current;
if (!audio) return;
audio.loop = true;
if (enabled) {
audio.play().catch(() => {/* Autoplay may be blocked; user can toggle */});
} else {
audio.pause();
}
}, [enabled]);


useEffect(() => {
// This effect will enable music after an initial user gesture if autoStart is true
if (!autoStart) return;
const unlock = () => {
setEnabled(true);
window.removeEventListener("click", unlock);
window.removeEventListener("keydown", unlock);
window.removeEventListener("touchstart", unlock);
};
window.addEventListener("click", unlock, { once: true });
window.addEventListener("keydown", unlock, { once: true });
window.addEventListener("touchstart", unlock, { once: true });
return () => {
window.removeEventListener("click", unlock);
window.removeEventListener("keydown", unlock);
window.removeEventListener("touchstart", unlock);
};
}, [autoStart]);


return (
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
<audio ref={audioRef} src={src} preload="auto" />
<button onClick={() => setEnabled(e => !e)} aria-label="Toggle music">
{enabled ? "🔊 Music: On" : "🔇 Music: Off"}
</button>
</div>
);
};