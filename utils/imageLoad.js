// https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.js
export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#9c9c9c" offset="20%" />
      <stop stop-color="#636363" offset="50%" />
      <stop stop-color="#9c9c9c" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#9c9c9c" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);
