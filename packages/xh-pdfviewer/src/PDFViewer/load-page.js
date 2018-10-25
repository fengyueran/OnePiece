import PDFJS from 'pdfjs-dist';
import { renderPage } from './page';

PDFJS.GlobalWorkerOptions.workerSrc = process.env.NODE_ENV === 'development'
  ? 'node_modules/pdfjs-dist/build/pdf.worker.js'
  : 'external/pdf/pdf.worker.js'; 

const RENDER_OPTIONS = {
  pdfDocument: null,
  pageWidth: 400,
  rotate: 0,
};


let documentId;
let PAGE_HEIGHT;

let NUM_PAGES = 0;
let loadTask;

// document.getElementById('content-wrapper').addEventListener('scroll', function (e) {
//   let visiblePageNum = Math.round(e.target.scrollTop / PAGE_HEIGHT) + 1;
//   let visiblePage = document.querySelector(`
//   .page[data-page-number="${visiblePageNum}"][data-loaded="false"]`);
//   if (visiblePage) {
//     setTimeout(function () {
//       tool.renderPage(visiblePageNum, RENDER_OPTIONS);
//     });
//   }
// });

const removeAllChild = (elem) => {
  while (elem.hasChildNodes()) {
    elem.removeChild(elem.firstChild);
  }
};

const loadPage = async (pdfPath, pdf) => {
  RENDER_OPTIONS.pdfDocument = pdf;
  RENDER_OPTIONS.documentId = pdfPath;
  const viewer = document.getElementById('PDF_VIEWER');
  if (viewer) viewer.innerHTML = '';
  NUM_PAGES = pdf.pdfInfo.numPages;
  localStorage.setItem('pageNums', NUM_PAGES);
  const pages = [];
  for (let i = 0; i < NUM_PAGES; i++) {
    await renderPage(i + 1, RENDER_OPTIONS).then(([pdfPage, annotations, page]) => { //eslint-disable-line
      const viewport = pdfPage.getViewport(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate);
      PAGE_HEIGHT = viewport.height;
      pages.push(page);
    });
  }
  removeAllChild(viewer);
  for (let i = 0; i < NUM_PAGES; i++) {
    const page = pages[i];
    viewer.appendChild(page);
  }
  return NUM_PAGES;
};

export const loadPDF = pdfPath => new Promise((resolve, reject) => {
  const createTask = () => {
    loadTask = PDFJS.getDocument(pdfPath);
    loadTask.then((pdf) => {
      loadPage(pdfPath, pdf).then((pageNums) => {
        resolve({ pageNums, documentId: pdfPath });
      });
    }).catch((e) => {
      reject({ e, documentId:pdfPath }); //eslint-disable-line
    });
  };

  if (loadTask) {
    loadTask.destroy().then(() => {
      createTask();
    });
  } else {
    createTask();
  }
});

export const readyToLoadPDF = async (pdfPath) => {
  documentId = pdfPath;
  const viewer = document.getElementById('PDF_WIDGET');
  const scrollBarWidth = 17;
  if (viewer) RENDER_OPTIONS.pageWidth = viewer.clientWidth - scrollBarWidth;
  return await loadPDF(pdfPath); //eslint-disable-line
};