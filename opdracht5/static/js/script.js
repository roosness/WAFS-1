// Put everything in an IFFE so there are no global variables
(function() {
	'use strict'; // Use strict mode so no global variables can be declared

	// The application object
	var app = {
		init: function() {
			el.init();
			// Set hash to searh
			navigation.init();
			search.init();
		}
	};

	// Object where elements are declared
	var el = {
		init: function() {
			this.searchScreen = document.getElementById('search');
			this.watchlistScreen = document.getElementById('watchlist');
			this.navSearch = document.getElementById('nav-search');
			this.navWatchlist = document.getElementById('nav-watchlist');
			this.list = document.getElementById('list');
			this.form = document.getElementById('form');
			this.submitButton = document.getElementById('submit');
			this.searchvalue = document.getElementById('searchvalue');
			this.firstLih1 = document.querySelector('#list li:first-child h1');
			this.loading = document.querySelector('.loading');
		}
	}

	// Object where Routie detects the hashes and displays the right section
	var navigation = {
		init: function() {
			// If no hash, set the hash to #search
			if (!window.location.hash) {
				routie('search');
			};

			// Let Routie detect the hash value.
			routie({
			    search: function() {
			    	// When the hash is search, show the search section and make the right button active
					el.searchScreen.style.display = '';
					el.watchlistScreen.style.display = 'none';
					el.navSearch.classList.add('active-menu-button')
					el.navWatchlist.classList.remove('active-menu-button')
			    },
			    watchlist: function() {
			    	// When the hash is watchlist, show the watchlist section and make the right button active
					el.searchScreen.style.display = 'none';
					el.watchlistScreen.style.display = '';
					el.navSearch.classList.remove('active-menu-button')
					el.navWatchlist.classList.add('active-menu-button')
			    },
			})
		}
	}
	
	// Object for searching movies
	var search = {
		searchResults: [],
		init: function() {
			this.submit();
			this.emptyList();
			// Hide the loading gif by default
			el.loading.style.display = 'none'
		},
		emptyList: function() {
			// If the list is empty, hide the list. If not, show the list
			if (el.firstLih1 && el.firstLih1.value) {
				el.list.style.display = '';
			} else {
				el.list.style.display = "none";
			}
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
				        	resolve(json);
				    	} else {
				    		// Tell the promise an error occurred
				    		reject(json);
				    	}
				    }
				}
			})
			return promise;
		},
		pushToArray: function(search) {
			// Fire apiCall with the search string
			this.apiCall(search).then(function (object) {
				// When the data is succesfully received, object = searchResults. Then render and display the list
				this.searchResults = object;
				this.render();
				el.list.style.display = '';
				el.loading.style.display = 'none';

			}.bind(this))
			.catch(function() {
				// If an error occurred, alert there is something wrong
				alert('Something went wrong')
			})
		},
		submit: function() {
			// Add event listener to submit of the form button
			el.form.addEventListener("submit", this.getValue.bind(this) )
		},
		loading: function(elem) {
			// Hide the list
			el.list.style.display = 'none';

			// Show the loading gif while waiting
			el.loading.style.display = '';
		},
		getValue: function(e) {
			// Prevent refreshing
			e.preventDefault();
			// Get value of the search input
			var value = el.searchvalue.value;
			// Fire loading and pushToArray
			this.loading(el.searchScreen);
			this.pushToArray(value);
		},
		render: function() {
			// Filter out all the movies without an image
			var goodImages = this.searchResults.Search.filter(function(out) { 
				return out.Poster != 'N/A'; 
			})
			// Place the object as the new searchresults object
			this.searchResults = goodImages;

			// Declare all functions to get data from object
			var liId = function() {return 'searchLi-'+this.imdbID}
			var valueId = function() {return this.imdbID}
			var title = function() {return this.Title}
			var img = function() {return this.Poster}
			var year = function() {return this.Year}
			var checkboxId = function() {return 'checboxSearch'+this.imdbID}

			// Object to let Transparency know what values to give which element
			var directives = {
			  searchresult: {id: liId, value: valueId},
			  img: {src: img},
			  title: {text: title},
			  year: {text: year},
			  checkbox: {id: checkboxId},
			  label: {for: checkboxId}
			};

			// Render
			Transparency.render(el.list, this.searchResults, directives);
		}
	}

	app.init();
})();