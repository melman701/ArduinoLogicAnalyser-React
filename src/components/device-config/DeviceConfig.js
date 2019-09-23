import React from 'react';
import DeviceChannelConfig from './DeviceChannelConfig';

class DeviceConfig extends React.Component {
    render() {
        return (
            <div className="device-config-container">
                <fieldset>
                    <legend>
                        {this.props.device.name}
                    </legend>
                    <label>{this.props.device.channelsCount}</label>
                    {this.props.device.config.channelsConfig.map((chConfig, index) =>
                        <DeviceChannelConfig
                            key={index}
                            channel={index}
                            config={chConfig}
                            onUpdateConfig={(index, config) => this._updateChannelConfig(index, config)}
                        />
                    )}
                </fieldset>
            </div>
        );
    }

    _updateChannelConfig(index, config) {
        let cfg = this.props.device.config;
        cfg.channelsConfig[index] = config;
        this.props.onUpdateConfig(cfg);
    }
}

export default DeviceConfig;