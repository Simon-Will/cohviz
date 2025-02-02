import React from 'react';

import Preloader from '../../preloader.jsx';
import Instruction from '../instruction.jsx';
import StaticCmap from './static-cmap.jsx';
import ControlGroup from './control-group.jsx';
import CognitiveLoadMiddle from '../cognitive-load-middle.jsx';

class Segmented extends React.Component {
  constructor(props) {
    super(props);

    // Bind this to methods
    this.updateRevision = this.updateRevision.bind(this);
    this.returnInnerHTML = this.returnInnerHTML.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderRevision = this.renderRevision.bind(this);
    this.renderFeedbackAgain = this.renderFeedbackAgain.bind(this);
    this.renderMentalEffort = this.renderMentalEffort.bind(this);

    // Set state
    this.state = {
      showFeedback: true,
      showVideo: false,
      showFeedbackAgain: false,
      showMentalEffort: false,
      showRevision: false
    };
  }

  render() {
    // Set content variable
    let content = null;

    // Render according to state
    if (this.state.showFeedback) {
      content = <StaticCmap
                  draftText={this.props.draftText}
                  draftAnalyzed={this.props.draftAnalyzed}
                  revisionText={this.props.revisionText}
                  editorVisible={this.props.editorVisible}
                  nextRender={this.renderVideo} />;
    } else if (this.state.showFeedbackAgain) {
      content = <StaticCmap
                  draftText={this.props.draftText}
                  draftAnalyzed={this.props.draftAnalyzed}
                  revisionText={this.props.revisionText}
                  editorVisible={this.props.editorVisible}
                  nextRender={this.renderMentalEffort} />;
    } else if (this.state.showMentalEffort) {
      content = <CognitiveLoadMiddle updateDraft={this.renderRevision} />;
    // Instructional Video on global cohesion
    } else if (this.state.showVideo) {
      content = <Instruction
              instructionText={this.props.measurement.instruction_second}
              renderNextState={this.renderFeedbackAgain}
              seenInstruction={true}
              draftAnalyzed={true}/>;
    // Revise text
    } else if (this.state.showRevision) {
      content = <ControlGroup updateRevision={this.props.updateRevision}
                              draftText={this.props.draftText}
                              editorVisible={this.props.editorVisible}
                              analyzeRevision={this.props.analyzeRevision} />;
    }

    return (
      <div className="row">
        {content}
      </div>
    )
  }

  /**
   * Render Video
   */
  renderVideo() {
    // Update state after user clicks revision
    this.setState({
      showVideo: true,
      showFeedbackAgain: false,
      showFeedback: false,
      showMentalEffort: false,
      showRevision: false
    });
  }

  renderFeedbackAgain() {
    // Update state after user clicks revision
    this.setState({
      showVideo: false,
      showFeedbackAgain: true,
      showFeedback: false,
      showMentalEffort: false,
      showRevision: false
    });
  }

  renderMentalEffort() {
    // Allow user to update text
    this.setState({
      showVideo: false,
      showFeedbackAgain: false,
      showFeedback: false,
      showMentalEffort: true,
      showRevision: false
    })
  }

  renderRevision(data) {
    // Update mental effort data
    this.props.updateEffortMiddle(data);

    // Allow user to update text
    this.setState({
      showVideo: false,
      showFeedbackAgain: false,
      showFeedback: false,
      showMentalEffort: false,
      showRevision: true
    })
  }

  /**
   * Return dangerous html to editor
   * @return {dict} html
   */
  returnInnerHTML() {
    return {__html: this.props.draftText}
  }

  // We need to store the revision in a state variable
  // in order to process it afterwards. Otherwise we will
  // lose the changes when the component is mounted again
  updateRevision() {
    this.props.updateRevision(this.textInput.innerHTML);
  }
};

export default Segmented;
