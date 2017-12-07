'use strict';

// var remote = require('remote'); // Load remote compnent that contains the dialog dependency
// var dialog = remote.require('dialog'); // Load the dialogs component of the OS

const {dialog,app} = require('electron').remote;
const path = require('path');
// 

const convertSrtToFCP7xml = require('srt_to_fcp7xml-markers').convertSrtToFCP7xml;


var srtInputFileBtnEl 	= document.querySelector("#srtInputFileBtn");
var srtFilePreviewEl 	= document.querySelector("#srtFilePreview");
var xmlFCP7PreviewEl  	= document.querySelector("#xmlFCP7Preview");
var fpsInputEl 			= document.querySelector("#fpsInput");

// to add validation to only allow to open srt files. 
var dialogFilters ={ filters: [ {name: 'Custom File Type', extensions: ['srt']}]};



srtInputFileBtnEl.addEventListener("click", function(){


	dialog.showOpenDialog(dialogFilters,(fileNames) => {
	    // fileNames is an array that contains all the selected
	    if(fileNames === undefined){
	        console.log("No file selected");
	        return;
	    }

	    var srtFileName = fileNames[0];
	  	console.log(srtFileName, typeof srtFileName);

	    console.log(srtFileName);

	    setSrtFilePathPreviewEl(srtFileName);

	    /**
	     * Read srt file
	     */
	   	var pathToDesktop = app.getPath('desktop');

	   	var baseNameNoExtension = path.parse(srtFileName).name;

		var xmlSampleOutputFileName = path.join(pathToDesktop, `${baseNameNoExtension}.xml`);
		// var xmlSampleOutputFileName = "~/Desktop/baseNameNoExtension.xml";

		convertSrtToFCP7xml({srt: srtFileName, xmlOutputFileName: xmlSampleOutputFileName}, function(resp){
			console.log(resp);
			setXmlFCP7PreviewEl(resp);
			console.log("done");
		});


	    /**
	     * Run srt to FCP7 xml conversion 
	     */
	    

	    /**
	     * Save srt file to desktop.
	     * same name as srt but with .markers.xml .
	     */


	    // fs.readFile(filepath, 'utf-8', (err, data) => {
	    //     if(err){
	    //         alert("An error ocurred reading the file :" + err.message);
	    //         return;
	    //     }

	    //     // Change how to handle the file content
	    //     console.log("The file content is : " + data);
	    // });
	});
});



function setSrtFilePathPreviewEl(srtFilePath){
	srtFilePreviewEl.innerHTML = srtFilePath;
}

function setXmlFCP7PreviewEl(xmlFilePath){
	xmlFCP7PreviewEl.innerHTML =xmlFilePath;
}

function getFpsInputEl(){
	return parseFloat(fpsInputEl.value);
}