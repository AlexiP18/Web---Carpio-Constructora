declare module 'vanta/dist/vanta.waves.min.js' {
  const VANTA: {
    WAVES: (options: Record<string, unknown>) => {
      setOptions?: (options: Record<string, unknown>) => void;
      destroy?: () => void;
    };
  };

  export default VANTA;
}
