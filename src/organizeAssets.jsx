/*	organizeAssets.jsx

	By: Michael Gochoco
	support@blurrypixel.com
	
	Move Project Items into Organized Folders
*/

{
	var proj = app.project;

	function main() {
		app.beginUndoGroup("organizeAssets");

		if(proj) {
			if(proj.numItems > 0) {
				// create a new FolderItem in project, with name "COMPS"
				var compFolder = proj.items.addFolder("COMPS");
				var imagesFolder = proj.items.addFolder("IMAGES");
				var footageFolder = proj.items.addFolder("VIDEO");
				var audioFolder = proj.items.addFolder("AUDIO");
				
				// move all compositions into new folder by setting
				// compItem's parentFolder to "comps" folder
				var compsArray = new Array();
				var imagesArray = new Array();
				var footageArray = new Array();
				var audioArray = new Array();
				
				for(var i = 1; i <= proj.numItems; i++) {
					if(proj.item(i) instanceof CompItem)
						compsArray.push(proj.item(i));
					else if(proj.item(i) instanceof FootageItem) {
						if(proj.item(i).mainSource instanceof FileSource) {
							if(proj.item(i).mainSource.isStill)
								imagesArray.push(proj.item(i));
							else if(proj.item(i).hasVideo)
								footageArray.push(proj.item(i));
							else if(proj.item(i).hasAudio)
								audioArray.push(proj.item(i));
							else if(proj.item(i).footageMissing) // no video so must be audio
								audioArray.push(proj.item(i));
						}
					}
				}

				for (j=0; j<=compsArray.length-1; j++) {
					compsArray[j].parentFolder = compFolder;
				}
			
				for (j=0; j<=imagesArray.length-1; j++) {
					imagesArray[j].parentFolder = imagesFolder;
				}
			
				for (j=0; j<=footageArray.length-1; j++) {
					footageArray[j].parentFolder = footageFolder;
				}
			
				for (j=0; j<=audioArray.length-1; j++) {
					audioArray[j].parentFolder = audioFolder;
				}
			}
		}
		app.endUndoGroup();
	}

	main();
}

