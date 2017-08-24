/** 
 * Todo Model and View
*/
var TodoItem = (function(){

	function Item(item) {
		//data 
		this.model = item;
		
		this.handlers = [];
		return this;
	}

	//display a new todo item 
	Item.prototype.displayItem = function() {
		
		console.log("DisplayItem", this.model);

		var nodeId = "item_" + this.model.id;

		//create item node and append to the ul node	
		var itemNode = document.createElement("div");
		itemNode.id = nodeId; 
		itemNode.classList.add("item_node");
		if (this.model.status === true) {
			itemNode.classList.add("complete");	
		}

		this.handlers.push({type: "mouseenter", fn: showItemControls});
		this.handlers.push({type: "mouseleave", fn: hideItemControls});

		itemNode.addEventListener("mouseenter", showItemControls);
		itemNode.addEventListener("mouseleave", hideItemControls);
		
		itemNode.innerHTML = setTemplate(nodeId, this.toJson());
		this.node = itemNode;

		return this;
	}

	function showItemControls(e) {
		this.classList.add("active");
	}

	function hideItemControls(e) {
		this.classList.remove("active");
	}

	Item.prototype.toJson = function(){
		return this.model;
	}

	// delete an todo item 
	Item.prototype.remove = function() {
		console.log("delete item");

		var confirmation = confirm("Are you sure?")
		if (confirmation == false) {
			return;
		}

		// unregister event handler
		this.handlers.forEach(function(handler){
			document.removeEventListener(handler.type, handler.fn);
		});

		// remove the DOM element
		this.node.parentNode.removeChild(this.node);

		return this;
	}

	//mark an todo item as complete
	Item.prototype.changeStatus = function(){
		//console.log("ChangeStatus", this);
		
		//update item status
		this.model.status = !this.model.status;

		this.node.classList.toggle("complete");

		return this;
	}


	// Item component Template
	function setTemplate(nodeId, item) {
		var html = [], index = 0;
		
		//construct the html string 
		html[index++] =  "<li>";
		html[index++] = "<p class='item_text'>";
		html[index++] = item.name;
		html[index++] = "</p>";
		html[index++] = "<span class='controls'>";
		html[index++] = "<span class='ctrlBtn setDone' itemId='";
		html[index++] = item.id;
		html[index++] = "' parentId='";
		html[index++] = nodeId;
		html[index++] = "'>&#10004;</span>";
		html[index++] = "&emsp;&ensp;";
		html[index++] = "<span class='ctrlBtn delete' itemId='";
		html[index++] = item.id;
		html[index++] = "' parentId='";
		html[index++] = nodeId;
		html[index++] = "'>x</span>";
		html[index++] = "</span>";
		html[index++] = "<div style='clear: both;'></div>";
		html[index++] =  "</li>";	

		return html.join("");
	}


	return {
		Item: Item
	};

})();

