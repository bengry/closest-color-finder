import * as React from 'react';
import * as createNearestColor from 'nearest-color';
import { ColorItem } from './ColorItem';

const fabricColrors = [
  ['themeDarker', '#004578'],
  ['themeDark', '#005a9e'],
  ['themeDarkAlt', '#106ebe'],
  ['themePrimary', '#0078d4'],
  ['themeSecondary', '#2b88d8'],
  ['themeTertiary', '#71afe5'],
  ['themeLight', '#c7e0f4'],
  ['themeLighter', '#deecf9'],
  ['themeLighterAlt', '#eff6fc'],
  ['black', '#000000'],
  ['neutralDark', '#212121'],
  ['neutralPrimary', '#333333'],
  ['neutralPrimaryAlt', '#3c3c3c'],
  ['neutralSecondary', '#666666'],
  ['neutralTertiary', '#a6a6a6'],
  ['neutralTertiaryAlt', '#c8c8c8'],
  ['neutralQuaternary', '#d0d0d0'],
  ['neutralQuaternaryAlt', '#dadada'],
  ['neutralLight', '#eaeaea'],
  ['neutralLighter', '#f4f4f4'],
  ['neutralLighterAlt', '#f8f8f8'],
  ['white', '#ffffff'],
  ['yellow', '#ffb900'],
  ['yellowLight', '#fff100'],
  ['orange', '#d83b01'],
  ['orangeLight', '#ea4300'],
  ['orangeLighter', '#ff8c00'],
  ['redDark', '#a80000'],
  ['red', '#e81123'],
  ['magentaDark', '#5c005c'],
  ['magenta', '#b4009e'],
  ['magentaLight', '#e3008c'],
  ['purpleDark', '#32145a'],
  ['purple', '#5c2d91'],
  ['purpleLight', '#b4a0ff'],
  ['blueDark', '#002050'],
  ['blueMid', '#00188f'],
  ['blue', '#0078d4'],
  ['blueLight', '#00bcf2'],
  ['tealDark', '#004b50'],
  ['teal', '#008272'],
  ['tealLight', '#00B294'],
  ['greenDark', '#004b1c'],
  ['green', '#107c10'],
  ['greenLight', '#bad80a'],
];

export class NearestColorContainer extends React.PureComponent {
  state = {
    input: '',
    input2: '',
    colors: fabricColrors,
    nearestColor: null,
  };

  addColor = () => {
    this.setState(state => ({
      colors: [...state.colors, state.input],
      input: '',
    }));
  };

  findNearestColor = color => {
    const colorCodes = this.state.colors.map(([name, code]) => code);
    const nearestColorGen = createNearestColor.from(colorCodes);
    const nearestColorCode = nearestColorGen(color);
    if (!nearestColorCode) {
      return;
    }

    const nearestColor = this.state.colors.find(
      ([name, code]) => code.toLowerCase() === nearestColorCode.toLowerCase()
    );

    this.setState({ nearestColor });
  };

  render() {
    const { input, colors } = this.state;
    return (
      <React.Fragment>
        <div>
          <span>Add color:</span>
          <input
            type="text"
            value={input}
            onKeyDown={e => e.keyCode === 13 && this.addColor()}
            onChange={e => this.setState({ input: e.target.value })}
          />
          <button onClick={this.addColor}>Add</button>
        </div>

        <ul>
          {colors.map(([displayName, color]) => (
            <ColorItem colorCode={color} displayName={displayName} />
          ))}
        </ul>

        <div>
          <span>Nearest color to:</span>
          <input onChange={e => this.findNearestColor(e.target.value)} />

          {this.state.nearestColor && (
            <div>
              <span>Nearest color:</span>
              <span>{JSON.stringify(this.state.nearestColor)}</span>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
