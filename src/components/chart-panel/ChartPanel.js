import React from 'react';
import Chart from './Chart';

class ChartPanel extends React.Component {
    render() {
        return (
            <div className="chart-panel">
                {this.props.data.map(x =>
                    <Chart
                        key={x.deviceName + x.deviceChannel}
                        name={x.deviceName}
                        channel={x.deviceChannel}
                        data={x.channelData}
                    />
                )}
            </div>
        );
    }
}

export default ChartPanel;