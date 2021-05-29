import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const devOnly = process.env.NODE_ENV === 'development';

/**
 * @deprecated
 */
const stringifySvg = (element: ReactElement) =>
  encodeURIComponent(renderToStaticMarkup(element));

/**
 * @deprecated
 */
export const convertSvgToDataUrl = (element: ReactElement) =>
  `url('data:image/svg+xml,${stringifySvg(element)}')`;
