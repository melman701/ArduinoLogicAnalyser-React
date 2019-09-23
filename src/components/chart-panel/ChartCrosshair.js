import React from 'react';

class ChartCrosshair extends React.Component {
    render() {
        return (
            <div className="rv-crosshair__inner rv-crosshair__inner--right">
                <div className="rv-crosshair__inner__content">
                    <div>
                        <div className="rv-crosshair__title">
                            <span className="rv-crosshair__title__title">
                                {'Time'}
                            </span>
                            {': '}
                            <span className="rv-crosshair__title__value">
                                {this.props.time}
                            </span>
                        </div>
                        <div className="rv-crosshair__item">
                            <span className="rv-crosshair__item__title">
                                {'Sec'}
                            </span>
                            {': '}
                            <span className="rv-crosshair__item__value">
                                {this.props.seconds}
                            </span>
                        </div>
                        <div className="rv-crosshair__item">
                            <span className="rv-crosshair__item__title">
                                {'V'}
                            </span>
                            {': '}
                            <span className="rv-crosshair__item__value">
                                {this.props.v}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartCrosshair;