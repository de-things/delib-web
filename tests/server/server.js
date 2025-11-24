const 
    express     = require("express"), 
    bodyParser  = require('body-parser'),
    app         = express();

app.use(bodyParser.text());

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("TEST_ETH_RESPONSE");
});

app.post("/test", (req, res) => {
    console.log(req.body);
    res.send("TEST_WLAN_RESPONSE");
});

app.listen(80, () => { 
    console.log("SERVER IS RUNNING");
});
