import React from 'react';

import Preloader from '../../preloader.jsx';

class MeasureIntegrated extends React.Component {
  constructor(props) {
    super(props);

    // Bind this to methods
    this.updateRevision = this.updateRevision.bind(this);
    this.returnInnerHTML = this.returnInnerHTML.bind(this);
    // this.returnInstruction = this.returnInstruction.bind(this);
  }

  render() {
    return (
      <div id="editor-new">
          <div className="text" ref={(el) => { this.textInput = el; }}
              dangerouslySetInnerHTML={this.returnInnerHTML(this.props.revisionText)}
              onKeyUp={this.updateRevision}>
          </div>

        <div className="text-heading">
          <h2>Ihr Text</h2>
        </div>

        <div className="key-questions">
          <h2>Leitfragen</h2>
        </div>

        <div className="button">
          <a onClick={this.props.analyzeRevision}
             className="waves-effect waves-light btn" id="editor-button">Weiter</a>
        </div>

        <div className="instruction"
          dangerouslySetInnerHTML={this.returnInnerHTML(this.props.instruction)}>
        </div>
      </div>
    )
  }

  /**
   * Return dangerous html to editor
   * @return {dict} html
   */
  returnInnerHTML(text) {
    return {__html: text}
  }

  /**
   * Return instruction but dangerous
   */
  // returnInstruction() {
  //   return {__html: this.props.instruction}
  // }

  // We need to store the revision in a state variable
  // in order to process it afterwards. Otherwise we will
  // lose the changes when the component is mounted again
  updateRevision() {
    this.props.updateRevision(this.textInput.innerHTML);
  }

  /**
   * Enable Medium Editor after component mounted
   * @return {undefined}
   */
  componentDidMount() {
    // Enable editor
    var editor = new MediumEditor(this.textInput, {
      toolbar: false,
      placeholder: {
        // text: '',
        hideOnClick: true
      },
    });
  }

  /**
   * Update component only if editor is not currently
   * visible
   * @return {Boolean} True if editor is not visible false otherwise
   */
  shouldComponentUpdate() {
    if (this.props.editorVisible) {
      return false;
    }

    return true;
  }
};

export default MeasureIntegrated;
