const electron = require('electron');
const ipc = electron.ipcRenderer;

var submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', function(){
	// let initCommand = "cd ../../../..";
	var src = document.getElementById("showImage");
	src.innerHTML = "";
	var loader = document.createElement("div");
	loader.setAttribute('class', 'loader')
	src.appendChild(loader).style.cssText = 'margin-left: auto; margin-right: auto; display: block;';

	let imgType = " --save_img"
	if(document.getElementById('animFlag').value==='1') imgType = " --save_gif"

	let command = ("python3 generate.py --char_seq '"
					+ document.getElementById('inputBox').value + "' --style " +
					+ document.getElementById('fontStyle').value +
					imgType);
	let regexString = /results[/]gen_img.*.[gif|png]/;
	let imagePath = "";
	
	const { exec } = require("child_process");
	// exec(initCommand, (getter) => {if(getter) {}});
	exec(command, (error, data, getter) => {
		console.log(command);
		if(error){
			console.log("error",error.message);
			return;
		}
		if(getter){
			console.log(data);
			return;
		}
		imagePath = data.match(regexString)[0];
	});


	(function wait() {
		if ( imagePath !== "" ) {
			console.log("Image Path: " + imagePath);
			src = document.getElementById("showImage");
			src.innerHTML="";

			// to display the newly generated image
			var img = document.createElement("img");
			
			img.src = "../"+imagePath;
			src.appendChild(img).style.cssText = 'width: 100%; margin-left: auto; margin-right: auto; display: block;';
			console.log("added new image");
		} else {
			setTimeout( wait, 50 );
		}
	})();
});
