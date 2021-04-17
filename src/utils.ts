import React, { ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const devOnly = process.env.NODE_ENV === 'development';

// export const stringifySvg = (SVG: React.FC<React.SVGProps<SVGSVGElement>>) =>
//   encodeURIComponent(renderToStaticMarkup(<SVG />));
