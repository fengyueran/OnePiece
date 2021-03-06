import PDFJS from 'pdfjs-dist';
import { renderPage } from './page';

PDFJS.GlobalWorkerOptions.workerSrc = 'external/pdf/pdf.worker.js';


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

class PDFLoader {
  constructor(viewer, option = {}) {
    const { workerSrc } = option;
    if (workerSrc) {
      PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
    }
    const pageWidth = option.pageWidth || 612;
    this._viewer = viewer;
    const _SCROLLBAR_WIDTH = 17;
    this._RENDER_OPTIONS = {
      pdfDocument: null,
      pageWidth: pageWidth - _SCROLLBAR_WIDTH,
      rotate: 0,
    };
  }

  _removeAllChild = (elem) => {
    while (elem.hasChildNodes()) {
      elem.removeChild(elem.firstChild);
    }
  };

  _loadPage = async (pdfPath, pdf) => {
    this._RENDER_OPTIONS.pdfDocument = pdf;
    if (this._viewer) this._viewer.innerHTML = '';
    const NUM_PAGES = pdf.pdfInfo.numPages;
    const pages = [];
    for (let i = 0; i < NUM_PAGES; i++) {
      await renderPage(i + 1, this._RENDER_OPTIONS).then(([pdfPage, page]) => { //eslint-disable-line
        pages.push(page);
      });
    }
    this._removeAllChild(this._viewer);
    for (let i = 0; i < NUM_PAGES; i++) {
      const page = pages[i];
      this._viewer.appendChild(page);
    }
    return NUM_PAGES;
  };
  
  loadPDF = pdfPath => new Promise((resolve, reject) => {
    const createTask = () => {
      this._loadTask = PDFJS.getDocument(pdfPath);
      this._loadTask.then((pdf) => {
        this._loadPage(pdfPath, pdf).then((pageNums) => {
          resolve({ pageNums, pdfPath });
        });
      }).catch((e) => {
        console.error('Load pdf error:', e);
        reject({ e, pdfPath }); //eslint-disable-line
      });
    };
  
    if (this._loadTask) {
      this._loadTask.destroy().then(() => {
        createTask();
      });
    } else {
      createTask();
    }
  });
}

export default PDFLoader;