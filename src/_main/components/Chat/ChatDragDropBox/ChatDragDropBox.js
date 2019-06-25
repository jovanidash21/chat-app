import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

class ChatDragDropBox extends Component {
  constructor(props) {
    super(props);
  }
  handleDragDropBoxToggle(event) {
    event.preventDefault();

    const { handleDragDropBoxToggle } = this.props;

    handleDragDropBoxToggle();
  }
  handleSelectFile(event) {
    const { handleSelectFile } = this.props;
    const fileName = event.target.value.split(/(\\|\/)/g).pop();

    handleSelectFile(fileName, event.target.files[0]);
  }
  render() {
    const { handleFilesDrop } = this.props;

    return (
      <Dropzone
        className="chat-drag-drop-box-wrapper"
        activeClassName="active"
        onDrop={handleFilesDrop}
        maxSize={1024 * 1024 * 2}
        disableClick
      >
        <div className="chat-drag-drop-box">
          <MediaQuery query="(min-width: 768px)">
            <div style={{textAlign: 'center'}}>
              <div className="title">
                Drop files to upload
              </div>
              or
            </div>
          </MediaQuery>
          <input
            id="file-uploader-button"
            type="file"
            onChange={::this.handleSelectFile}
          />
          <label
            htmlFor="file-uploader-button"
            className="mui-btn button button-default"
          >
            Select file
          </label>
          Maximum file size upload: 2MB
        </div>
        <div className="close-icon" onClick={::this.handleDragDropBoxToggle}>
          <FontAwesomeIcon icon="times" />
        </div>
      </Dropzone>
    )
  }
}

ChatDragDropBox.propTypes = {
  handleDragDropBoxToggle: PropTypes.func.isRequired,
  handleFilesDrop: PropTypes.func.isRequired,
  handleSelectFile: PropTypes.func.isRequired,
}

export default ChatDragDropBox;
