var Save = (function(){

    var ref = null;
    var readHandler = null;
    var TODOS_URL = 'todos/';

    function init(readHandler){

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCotNrfHOpx0YEiG69fYvBTz5xZUhQvOw0",
            authDomain: "todoapp-74965.firebaseapp.com",
            databaseURL: "https://todoapp-74965.firebaseio.com",
            projectId: "todoapp-74965",
            storageBucket: "",
            messagingSenderId: "823214714884"
        };
        var app = firebase.initializeApp(config);
        console.log(app.name);
        ref = firebase.database().ref(TODOS_URL);
        ref.on('child_added', function(snapshot){
            if (readHandler) readHandler(snapshot.val());
        });
    }

    function add(item) {
        console.log("saveTodo:", item)
        var key = ref.push().key; 
        
        item.id = key; 
        var updates = {};
        updates[key] = item;
        ref.update(updates);
    }

    function update(item) {
        var updates = {};
        updates[item.id] = item;
        ref.update(updates);
    }

    function remove(item) {
        var updates = {};
        updates[item.id] = null;
        ref.update(updates);
    }

    function clean() {
        ref.off();
    }

    return {
        init: init,
        add: add,
        update: update,
        remove: remove,
        clean: clean,
    }
})();