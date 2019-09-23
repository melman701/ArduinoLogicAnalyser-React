import React from 'react';
import DevicesList from '../devices-list';
import DeviceConfig from '../device-config';

class DevicesPanel extends React.Component {
    render() {
        return (
            <div className="devices-panel">
                <DevicesList
                    devices={this.props.devices}
                    isOpenButtonEnabled={this.props.activeActions.open}
                    isCloseButtonEnabled={this.props.activeActions.close}
                    onRefresh={() => this.props.onRefreshDevicesList()}
                    onOpen={(name) => this.props.onOpenDevice(name)}
                    onClose={() => this.props.onCloseDevice()}
                />
                <DeviceConfig
                    device={this.props.openedDevice}
                    onUpdateConfig={(config) => this.props.onDeviceConfigChanged(config)}
                />
                <button
                    onClick={() => this.props.onStart()}
                    disabled={!this.props.activeActions.start}>
                    Start
                </button>
                <button
                    onClick={() => this.props.onStop()}
                    disabled={!this.props.activeActions.stop}>
                    Stop
                </button>
            </div>
        );
    }
}

export default DevicesPanel;