const path = require('path');
const { isPlaying } = require("../index")

const pressKey = (window, key, modifiers = []) => {
	window.webContents.sendInputEvent({
		type: "keydown",
        modifiers,
		keyCode: key,
	});
};


module.exports = win => {
	// need to set thumbar again after win.show 
	win.on("show", () => {
		setThumbar(win)
	})

    function setThumbar(win) {
        if (win.getURL().toLowerCase().includes("watch")) {
            setThumbar(win)
        }
    
        // Win32 require full rewrite of components
        win.setThumbarButtons([
            {
                tooltip: 'Previous Track',
                icon: get('previous.png'),
                click() { pressKey(win, "p", ["shift"]); }
            }, {
                tooltip: isPlaying ? "Play" : "Pause",
                // Update icon based on play state
                icon: isPlaying ? get('play.png') : get('pause.png'),
                click() { pressKey(win, "space"); setThumbar(win) }
            }, {
                tooltip: 'Next Track',
                icon: get('forward.png'),
                click() { pressKey(win, "n", ["shift"]); }
            }
        ]);
    }
    
    // Util
    function get(file) {
        return path.join(__dirname, "assets", file);
    }
};