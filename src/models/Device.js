class Device {
    constructor(name, channelsCount) {
        this.name = name;
        this.channelsCount = channelsCount;
        this.config = {
            enabled: false,
            samplesCount: 0,
            channelsConfig: []
        };

        for (var i = 0; i < channelsCount; ++i) {
            this.config.channelsConfig.push({
                enabled: false
            });
        }
    }
}

export default Device;