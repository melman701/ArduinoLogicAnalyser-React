import React from 'react';

class DeviceItem extends React.Component {
    render() {
        return (
            <li>
                <label>
                    <input
                        type="radio"
                        checked={this.props.checked}
                        onChange={() => this.props.onSelect(this.props.name)}
                    />
                    {this.props.name}
                </label>
            </li>
        );
    }
}

export default DeviceItem;