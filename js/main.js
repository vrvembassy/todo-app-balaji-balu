/* global TodoItem */ 
	var STATUS_NONE = "none",
		STATUS_COMPLETE = "complete";
		ID_LAST = 3;

; (function(){

	var itemsIndex = {
		"1" : { id: "1", name: "Item 1", status: STATUS_NONE},
		"2" : { id: "2", name: "Item 2", status: STATUS_COMPLETE},
		"3" : { id: "3", name: "Item 3", status: STATUS_NONE},
	};

	var $input, $eraseBtn;

	document.addEventListener("DOMContentLoaded", function(event) {
		console.log("DOM fully loaded and parsed");

		loadContent();
	});


	function loadContent() {
		console.log("loadContent");

		//load main content
		var containerNode = document.getElementsByClassName("container")[0]
		containerNode.innerHTML = getHTML();

		$input = document.getElementById("inputbox"),
		$eraseBtn = document.getElementById("eraseContent");
		$loadContentBtn = document.getElementById("loadContent");

		// display the existing todo items
		TodoItems.init();
		
		TodoItems.displayItems(itemsIndex);

		//when new todo item is added
		$input.addEventListener("keydown", addItem);
		
		$eraseBtn.addEventListener("click", eraseContent);
		
	}


	//Add Todo Item 
	function addItem(key) {

		//not Enter key 
		if(key.keyCode !== 13)
			return;

		var itemText = $input.value;

		//empty check
		if (!itemText){
			console.error("todo item text cannot be empty");
			return;
		}

		var item = {id: ""+ ++ID_LAST, name: itemText, status: STATUS_NONE};

		//reset the textbox content
		$input.value = "";
		
		if (!item){
			console.error("item cannot be empty");
			return;
		}

		itemsIndex[item.id] = item;

		//refresh the DOM
		TodoItems.displayItem(item);
	}


	function eraseContent(e) {
		console.log("erase content");

		if (!$input)
			return;

		//unregister input textbox event handler 
		$input.removeEventListener("keydown", addItem);
		
		// unregister ul event listeners 
		TodoItems.remove();

		//reset the DOM content
		document.querySelector(".container").innerHTML = "";
	}	

	function getHTML() {
		var html = [], index = 0;

		html[index++] = "<div class='header'>";
		html[index++] = "<h1>Todo app</h1>";
		html[index++] = "</div>";
		html[index++] = "<div class='input'>";
		html[index++] = "<input id='inputbox' type='text' placeholder='enter todo item'/>";
		html[index++] = "</div>";
		html[index++] = "<ul id='items'></ul>";
		html[index++] = "<div class='footer'>";
		html[index++] = "<button id='eraseContent'>Erase the content</button>";
		html[index++] = "</div>";
		return html.join("");
	}

})();