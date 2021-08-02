


var folders = document.querySelectorAll(".windows-folder-lists .windows-folder-list");
var updatefoldernum = document.querySelector(".folder-number-count");
if(folders.length > 1) {
    updatefoldernum.innerHTML = folders.length+' items';
} else {
    updatefoldernum.innerHTML = folders.length+' item';
}


var winheight = document.querySelector('.windows-header');
var mainwindows = document.querySelector('.main-windows');
var winbody = document.querySelector('.windows-body');
var winheight_and_mainwin = mainwindows.offsetHeight - winheight.offsetHeight;
winbody.style.height = winheight_and_mainwin+'px';



// Taskbar App
$(document).on('click', '.taskbar-icon-folder-explore', function() {
	$("body").addClass('file-explore-active');
	$(".main-windows").toggleClass('active');
	$(this).toggleClass('active');
});
$(document).on('click', '.windows-minimize-btn', function() {
	$(".main-windows").removeClass('active');
	$(".taskbar-icon-folder-explore").removeClass('active')
});
$(document).on('click', '.windows-close-btn', function() {
	$("body").removeClass('file-explore-active');
	$(".main-windows").removeClass('active');
	$(".taskbar-icon-folder-explore").removeClass('active')
});



window.onload = function() {
    initDragElement();
    initResizeElement();
  };
  
  function initDragElement() {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    var popups = document.getElementsByClassName("main-windows");
    var elmnt = null;
    var currentZIndex = 100; //TODO reset z index when a threshold is passed
  
    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      var header = getHeader(popup);
  
      popup.onmousedown = function() {
        this.style.zIndex = "" + ++currentZIndex;
      };
  
      if (header) {
        header.parentPopup = popup;
        header.onmousedown = dragMouseDown;
      }
    }
  
    function dragMouseDown(e) {
      elmnt = this.parentPopup;
      elmnt.style.zIndex = "" + ++currentZIndex;
  
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      if (!elmnt) {
        return;
      }
  
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  
    function getHeader(element) {
      var headerItems = element.getElementsByClassName("drag-window");
  
      if (headerItems.length === 1) {
        return headerItems[0];
      }
  
      return null;
    }
  }
  
  function initResizeElement() {
    var popups = document.getElementsByClassName("main-windows");
    var element = null;
    var startX, startY, startWidth, startHeight;
  
    for (var i = 0; i < popups.length; i++) {
      var p = popups[i];
  
      var left = document.createElement("div");
      left.className = "resizer-left";
      p.appendChild(left);
      left.addEventListener("mousedown", initDrag, false);
      left.parentPopup = p;
  
      var right = document.createElement("div");
      right.className = "resizer-right";
      p.appendChild(right);
      right.addEventListener("mousedown", initDrag, false);
      right.parentPopup = p;
  
      var bottom = document.createElement("div");
      bottom.className = "resizer-bottom";
      p.appendChild(bottom);
      bottom.addEventListener("mousedown", initDrag, false);
      bottom.parentPopup = p;
  
      var both = document.createElement("div");
      both.className = "resizer-both";
      p.appendChild(both);
      both.addEventListener("mousedown", initDrag, false);
      both.parentPopup = p;
    }
  
    function initDrag(e) {
      element = this.parentPopup;
  
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(element).width,
        10
      );
      startHeight = parseInt(
        document.defaultView.getComputedStyle(element).height,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
  
    function doDrag(e) {
      element.style.width = startWidth + e.clientX - startX + "px";
      element.style.height = startHeight + e.clientY - startY + "px";
    }
  
    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }
  



//  Current Date Time
var datefield = document.querySelector(".tody-date")
var timefield = document.querySelector(".tody-time")
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
datefield.innerHTML = today;


function getDateTime() {
	var now     = new Date(); 
	var day     = now.getDate();
	var hour    = now.getHours();
	var minute  = now.getMinutes();
	var ampm = hour >= 12 ? 'pm' : 'am';
	if(day.toString().length == 1) {
		 day = '0'+day;
	}   
	if(hour.toString().length == 1) {
		 hour = '0'+hour;
	}
	if(minute.toString().length == 1) {
		 minute = '0'+minute;
	} 
	var dateTime = hour+':'+minute+' ' + ampm;   
	 return dateTime;
}
// example usage: realtime clock
setInterval(function(){
	currentTime = getDateTime();
	timefield.innerHTML = currentTime;
	// document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);


// Browser Right Click Menu
var menu;

var cmen = [
	{
		"text": "View",
		"sub": [
			{
				"text": "Large icons"
			},
			{
				"text": "Medium icons"
			},
			{
				"text": "Small icons",
				"icon": "<i class='las la-circle'></i>"
			},
			{
				"type": ContextMenu.DIVIDER
			},
			{
				"text": "Auto arrange icons",
			},
			{
				"text": "Align icons to grid",
			},
			{
				"type": ContextMenu.DIVIDER
			},
			{
				"text": "Show desktop icons",
				"icon": "<i class='la la-check'></i>"
			},
		]
	},
	{
		"text": "Sort by",
		"sub": [
			{
				"text": "Name"
			},
			{
				"text": "Size"
			},
			{
				"text": "Item type"
			},
			{
				"text": "Date modified"
			}
		]
	},
	{
		"text": "Refresh",
	},
	{
		"type": ContextMenu.DIVIDER
	},
	{
		"text": "Paste",
		"enabled": false
	},
	{
		"text": "Paste shortcut",
		"enabled": false
	},
	{
		"text": "Undo Copy <span class='undo-copy'>Ctrl+Z</span>",
	},
	{
		"text": "Cmder Here",
		"icon": "<img src='assets/images/icon-cmder.png' />"
	},
	{
		"text": "Git GUI Here",
		"icon": "<img src='assets/images/icon-git.png' />"
	},
	{
		"text": "Git Bash Here",
		"icon": "<img src='assets/images/icon-git.png' />"
	},
	{
		"type": ContextMenu.DIVIDER
	},
	{
		"text": "New",
		"sub": [
			{
				"text": "Folder",
				"icon": "<img src='assets/images/empty-small-folder.png' />"
			},
			{
				"text": "Shortcut",
				"icon": "<img src='assets/images/icon-shortcut.png' />"
			},
			{
				"type": ContextMenu.DIVIDER
			},
			{
				"text": "WinRAR archive",
				"icon": "<img src='assets/images/zip-file-icon.png' />"
			},
			{
				"text": "Rich Text Document",
				"icon": "<img src='assets/images/documents-icon.png' />"
			},
			{
				"text": "Text Document",
				"icon": "<img src='assets/images/text-file-icon.png' />"
			},
			{
				"text": "WinRAR ZIP archive",
				"icon": "<img src='assets/images/zip-file-icon.png' />"
			},
		]
	},
	{
		"type": ContextMenu.DIVIDER
	},
	{
		"text": "Display settings",
		"icon": "<img src='assets/images/icon-display-setting.png' />"
	},
	{
		"text": "Personalize",
		"icon": "<img src='assets/images/icon-personalize.png' />"
	}
];

window.addEventListener("load", function(){
	menu = new ContextMenu(cmen);

	document.getElementById('cmenu').addEventListener("contextmenu", function(e){
		menu.display(e);
	});
});

