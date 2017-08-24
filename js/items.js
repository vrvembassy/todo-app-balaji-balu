/* global: TodoItem */
var TodoItems = (function(){

    var $items;

    function init() {
        $items = document.getElementById("items");

        $items.addEventListener("click", itemsControls);

    }

    //display all the items
	function displayItems(itemsIndex){
		for (var id in itemsIndex) {
			$items.appendChild(TodoItem.displayItem(itemsIndex[id]));
		}
	}

    function displayItem(item) {
        $items.appendChild(TodoItem.displayItem(item));
    }

    // Items controls 
	function itemsControls(e) {
		console.log("clicked", e.target, e.target.classList);

		if (e.target.classList.contains("delete")){
			$items.removeChild(TodoItem.remove(e.target));
		} else if (e.target.classList.contains("setDone")){
			TodoItem.setItemComplete(e.target);
		}
	}

    function remove() {
        $items.removeEventListener("click", itemsControls);	
    }

    return {
        init: init,
        displayItems: displayItems,
        displayItem: displayItem,
        remove: remove,
    };
})();