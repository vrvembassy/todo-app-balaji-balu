/**
 * Todo Collection and view 
 */

/* global: TodoItem */

var TodoItems = (function(){

    function Items(collection) {
		//data 
		this.collection = collection;

        this.$node = document.getElementById("items");
        this.itemNodes = {};
		this.handlers = [];

        //event handlers
        this.handlers.push({type: "click", fn: this.itemControls});
        this.$node.addEventListener("click", this.itemsControls.bind(this));
  
        return this;
	}


    //display all the items
	Items.prototype.displayItems = function(){
        console.log("displayItems=", this.collection);
        for (var id in this.collection) {
            this.add(this.collection[id]);
        }
        

	}

    Items.prototype.add = function(item) {
        
        this.collection[item.id] = item;
        var model = this.itemNodes[item.id] = new TodoItem.Item(item);
        this.$node.appendChild(model.displayItem().node);
    }

    // Items controls 
	Items.prototype.itemsControls = function(e) {
		console.log("clicked", e.target, e.target.classList);

		if (e.target.classList.contains("delete")){
            var index = e.target.getAttribute("itemId");

			this.itemNodes[index].remove();

            //update the collection 
            var model = this.collection[index];

            //update the server 
            Save.remove(model);

            delete model;

        } else if (e.target.classList.contains("setDone")){

            var index = e.target.getAttribute("itemId");
		    //console.log("complete", index);

            var model = this.itemNodes[index];
            var m = model.changeStatus().toJson();

            //update the collection 
            this.collection[index] = m;

            //update the server
            Save.update(m); 
		}
	}

    Items.prototype.remove = function() {
        for (index in this.itemNodes){
            this.itemNodes[index].remove();
        }

        this.handlers.forEach(function(handler){
			document.removeEventListener(handler.type, handler.fn);
		});
    }

    Items.prototype.toJson = function() {
        var data = [];
        for (var id in this.collection){
            data.push(this.collection[id]);
        }
        return data;
    } 

    return {
        Items: Items,
    };
})();