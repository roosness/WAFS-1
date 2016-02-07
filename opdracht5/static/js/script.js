// Put everything in an IFFE so there are no global variables
(function() {
	'use strict'; // Use strict mode so no global variables can be declared

	// The application object
	var app = {
		init: function() {
			routes.init();
			search.init();
		}
	};

	// Object for routes
	var routes = {
		init: function() {
			// Event listener for when the hash changes
			window.addEventListener('hashchange', navigation.toggle.bind(navigation), false);
			// Event listener at refresh
 			window.addEventListener('load', navigation.toggle.bind(navigation), false);
		}
	};

	// Objects for showing and hiding navigation as navigation
	var navigation = {
		toggle: function() {
			var hash = window.location.hash;
			// If there's a hash in the url, hide all screens and show the screen with the current hash
			if (hash) {
				var show = document.querySelector(hash);
				// Check if page exists. If not, alert a message and set hash to start screen
				if (show) {
					// Loop through all navigation and set them to display none
					var screens = document.querySelectorAll('body > section');
					for (var i = 0; i < screens.length; i++) {
						screens[i].style.display = 'none';
					};
					// Show the element wich has the same id as the hash
					show.style.display = '';
				} else {
					alert('This page does not exist');
					window.location.hash = '#search';
				};		
			} else {
				// If there's no hash, set hash to start-screen
				window.location.hash = '#search';
			};
			// Execute navigation.navigation
			this.activeButton();
		},
		activeButton: function() {
			var hash = window.location.hash;
			var ahref = document.querySelectorAll('.menu-button a');
			// Search for a elements in .menu-button and give the parent of the a with the current hash value in href the class active-menu-button. Else remove active-menu-button
			for (var i = 0; i < ahref.length; i++) {
				var hrefValue = ahref[i].getAttribute('href');
				if (hrefValue == hash) {
					ahref[i].parentElement.classList.add("active-menu-button");
				} else {
					ahref[i].parentElement.classList.remove("active-menu-button");
				};
			};
		}
	};

	// Object for searching movies
	var search = {
		searchResults: [],
		init: function() {
			this.elements();
			this.submit();
		},
		elements: function() {
			// Declare elements
			this.list = document.getElementById('list');
			this.form = document.getElementById('form');
			this.submitButton = document.getElementById('submit');
			this.searchvalue = document.getElementById('searchvalue');
		},
		apiCall: function(search) {
			// Declare new Promise function
			var promise = new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();

				// Encode search string as URI
				var searchURI = encodeURI(search)

				xhr.open('GET', 'http://www.omdbapi.com/?s='+searchURI+'&r=json', true); // Get data from the url
				xhr.send(null);
				
				// When the data is received
				xhr.onreadystatechange = function() {
					// Check if the data is ready
				    if (xhr.readyState == XMLHttpRequest.DONE) {
				    	var status = xhr.status;
				    	// Check if an object is received
				    	if( (status >= 200 && status < 300) || status === 304 ) {
				    		var json = JSON.parse(xhr.responseText);
				    		// Tell the promise it succeded and return the object
				        	resolve(json.Search);
				    	} else {
				    		// Tell the promise an error occurred
				    		reject();
				    	}
				    }
				}
			})
			return promise;
		},
		pushToArray: function(search) {
			// Fire apiCall with the search string
			this.apiCall(search).then(function (object) {
				// When the data is succesfully received, object = searchResults. Then render
				this.searchResults = object;
				this.render();
			}.bind(this))
			.catch(function() {
				// If an error occurred, alert there is something wrong
				alert('Something went wrong')
			})
		},
		submit: function() {
			// Add event listener to submit of the form button
			this.form.addEventListener("submit", this.getValue.bind(this) )
		},
		loading: function(elem) {
			// Delete everything in the list
			while (elem.firstChild) {
			    elem.removeChild(elem.firstChild);
			}

			// Append a loading gif while waiting
			var img = document.createElement("img");
			img.setAttribute('src', 'C:/wamp/www/country/img/loading.gif');

			elem.appendChild(img);
		},
		getValue: function(e) {
			// Prevent refreshing
			e.preventDefault();
			// Get value of the search input
			var value = this.searchvalue.value;
			// Fire loading and pushToArray
			this.loading(this.list);
			this.pushToArray(value);
		},
		render: function() {
			// Delete all elements in the list
			while (this.list.firstChild) {
			    this.list.removeChild(this.list.firstChild);
			}

			// Create elements for every search result and append to the list
			for (var i = 0; i < this.searchResults.length; i++) {
				var li = document.createElement("li");
				li.setAttribute('id', 'searchLi-'+this.searchResults[i].imdbID)
				li.setAttribute('value', this.searchResults[i].imdbID)
				var div = document.createElement("div");
				var h1 = document.createElement("h1");
				var img = document.createElement("img");
				img.setAttribute('src', this.searchResults[i].Poster);
				var span = document.createElement("span");
				var checkbox = document.createElement("input");
				checkbox.setAttribute('type', 'checkbox');
				checkbox.setAttribute('id', 'checkboxSearch-'+this.searchResults[i].imdbID);
				checkbox.setAttribute('value', this.searchResults[i].imdbID);
				var label = document.createElement('label');
				label.setAttribute('for', 'checkboxSearch-'+this.searchResults[i].imdbID);
				var year = document.createTextNode(this.searchResults[i].Year);
				var title = document.createTextNode(this.searchResults[i].Title);

				li.appendChild(img);
				li.appendChild(div).appendChild(h1).appendChild(title);
				div.appendChild(span).appendChild(year);
				li.appendChild(checkbox);
				li.appendChild(label);
				
				this.list.appendChild(li);
			}
		}
	}

	app.init();
})();