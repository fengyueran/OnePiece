/* eslint-disable */
// Template for creating a new page
const PAGE_TEMPLATE = `
  <div style="visibility: hidden;" class="page" data-loaded="false">
    <div class="canvasWrapper">
      <canvas></canvas>
    </div>
    <svg class="annotationLayer"></svg>
  </div>
`;

/**
 * Create a new page to be appended to the DOM.
 *
 * @param {Number} pageNumber The page number that is being created
 * @return {HTMLElement}
 */
export function createPage(pageNumber) {
  let temp = document.createElement('div');
  temp.innerHTML = PAGE_TEMPLATE;

  let page = temp.children[0];
  let canvas = page.querySelector('canvas');

  page.setAttribute('id', `pageContainer${pageNumber}`);
  page.setAttribute('data-page-number', pageNumber);

  canvas.mozOpaque = true;
  canvas.setAttribute('id', `page${pageNumber}`);

  return page;
}

/**
 * The following methods are taken from mozilla/pdf.js and as such fall under
 * the Apache License (http://www.apache.org/licenses/).
 *
 * Original source can be found at mozilla/pdf.js:
 * https://github.com/mozilla/pdf.js/blob/master/web/ui_utils.js
 */

/**
 * Approximates a float number as a fraction using Farey sequence (max order
 * of 8).
 *
 * @param {Number} x Positive float number
 * @return {Array} Estimated fraction: the first array item is a numerator,
 *                 the second one is a denominator.
 */
function approximateFraction(x) {
  // Fast path for int numbers or their inversions.
  if (Math.floor(x) === x) {
    return [x, 1];
  }

  const xinv = 1 / x;
  const limit = 8;
  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }

  const x_ = x > 1 ? xinv : x;
  
  // a/b and c/d are neighbours in Farey sequence.
  let a = 0, b = 1, c = 1, d = 1;
  
  // Limit search to order 8.
  while (true) {
    // Generating next term in sequence (order of q).
    let p = a + c, q = b + d;
    if (q > limit) {
      break;
    }
    if (x_ <= p / q) {
      c = p; d = q;
    } else {
      a = p; b = q;
    }
  }

  // Select closest of neighbours to x.
  if (x_ - a / b < c / d - x_) {
    return x_ === x ? [a, b] : [b, a];
  } else {
    return x_ === x ? [c, d] : [d, c];
  }
}

function getOutputScale(ctx) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                          ctx.mozBackingStorePixelRatio ||
                          ctx.msBackingStorePixelRatio ||
                          ctx.oBackingStorePixelRatio ||
                          ctx.backingStorePixelRatio || 1;
  const pixelRatio = devicePixelRatio / backingStoreRatio;
  return {
    sx: pixelRatio,
    sy: pixelRatio,
    scaled: pixelRatio !== 1,
  };
}

function roundToDivide(x, div) {
  const r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}


/**
 * Scale the elements of a page.
 *
 * @param {Number} pageNumber The page number to be scaled
 * @param {Object} viewport The viewport of the PDF page (see pdfPage.getViewport(scale, rotate))
 * @param {Object} context The canvas context that the PDF page is rendered to
 * @return {Array} The transform data for rendering the PDF page
 */
function scalePage(page, viewport, context) {
  // const page = document.getElementById(`pageContainer${pageNumber}`);
  const canvas = page.querySelector('.canvasWrapper canvas');
  const wrapper = page.querySelector('.canvasWrapper');
  const outputScale = getOutputScale(context);
  const transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
  const sfx = approximateFraction(outputScale.sx);
  const sfy = approximateFraction(outputScale.sy);

  // Adjust width/height for scale
  page.style.visibility = '';
  canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
  canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
  canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
  canvas.style.height = roundToDivide(viewport.height, sfx[1]) + 'px';
  page.style.width = `${viewport.width}px`;
  page.style.height = `${viewport.height}px`;
  wrapper.style.width = `${viewport.width}px`;
  wrapper.style.height = `${viewport.height}px`;


  return transform;
}


export function renderPage(pageNumber, renderOptions) {
  const {
    pdfDocument,
    pageWidth,
    rotate,
  } = renderOptions;

  // Load the page and annotations
  return pdfDocument.getPage(pageNumber).then((pdfPage) => {
    const page = createPage(pageNumber);
    // const page = document.getElementById(`pageContainer${pageNumber}`);
    const canvas = page.querySelector('.canvasWrapper canvas');
    const canvasContext = canvas.getContext('2d');
    let viewport = pdfPage.getViewport(1, rotate);
    const scale = pageWidth / viewport.width;
    viewport = pdfPage.getViewport(scale, rotate);
    const transform = scalePage(page, viewport, canvasContext);

    // Render the page
    return pdfPage.render({ canvasContext, viewport, transform }).then(() => {
      // Indicate that the page was loaded
      page.setAttribute('data-loaded', 'true');
      return [pdfPage,, page];
    });
  });
}