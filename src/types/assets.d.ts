/// <reference types="astro/client" />

// Declaraciones de tipos para archivos multimedia
declare module '*.mov' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.avi' {
  const src: string;
  export default src;
}
