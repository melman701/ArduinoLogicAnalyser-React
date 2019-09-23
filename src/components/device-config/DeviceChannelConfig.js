import React from 'react';

class DeviceChannelConfig extends React.Component {
    render() {
        return (
            <div className="device-channel-container">
                <label>
                    <input 
                        type="checkbox"
                        value={this.props.config.enabled}
                        onChange={() => this._toggleEnabled()}
                        />
                    {`CH ${this.props.channel + 1} Enabled`}
                </label>
            </div>
        );
    }

    _toggleEnabled() {
        let cfg = this.props.config;
        cfg.enabled = !cfg.enabled;
        this.props.onUpdateConfig(this.props.channel, cfg);
    }
}

export default DeviceChannelConfig;