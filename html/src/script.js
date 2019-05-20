const $ = require("jquery");
window.$ = $;
require("bootstrap");
const notify = require("bootstrap-notify");

$(document).ready(function() {
  ui.connected(false);

  $("[data-save]").each(function() {
    $(this).click(function() {
      const save = $(this).data("save");
      const val = $("#"+save).val();
      if(!val.match(/^[0-9]+$/)) {
        $.notify({
        	message: "Invalid value. It should match <code>/^[0-9]+$/</code>!"
        }, {
        	type: "warning"
        });
      } else {
        saveData(save, val);
      }
    });
  });
});

const ui = {
  connected: function(conn, port) {
    document.title = "BadUSB ["+(conn ? "Connected" : "Disconnected")+"]";

    $(".status").html((conn ? "Connected" : "Disconnected"));
    $(".status-text").html((conn ? "A BadUSB is connected through port <a href='#' data-toggle='modal' data-target='#serial'>"+port+"</a>." : "Please connect your BadUSB."));

    if(conn) {
      $(".data-input").removeAttr("disabled");
    } else {
      $(".data-input").attr("disabled", "disabled");
    }
  },
  update: function(data) {
    $("#os").val(data[0]);
    $("#qu").val(data[1]);
    $("#sc").val(data[2]);
  }
};
