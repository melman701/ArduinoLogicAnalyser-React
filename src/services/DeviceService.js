import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class DeviceService {
    static getDevicesList = async () => {
        return this._get('/device/list');
    };

    static openDevice = async (device) => {
        return this._get('/device/open/' + device);
    };

    static closeDevice = async (device) => {
        return this._get('/device/close/' + device);
    };

    static getDeviceInfo = async (device) => {
        return this._get('/device/info/' + device);
    };

    static setDeviceConfig = async (device, config) => {
        return this._post('/device/config/' + device, config);
    };

    static getDeviceData = async (device) => {
        return this._get('/device/data/' + device);
    };

    static _get = async (url) => {
        return axios.get(url).then((response) => {
            return response.data;
        });
    };

    static _post = async (url, data) => {
        return axios.post(url, data).then((response) => {
            return response.data;
        });
    };
}

export default DeviceService;