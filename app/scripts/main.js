// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });


function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  if (hasGetUserMedia()) {
    // Good to go!
  } else {
    var videoEl = document.getElementsByTagName('video')[0];
    console.log('not supported')
    if (videoEl.options.context === 'webrtc') {
      console.log('not supported dsd')
      App.canvas.width = videoEl.videoWidth;
      App.canvas.height = videoEl.videoHeight;
      App.canvas.getContext('2d').drawImage(videoEl, 0, 0);

      // Otherwise, if the context is Flash, we ask the shim to
      // directly call window.webcam, where our shim is located
      // and ask it to capture for us.
    } else if (App.options.context === 'flash') {
      window.webcam.capture();
      App.changeFilter();
    } else {
      alert('No context was supplied to getSnapshot()');
    }
  }

  const hdConstraints = {
    video: {width: {min: 1280}, height: {min: 720}}
  };

  navigator.mediaDevices.getUserMedia(hdConstraints).
    then((stream) => {video.srcObject = stream});

  const vgaConstraints = {
    video: {width: {exact: 640}, height: {exact: 480}}
  };

  navigator.mediaDevices.getUserMedia(vgaConstraints).
    then((stream) => {video.srcObject = stream});

(function (logger) {
  console.old = console.log;
  console.log = function () {
    var output = "", arg, i;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      output += "<span class=\"log-" + (typeof arg) + "\">";

      if (
        typeof arg === "object" &&
        typeof JSON === "object" &&
        typeof JSON.stringify === "function"
      ) {
        output += JSON.stringify(arg);
      } else {
        output += arg;
      }

      output += "</span>&nbsp;";
    }

    logger.innerHTML += output + "<br>";
    console.old.apply(undefined, arguments);
  };
})(document.getElementById("logger"));
