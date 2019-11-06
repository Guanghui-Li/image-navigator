function addNavButtons(btnPrevClasses, btnNextClasses) {
	var navigation_scroll_gli = document.getElementById("navigation_scroll");
	navigation_scroll.innerHTML = `
        <div>
        <div class="float-left">
            <button id="previous" class="${btnPrevClasses}"><</button>
        </div>
        <div class="float-right">
            <button id="next" class="${btnNextClasses}">></button>
        </div>    
        </div>
    `;
}

function populateImageScroll(data = null) {
	var default_images_per_row_gli = 3;
	var images_per_page_gli = data
		? data.imagesPerRow
			? data.imagesPerRow
			: default_images_per_row_gli
		: default_images_per_row_gli;
	var btnPrevClasses_gli = data
		? data.btnPrevClasses
			? data.btnPrevClasses
			: ""
		: "";
	var btnNextClasses_gli = data
		? data.btnNextClasses
			? data.btnNextClasses
			: ""
		: "";
	addNavButtons(btnPrevClasses_gli, btnNextClasses_gli);

	var images_collection_gli = document.querySelector("#images_collection");
	var images_gli = images_collection_gli.children;
	var num_images_gli = images_gli.length;

	var horizontal_scroll_gli = document.querySelector("#horizontal_scroll");

	var num_loop_gli = Math.floor(num_images_gli / images_per_page_gli);
	var uneven_gli = num_images_gli % images_per_page_gli;

	var array_gli = [];
	for (var i = 0; i < num_loop_gli; i++) {
		var result_gli = '<div class="row text-center">';
		for (
			var k = i * images_per_page_gli;
			k < images_per_page_gli * (i + 1);
			k++
		) {
			result_gli += `<div class="col">
                                ${images_gli[k].outerHTML}
                            </div>`;
		}
		result_gli += "</div>";
		array_gli.push(result_gli);
	}

	if (uneven_gli) {
		var result_gli = '<div class="row text-center">';
		for (
			var i = images_gli.length - uneven_gli;
			i < images_gli.length;
			i++
		) {
			result_gli += `<div class="col">
                                    ${images_gli[i].outerHTML}
                                </div>`;
		}
		for (var i = 0; i < images_per_page_gli - uneven_gli; i++) {
			result_gli += `<div class="col">
                                </div>`;
		}
		result_gli += "</div>";
		array_gli.push(result_gli);
	}

	var currentIndex_gli = 0;
	horizontal_scroll_gli.innerHTML = array_gli[currentIndex_gli];

	var previous_gli = document.getElementById("previous");
	var next_gli = document.getElementById("next");
	previous_gli.disabled = true;

	next_gli.addEventListener("click", function() {
		currentIndex_gli += 1;
		horizontal_scroll_gli.innerHTML = array_gli[currentIndex_gli];
		if (previous_gli.disabled == true) {
			previous_gli.disabled = false;
		}
		if (currentIndex_gli == num_loop_gli - 1) {
			next_gli.disabled = true;
		}
	});
	previous_gli.addEventListener("click", function() {
		currentIndex_gli -= 1;
		horizontal_scroll_gli.innerHTML = array_gli[currentIndex_gli];
		if (next_gli.disabled == true) {
			next_gli.disabled = false;
		}
		if (currentIndex_gli == 0) {
			previous_gli.disabled = true;
		}
	});
}
