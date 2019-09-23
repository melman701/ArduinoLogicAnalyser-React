import React from 'react';
import {
    XYPlot,
    VerticalGridLines,
    XAxis,
    LineSeries,
    Crosshair
} from 'react-vis';
import 'react-vis/dist/style.css';
import ChartCrosshair from './ChartCrosshair';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    getTimeInSeconds = v => (v / 1000000).toFixed(2);

    getWidth = (data) => {
        let idx = data.length - 1;
        return (data[idx] && data[idx].x / 200) || 500;
    };

    render() {
        return (
            <div className="chart-container">
                <div className="chart-info">
                    <p>{this.props.name}</p>
                    <p>{this.props.channel + 1}</p>
                </div>
                <div className="chart">
                    <XYPlot
                        width={this.getWidth(this.props.data)}
                        height={100}
                        onMouseLeave={() => this.setState({value: null})}
                        >
                        <VerticalGridLines />
                        <XAxis
                            title="Time, s"
                            tickFormat={this.getTimeInSeconds}
                            //tickLabelAngle={-90} 
                            //tickTotal={10}
                        />
                        <LineSeries
                            curve={'curveStepAfter'}
                            data={this.props.data}
                            onNearestX={(x) => this.setState({value: x})}/>
                        {this.state.value && 
                            <Crosshair values={[this.state.value]}>
                                <ChartCrosshair
                                    time={this.state.value.x}
                                    seconds={this.getTimeInSeconds(this.state.value.x)}
                                    v={this.state.value.y}
                                />
                            </Crosshair>
                        }
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default Chart;