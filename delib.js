class DelibDevice {
    constructor(ip, secret = null) {
        this.ip = ip;
        this.secret = secret;
    }
    /**
     * 
     * @param {*} cmd command to send to the de:things device.
     * @returns Device response as `text/plain` string.
     */
    async call(cmd) {
        var response = "";

        if (this.secret != null) { 
            // send req to the wlan handler
            // delib devices has url paths for the wlan requests, 
            // so `cmd` here is the handler path, like:
            // http://1.2.3.4:80/on <- `on` handler path
            // http://1.2.3.4:80/off <- `off` handler path
            // http://1.2.3.4:80/anything_else <- `anything_else` handler path
            await fetch(`http://${this.ip}:80/${cmd}`, { method: "POST", body: this.secret })
            .then(res => res.text()).then(data => {
                response = data;
            });
        }
        else { 
            // send req to the ethernet handler
            // delib devices accept ethernet commands like:
            // !on, !off, !anything_else
            // so sender specifies, what stands after '!' char.
            await fetch(`http://${this.ip}:80/`, { method: "POST", body: `!${cmd}` })
            .then(res => res.text()).then(data => {
                response = data;
            });
        }

        return response;
    }
}