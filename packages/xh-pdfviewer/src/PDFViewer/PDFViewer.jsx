
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { readyToLoadPDF, loadPDF } from './load-page';

const ViewerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center !important;
  height: 100%;
  width: 100%;
  min-width: 100px;
  min-height: 400px;
`;

const Content = styled.div`
  position: absolute;
  border: 1px solid darkgray; 
  height: 100%;
  overflow-y: auto !important; 
  overflow-x: hidden;
  width: 100%;
  top: 0;
  left: 0;
`;

const Viewer = styled.div`
  height: 100%;
  .canvasWrapper {
    height: 100%;
    box-shadow: 0 0 3px #bbb;
  }
  .page {
    direction: ltr;
    height: 100%;
    margin: 1px auto -8px auto;
    position: relative;
    overflow: visible;
    background-color: white;
  }
`;
// const Spanner = ({ error }) => (
//   <div className="loadStatus">
//     {
//       error ? <span>加载失败</span> : <div className="spanner">
//         <div className="loader" />
//       </div>
//     }
//   </div>);


// Spanner.propTypes = {
//   error: PropTypes.bool,
// };

class PDFViewer extends React.Component {
  state = {
    pageLoading: true,
    loadError: false,
    shouldShowDialog: false,
  }

  static propTypes = {
    pdfPath: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { pdfPath } = this.props;
    readyToLoadPDF(pdfPath).then(({ pageNums }) => {
      if (!this.unMount) this.setState({ pageLoading: false, loadError: false });
    }).catch((e) => {
      if (!this.unMount) this.setState({ pageLoading: true, loadError: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pdfPath !== this.props.pdfPath) { // eslint-disable-line
      this.setState({ pageLoading: true, loadError: false, shouldShowDialog: false });
      const pdfPath = nextProps.pdfPath;
      this.loadTask = loadPDF(pdfPath).then(({ documentId }) => {
        if (documentId === pdfPath) {
          this.setState({ pageLoading: false, loadError: false });
        }
      }).catch(({ e, documentId }) => {
        if (documentId === pdfPath) {
          this.setState({ pageLoading: true, loadError: true });
        }
      });
    } 
  }

  componentWillUnmount() {
    this.unMount = true;
  }

  render() {
    const { pdfPath } = this.props;
    const { pageLoading, shouldShowDialog, loadError } = this.state;
    return (
      <ViewerContainer id="PDF_WIDGET">
        <Content id="PDF_WRAPPER">
          <Viewer id="PDF_VIEWER" /> 
        </Content>
        {/* {
          pageLoading && <Spanner error={loadError} />
        } */}
      </ViewerContainer>);
  }
}

PDFViewer.propTypes = {
  pdfPath: PropTypes.string.isRequired,
};

export default PDFViewer;
