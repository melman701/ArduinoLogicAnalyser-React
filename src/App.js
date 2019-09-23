import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DeviceService} from './services';
import {Device} from './models';
import DevicesPanel from './components/devices-panel';
import ChartPanel from './components/chart-panel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      openedDevice: new Device(),
      started: false,
      activeActions: {
        open: true,
        close: false,
        start: false,
        stop: false,
      },
      data: []
    };
    this.timer = null;
    this.baseTime = null;
  }

  render() {
    return (
      <div className="app-container">
        <DevicesPanel
          devices={this.state.devices}
          openedDevice={this.state.openedDevice}
          activeActions={this.state.activeActions}
          onRefreshDevicesList={() => this._refreshDevicesList()}
          onOpenDevice={(name) => this._openDevice(name)}
          onCloseDevice={() => this._closeDevice()}
          onDeviceConfigChanged={(config) => this._updateDeviceConfig(config)}
          onStart={() => this._start()}
          onStop={() => this._stop()}
        />
        <ChartPanel
          data={
            //this._testData
            this.state.data
          }
        />
      </div>
    );
  }

  _isDeviceOpened() {
    return this.state.openedDevice.name != null;
  }

  _refreshDevicesList() {
    DeviceService.getDevicesList()
      .then((data) => {
          this.setState({devices: data});
      }, (error) => {
          console.error(error);
      });
  }

  _openDevice(name) {
    DeviceService.openDevice(name)
      .then(() => {
        let dev = this.state.openedDevice;
        dev.name = name;
        this.setState({
          openedDevice: dev,
          activeActions: {
            open: false,
            close: true,
            start: false,
            stop: false,
          }})
        return DeviceService.getDeviceInfo(name);
      }).then((info) => {
        if (info.channels) {
          this.setState({
            openedDevice: new Device(name, info.channels),
            activeActions: {
              open: false,
              close: true,
              start: true,
              stop: false,
            }});
        }
      }).catch((error) => console.error(error));
  }

  _closeDevice() {
    if (this._isDeviceOpened()) {
      DeviceService.closeDevice(this.state.openedDevice.name)
        .finally(() => {
          this.setState({
            openedDevice: new Device(),
            activeActions: {
              open: true,
              close: false,
              start: false,
              stop: false,
            }});
        });
    }
  }

  _updateDeviceConfig(config) {
    let dev = this.state.openedDevice;
    dev.config = config;
    this.setState({openedDevice: dev});
  }

  _start() {
    let dev = this.state.openedDevice;
    dev.config.enabled = true;
    this._initDevicesDataBuffer(dev);
    DeviceService.setDeviceConfig(dev.name, dev.config)
      .then(() => {
        this.timer = setInterval(() => this._getDeviceData(), 500);
        this.setState({
          activeActions: {
            open: false,
            close: false,
            start: false,
            stop: true,
          }});
      }).catch((error) => console.error(error));
  }

  _stop() {
    let dev = this.state.openedDevice;
    dev.config.enabled = false;
    clearInterval(this.timer);
    DeviceService.setDeviceConfig(dev.name, dev.config)
      .then(() => {
        this.setState({
          activeActions: {
            open: false,
            close: true,
            start: true,
            stop: false,
          }});
      }).catch((error) => console.error(error));
  }

  _getDeviceData() {
    DeviceService.getDeviceData(this.state.openedDevice.name)
      .then((data) => {
        if (data && data.length) {
          console.log(data);
          this._pushData(this.state.openedDevice.name, data);
        }
      });
  }

  _initDevicesDataBuffer(device) {
    let data = device.config.channelsConfig
      .map((x, index) => {
        return {
          channel: index,
          enabled: x.enabled
        };
      }).filter(x => x.enabled)
      .map(x => {
        return {
          deviceName: device.name,
          deviceChannel: x.channel,
          channelData: []
        };
      });
    this.setState({
      data: data
    });
    this.baseTime = 0;
  }

  _pushData(device, jsonDataArray) {
    let newData = jsonDataArray.map(x => JSON.parse(x));
    let d = newData.reduce((acc, value) => {
      if (!acc[value.ch]) {
        acc[value.ch] = [];
      }
      acc[value.ch].push(this._convertDeviceData(value));
      return acc;
    }, []);
    let data = this.state.data;
    let deviceData = data.filter(x => x.deviceName === device);
    d.forEach((x, index) => {
      let chData = deviceData.find(y => y.deviceChannel === index);
      chData.channelData = chData.channelData.concat(x);
    });
    console.log(data);
    this.setState({data: data});
  }

  _convertDeviceData(value) {
    let time = parseInt(value.time);
    if (!this.baseTime) {
      this.baseTime = time;
    }

    return {
      x: time - this.baseTime,
      y: parseInt(value.state)
    };
  }

  _testData = [
    {
      "deviceName": "COM3",
      "deviceChannel": 0,
      "channelData": [
        {
          "x": 0,
          "y": 0
        },
        {
          "x": 53996,
          "y": 1
        },
        {
          "x": 304888,
          "y": 0
        },
        {
          "x": 556784,
          "y": 1
        },
        {
          "x": 807660,
          "y": 0
        },
        {
          "x": 1058548,
          "y": 1
        },
        {
          "x": 1309428,
          "y": 0
        },
        {
          "x": 1560312,
          "y": 1
        },
        {
          "x": 1811188,
          "y": 0
        },
        {
          "x": 2062060,
          "y": 1
        },
        {
          "x": 2312948,
          "y": 0
        },
        {
          "x": 2563824,
          "y": 1
        },
        {
          "x": 2815728,
          "y": 0
        },
        {
          "x": 3066612,
          "y": 1
        },
        {
          "x": 3317484,
          "y": 0
        },
        {
          "x": 3568368,
          "y": 1
        },
        {
          "x": 3819248,
          "y": 0
        },
        {
          "x": 4070132,
          "y": 1
        },
        {
          "x": 4321008,
          "y": 0
        },
        {
          "x": 4571892,
          "y": 1
        },
        {
          "x": 4823796,
          "y": 0
        },
        {
          "x": 5074680,
          "y": 1
        },
        {
          "x": 5325556,
          "y": 0
        },
        {
          "x": 5576428,
          "y": 1
        },
        {
          "x": 5827320,
          "y": 0
        },
        {
          "x": 6078192,
          "y": 1
        },
        {
          "x": 6329068,
          "y": 0
        },
        {
          "x": 6579956,
          "y": 1
        },
        {
          "x": 6830832,
          "y": 0
        },
        {
          "x": 7082736,
          "y": 1
        },
        {
          "x": 7333612,
          "y": 0
        },
        {
          "x": 7584500,
          "y": 1
        },
        {
          "x": 7835376,
          "y": 0
        },
        {
          "x": 8086260,
          "y": 1
        },
        {
          "x": 8337140,
          "y": 0
        },
        {
          "x": 8588024,
          "y": 1
        },
        {
          "x": 8838900,
          "y": 0
        },
        {
          "x": 9090800,
          "y": 1
        },
        {
          "x": 9341688,
          "y": 0
        },
        {
          "x": 9592560,
          "y": 1
        },
        {
          "x": 9843440,
          "y": 0
        },
        {
          "x": 10094324,
          "y": 1
        },
        {
          "x": 10345200,
          "y": 0
        },
        {
          "x": 10596088,
          "y": 1
        },
        {
          "x": 10846964,
          "y": 0
        }
      ]
    }
  ];
}

export default App;
