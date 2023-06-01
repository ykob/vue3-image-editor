export const degreesToRadians = (degree: number) => (degree * Math.PI) / 180;

export const loadImageAsync = (src: string) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img.src);
    };
  });
