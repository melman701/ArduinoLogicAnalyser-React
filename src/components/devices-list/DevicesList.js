import React from 'react';
import DeviceItem from './DeviceItem';

class DevicesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedDevice: null};
    }

    render() {
        return (
            <div className="devices-list-container">
                <fieldset>
                    <legend>Devices</legend>
                    <button onClick={() => this.props.onRefresh()}>Refresh</button>
                    <div className="devices-list">
                        <ul>
                            {this.props.devices.map((device, index) =>
                                <DeviceItem
                                    key={index}
                                    name={device}
                                    checked={this.state.selectedDevice === device}
                                    onSelect={(name) => this._onSelected(name)}
                                />
                            )}
                        </ul>
                    </div>
                    <button 
                        onClick={() => this.props.onOpen(this.state.selectedDevice)}
                        disabled={!this.props.isOpenButtonEnabled || !this.state.selectedDevice}>
                        Open
                    </button>
                    <button 
                        onClick={() => this.props.onClose()}
                        disabled={!this.props.isCloseButtonEnabled}>
                        Close
                    </button>
                </fieldset>
            </div>
        );
    }

    _onSelected(name) {
        this.setState({selectedDevice: name});
    } 
}

export default DevicesList;