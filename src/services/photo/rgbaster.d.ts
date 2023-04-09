declare module 'rgbaster' {
  type RgbaColor = [number, number, number, number];

  interface RgbasterResult {
    dominant: RgbaColor;
    secondary: RgbaColor[];
    palette: RgbaColor[];
  }

  interface RgbasterOptions {
    paletteSize?: number;
    exclude?: string[];
  }

  function rgbaster(
    image: string | HTMLImageElement | HTMLCanvasElement | Buffer | Buffer[],
    p: { scale: number },
  ): Promise<{ color: string; count: number }[]>;

  export default rgbaster;
}
