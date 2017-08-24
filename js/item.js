var TodoItem = (function(){

	//display a new todo item 
	function displayItem( item ) {
		
		//console.log("DisplayItem", itemsNode, item);

		var nodeId = "item_" + item.id;

		//create item node and append to the ul node	
		var itemNode = document.createElement("div");
		itemNode.id = nodeId; 
		itemNode.classList.add("item_node");
		if (item.status === STATUS_COMPLETE) {
			itemNode.classList.add("complete");	
		}

		itemNode.addEventListener("mouseover", showItemControls);
		itemNode.addEventListener("mouseout", hideItemControls);
		
		//itemNode.onfocusin = showItemControls;
		//itemNode.onfocusout = hideItemControls;
		//$items.addEventListener("focus", showItemControls, true);	
		//$items.addEventListener("blur", hideItemControls, true);	

		itemNode.innerHTML = template(nodeId, item);

		return itemNode;
	}


	// delete an todo item 
	function remove(node) {
		console.log("delete item", node);

		var confirmation = confirm("Are you sure?")
		if (confirmation == false) {
			return;
		}

		// unregister event handler
		var itemNode = document.getElementById(node.getAttribute("parentId"))

		itemNode.onmouseout = null; 
		itemNode.onmouseover = null;
		itemNode.onfocusin = null;
		itemNode.onfocusout = null;
		
		return itemNode;
	}

	//mark an todo item as complete
	function setItemComplete(node) {

		var index = node.getAttribute("itemId");
		console.log("complete", node, index);

		//update item status
		itemsIndex[index].status = (itemsIndex[index].status === STATUS_COMPLETE) ? 
												STATUS_NONE : STATUS_COMPLETE; 

		var itemNode= document.getElementById(node.getAttribute("parentId"));
		var cl = itemNode.classList; 
		if (cl.contains('complete'))
			itemNode.classList.remove("complete");
		else 
			itemNode.classList.add("complete");
	}


	// Item component Template
	function template(nodeId, item){
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

	//var currentElem = null;
	function showItemControls(e) {
		console.log("entered " + event.target.id + " from " + event.relatedTarget.id);
/*		
		var cl = e.target.classList; 
		if (cl.contains("item_node")){
			console.log("showItemControls", e.target);
			cl.toggle("active");
			//currentElem = e.target;
		}
*/
	}

	function hideItemControls(e) {
		console.log("exited " + event.target.id + " for " + event.relatedTarget.id);
/*
		var cl = e.target.classList; 
		if (cl.contains("item_node")){
			console.log("hideItemControls", e.target);
			cl.remove("active");
			//currentElem = null;
		}
*/
	}

	return {
		displayItem: displayItem,
		setItemComplete: setItemComplete,
		remove: remove,
	}
})();

