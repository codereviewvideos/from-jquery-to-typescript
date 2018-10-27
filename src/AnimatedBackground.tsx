import * as React from 'react';
import './AnimatedBackground.css';

type colourType = [number, number, number];

interface IAnimatedBackgroundState {
  colourIndices: number[],
  colours: colourType[],
  gradientSpeed: number,
  step: number
}

class AnimatedBackground extends React.Component<any, IAnimatedBackgroundState> {

  private interval: any;

  public constructor(props: any) {
    super(props);
    
    this.state = {
      colourIndices: [0, 1, 2, 3],
      colours: [
        [62, 35, 255],
        [60, 255, 60],
        [255, 35, 98],
        [45, 175, 230],
        [255, 0, 255],
        [255, 128, 0]
      ],
      gradientSpeed: 0.002,
      step: 0,
    };
  }

  public componentDidMount(): void {
    this.interval = setInterval(() => this.updateGradient(), 10);
  }

  public componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  public render() {
    const [colour1, colour2] = this.determineNextColourCombo();

    const css = {
      background: "-webkit-gradient(linear, left top, right top, from("+colour1+"), to("+colour2+"))"
    };

    return (
      <div className="AnimatedBackground" style={css}>
        hello
      </div>
    );
  }
  
  private determineNextColourCombo(): [string, string] {
    
    const {colours, colourIndices, step} = this.state;
    
    const c00 = colours[colourIndices[0]];
    const c01 = colours[colourIndices[1]];
    const c10 = colours[colourIndices[2]];
    const c11 = colours[colourIndices[3]];

    const istep = 1 - step;
    const r1 = Math.round(istep * c00[0] + step * c01[0]);
    const g1 = Math.round(istep * c00[1] + step * c01[1]);
    const b1 = Math.round(istep * c00[2] + step * c01[2]);
    const colour1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    const r2 = Math.round(istep * c10[0] + step * c11[0]);
    const g2 = Math.round(istep * c10[1] + step * c11[1]);
    const b2 = Math.round(istep * c10[2] + step * c11[2]);
    const colour2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    console.log('next colours', [colour1, colour2]);

    return [colour1, colour2];
  }

  private updateGradient() {
    const {colours, colourIndices, gradientSpeed, step} = this.state;

    this.setState({
      step: step + gradientSpeed
    });

    if (step >= 1) {
      colourIndices[0] = colourIndices[1];
      colourIndices[2] = colourIndices[3];

      // pick two new target colour indices
      // do not pick the same as the current one
      colourIndices[1] = (colourIndices[1] + Math.floor(1 + Math.random() * (colours.length - 1))) % colours.length;
      colourIndices[3] = (colourIndices[3] + Math.floor(1 + Math.random() * (colours.length - 1))) % colours.length;

      this.setState({
        step: step % 1
      });
    }
  }
}

export default AnimatedBackground;
