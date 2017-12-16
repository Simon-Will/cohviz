class CognitiveLoadRevision extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstQuestionClicked: false,
      secondQuestionClicked: false,
      fourthQuestionClicked: false,
      accuracyRevisionLocalClicked: false,
      accuracyRevisionGlobalClicked: false
    };

    this.buttonInteraction = this.buttonInteraction.bind(this);
  }

  render() {

    // Only render button after every item has been clicked
    var button = '';
    if (this.state.firstQuestionClicked && this.state.secondQuestionClicked &&
        this.state.fourthQuestionClicked && this.state.accuracyRevisionLocalClicked &&
        this.state.accuracyRevisionGlobalClicked) {
      button = <div className="container row">
          <a id="instruction-read" className="waves-effect waves-light btn"
          onClick={this.buttonInteraction}>STOP. Warten Sie auf weitere Instruktionen</a>
        </div>;
    }

    return (
      <div className="cognitiveload">
        <div className="container row">
          <p className="strong-p">Wie stark hast du dich bei der Überarbeitung deiner Erklärung angestrengt?</p>
          <div className="col s4 m2">
            <p>gar nicht angestrengt</p>
          </div>
          <div className="col s4 m3">
            <p className="range-field">
              <input
                ref={(el) => { this.firstQuestion = el; }}
                type="range" id="question1" min="1" max="9"
                onMouseDown={() => this.setState({firstQuestionClicked: true})} />
            </p>
          </div>
          <div className="col s4 m2">
            <p>sehr stark angestrengt</p>
          </div>
        </div>
        <div className="container row">
          <p className="strong-p">Wie schwierig war es für dich, deine Erklärung zu überarbeiten?</p>
          <div className="col s4 m2">
            <p>sehr schwierig</p>
          </div>
          <div className="col s4 m3">
            <p className="range-field">
              <input
                ref={(el) => { this.secondQuestion = el; }}
                type="range" id="question2" min="1" max="9"
                onMouseDown={() => this.setState({secondQuestionClicked: true})} />
            </p>
          </div>
          <div className="col s4 m2">
            <p>gar nicht schwierig</p>
          </div>
        </div>
        <div className="container row">
          <p className="strong-p">Wie hoch schätzt du die Verständlichkeit deiner überarbeiteten Erklärung ein?</p>
          <div className="col s4 m2">
            <p>0% (gar nicht verständlich)</p>
          </div>
          <div className="col s4 m3">
            <p className="range-field">
              <input ref={(el) => { this.fourthQuestion = el; }}
                type="range" id="question4" min="0" max="100"
                onMouseDown={() => this.setState({fourthQuestionClicked: true})} />
            </p>
          </div>
          <div className="col s4 m2">
            <p>100% (sehr verständlich)</p>
          </div>
        </div>
        <div className="container row">
          <p className="strong-p">Wie hoch schätzt du die lokale Kohäsion deiner überarbeiteten Erklärung ein?</p>
          <div className="col s4 m2">
            <p>0% (gar nicht lokal kohäsiv)</p>
          </div>
          <div className="col s4 m3">
            <form action="#">
            <p className="range-field">
              <input ref={(el) => { this.accuracyRevisionLocal = el; }}
                type="range" id="accuracyLocal" min="0" max="100"
                onMouseDown={() => this.setState({accuracyRevisionLocalClicked: true})} />
            </p>
            </form>
          </div>
          <div className="col s4 m2">
            <p>100% (vollkommen lokal kohäsiv)</p>
          </div>
        </div>
        <div className="container row">
          <p className="strong-p">Wie hoch schätzt du die globale Kohäsion deiner überarbeiteten Erklärung ein?</p>
          <div className="col s4 m2">
            <p>gar nicht global kohäsiv</p>
          </div>
          <div className="col s4 m3">
            <p className="range-field">
              <input ref={(el) => { this.accuracyRevisionGlobal = el; }}
                type="range" id="accuracyGlobal" min="0" max="100"
                onMouseDown={() => this.setState({accuracyRevisionGlobalClicked: true})} />
            </p>
          </div>
          <div className="col s4 m2">
            <p>vollkommen global kohäsiv</p>
          </div>
        </div>
        {button}
      </div>
    )
  }

  buttonInteraction() {
    // Data of all questions
    var data = {'firstQuestion': this.firstQuestion.value,
                'secondQuestion': this.secondQuestion.value,
                'fourthQuestion': this.fourthQuestion.value,
                'accuracyRevisionLocal': this.accuracyRevisionLocal.value,
                'accuracyRevisionGlobal': this.accuracyRevisionGlobal.value};

    // Update draft in parent
    this.props.updateRevision(data);
  }
};


export default CognitiveLoadRevision;
