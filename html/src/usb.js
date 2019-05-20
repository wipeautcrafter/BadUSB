const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
let connected = false;
let connecting = false;
let portid = null;
let _port = null;

(async function() {
  setInterval(function() {
    if(connected || connecting) return;

    SerialPort.list(function(err, ports) {
      ports.forEach(function(port, index) {
        let pm = port['manufacturer'];

        if (typeof pm !== 'undefined' && pm.includes('arduino')) {

          if(connected || connecting) return;

          connecting = true;

          portid = port.comName.toString();
          var serialPort = require('serialport');

          _port = new serialPort(portid, {
            baudRate: 9600
          })

          _port.on("open", function() {

            $("<div><b>Arduino on "+portid+"</b></div>").appendTo(".serial-out");

            const parser = new Readline();
            _port.pipe(parser);

            parser.on("data", function(line) {
              $("<div></div>").text(line).appendTo(".serial-out");

              if(!connected) {
                if(line.match(/bad(:[0-9]+){3}/)) {
                  _port.write('programmer\n');

                  connected = true;
                  ui.connected(true, portid);

                  $.notify({
                    message: "A BadUSB has been connected."
                  }, {
                    type: "success"
                  });

                  ui.update(line.replace(/\r/g, "").split(":").splice(1));
                } else {
                  $.notify({
                    message: "The Arduino on "+portid+" is not a BadUSB."
                  }, {
                    type: "danger"
                  });
                }

                connecting = false;
              }
            });
          });

          _port.on("close", function() {
            connected = false;
            port = null;
            ui.connected(false);

            $("<div><b>Arduino disconnected</b></div>").appendTo(".serial-out");

            $.notify({
              message: "The BadUSB had been disconnected."
            }, {
              type: "danger"
            });
          });
        }
      });
    });
  }, 500);
})();

function saveData(label, value) {
  if(_port) _port.write(label+value+"\n");
}

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
