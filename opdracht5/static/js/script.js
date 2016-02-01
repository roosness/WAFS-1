(function() {
	var app = {
		init: function() {
			routes.elements();
			routes.init();
		}
	}

	var routes = {
		elements: function() {
			this.navigationList = document.getElementById('navigation-list-screen');
		},
		init: function() {

			this.navigationList.addEventListener("click", function() {
				sections.toggle(this);
			} )
		}
	}

	var sections = {
		toggle: function(route) {
			var 
		}
	}

	app.init();
})()