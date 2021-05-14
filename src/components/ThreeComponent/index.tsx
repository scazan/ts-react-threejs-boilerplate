import React from 'react';
import StyledThreeComponent from './style';
import ThreeCanvas from 'classes/ThreeCanvas';
import AppState from 'stores/App';

interface IState {
  initialized: boolean;
}

class ThreeComponent extends React.Component<{}, IState> {
  private visualizationEl: React.RefObject<HTMLDivElement>;
  static contextType = AppState;

  constructor(props: any) {
    super(props);

    this.state = {
      initialized: false,
    };

    this.visualizationEl = React.createRef();
  }

  componentDidUpdate() {
    // const { SOME_VAR } = this.context; // get a var from React Context
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.init();
    }
  }

  init = () => {
    // const appState = this.context; // access to the React Context store

    const threeCanvas = new ThreeCanvas({
      mountPoint: this.visualizationEl.current,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // start draw loop
    this.startDrawing(threeCanvas);
    this.setState({initialized: true});

    console.log('init');
  }

  startDrawing(threeCanvas: ThreeCanvas) {
    const renderLoop = () => {
      threeCanvas.render();
    };

    threeCanvas.setAnimationLoop(renderLoop);
  }

  render() {
    return (
      <StyledThreeComponent
        className="threeComponent"
        initialized={this.state.initialized}
      >
        <div className="visualizationMount" ref={this.visualizationEl}>
        </div>
      </StyledThreeComponent>
    );
  }
}

export default ThreeComponent;
