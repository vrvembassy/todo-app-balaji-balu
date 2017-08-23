
	//display a new todo item 
	function displayItem(itemsNode, item ) {
		
		//console.log("DisplayItem", itemsNode, item);

		var nodeId = "item_" + item.id;

		//create item node and append to the ul node	
		var itemNode = document.createElement("div");
		itemNode.id = nodeId; 
		itemNode.classList.add("item_node");
		if (item.status === STATUS_COMPLETE) {
			itemNode.classList.add("complete");	
		}
		itemNode.innerHTML = getItemHTML(nodeId, item);
		itemNode.addEventListener("mouseenter", showItemControls); //mouseenter
		itemNode.addEventListener("mouseleave", hideItemControls); //mouseleave

		itemsNode.prepend(itemNode); //add to top of the list
	}

	function showItemControls(e) {
		//console.log("showItemControls", e.target);
		if (e.target.classList.contains("item_node")){
			e.target.classList.add("active");
		}
	}

	function hideItemControls(e) {
		if (e.target.classList.contains("item_node")){
			//console.log("hideItemControls", e.target);
			e.target.classList.remove("active");
		}
	}

	// delete an todo item 
	function deleteItem(node) {
		console.log("delete item", node);

		var confirmation = confirm("Are you sure?")
		if (confirmation == false) {
			return;
		}

		//delete the element in the items array
		var index = node.getAttribute("itemId");
		delete itemsIndex[index];

		// unregister event handler
		var itemNode = document.getElementById(node.getAttribute("parentId"))
		itemNode.removeEventListener("mouseenter", showItemControls); 
		itemNode.removeEventListener("mouseleave", hideItemControls); 

		//delete the DOM node of this item
		$items.removeChild(itemNode);

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
	function getItemHTML(nodeId, item){
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