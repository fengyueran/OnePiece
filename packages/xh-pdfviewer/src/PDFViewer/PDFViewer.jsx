
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PDFLoader from './pdf-loader';
import Spinner from './Spinner';

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

const LoadStatus = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: white;
  justify-content: center;
  border: 1px solid darkgray; 
  position: absolute;
  left: 0;
  top: 0;
  span {
    font-size: 20px;
    color: #4A4A4A;
  }
`;


const LoaddingStatus = ({ error }) => (
  <LoadStatus>
    {
      error ? <span>加载失败</span>
        : <Spinner />
    }
  </LoadStatus>);

LoaddingStatus.propTypes = {
  error: PropTypes.bool.isRequired,
};

class PDFViewer extends React.Component {
  state = {
    pageLoading: true,
    loadError: false,
  }

  static propTypes = {
    pdfPath: PropTypes.string.isRequired,
    workerSrc: PropTypes.string,
  };

  componentDidMount() {
    const { pdfPath, workerSrc } = this.props;
    const viewerContainer = document.getElementById('PDF_WIDGET');
    const width = viewerContainer.clientWidth;
    const viewer = document.getElementById('PDF_VIEWER');
    
    this.pdfLoader = new PDFLoader(viewer, { pageWidth: width, workerSrc });
    this.pdfLoader.loadPDF(pdfPath).then(() => {
      if (!this.unMount) this.setState({ pageLoading: false, loadError: false });
    }).catch((e) => {
      if (!this.unMount) this.setState({ pageLoading: true, loadError: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pdfPath !== this.props.pdfPath) { // eslint-disable-line
      this.setState({ pageLoading: true, loadError: false });
      const pdfPath = nextProps.pdfPath;
      this.pdfLoader.loadPDF(pdfPath).then((res) => {
        const needPostSuccess = res.pdfPath === pdfPath;
        if (needPostSuccess) {
          this.setState({ pageLoading: false, loadError: false });
        }
      }).catch((res) => {
        const needPostError = res.pdfPath === pdfPath;
        if (needPostError) {
          this.setState({ pageLoading: true, loadError: true });
        }
      });
    } 
  }

  componentWillUnmount() {
    this.unMount = true;
  }

  render() {
    const { pageLoading, loadError } = this.state;
    return (
      <ViewerContainer id="PDF_WIDGET">
        <Content id="PDF_WRAPPER">
          <Viewer id="PDF_VIEWER" /> 
        </Content>
        {
          pageLoading && <LoaddingStatus error={loadError} />
        }
      </ViewerContainer>);
  }
}

export default PDFViewer;
