var jsData;
var currentIndex_gli = 0;

const smScreen_gli = 430;
const mdScreen_gli = 675;

const default_images_num_gli = 3;

const default_row_class_gli = "row text-center";
const default_col_class_gli = "col";

function addNavButtons(btnPrevClasses, btnNextClasses) {
	var navigation_scroll_gli = document.getElementById("navigation_scroll");
	navigation_scroll_gli.innerHTML = `
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

function getImagesPerRow() {
	let default_images_per_row_gli = default_images_num_gli;
	if (jsData && jsData.screenSize) {
		if (
			jsData.screenSize.sm &&
			data.screenSize.md &&
			jsData.screenSize.lg
		) {
			if (document.body.clientWidth <= smScreen_gli) {
				default_images_per_row_gli = jsData.screenSize.sm;
			} else if (document.body.clientWidth <= mdScreen_gli) {
				default_images_per_row_gli = jsData.screenSize.md;
			} else {
				default_images_per_row_gli = jsData.screenSize.lg;
			}
		}
	}
	return default_images_per_row_gli;
}

function getBtnPrevClass() {
	return jsData ? (jsData.btnPrevClasses ? jsData.btnPrevClasses : "") : "";
}

function getBtnNextClass() {
	return jsData ? (jsData.btnNextClasses ? jsData.btnNextClasses : "") : "";
}

function populateImageScroll(data = null) {
	jsData = data;

	var images_per_page_gli = getImagesPerRow();
	var btnPrevClasses_gli = getBtnNextClass();
	var btnNextClasses_gli = getBtnNextClass();

	addNavButtons(btnPrevClasses_gli, btnNextClasses_gli);

	var images_collection_gli = document.querySelector("#images_collection");
	var images_gli = images_collection_gli.children;
	var num_images_gli = images_gli.length;

	var horizontal_scroll_gli = document.querySelector("#horizontal_scroll");

	var num_loop_gli = Math.floor(num_images_gli / images_per_page_gli);
	var uneven_gli = num_images_gli % images_per_page_gli;

	var array_gli = [];
	for (var i = 0; i < num_loop_gli; i++) {
		var result_gli = `<div class="${default_row_class_gli}">`;
		for (
			var k = i * images_per_page_gli;
			k < images_per_page_gli * (i + 1);
			k++
		) {
			result_gli += `<div class="${default_col_class_gli}">
                                ${images_gli[k].outerHTML}
                            </div>`;
		}
		result_gli += "</div>";
		array_gli.push(result_gli);
	}

	if (uneven_gli != 0) {
		var result_gli = `<div class="${default_row_class_gli}">`;
		for (
			var i = images_gli.length - uneven_gli;
			i < images_gli.length;
			i++
		) {
			result_gli += `<div class="${default_col_class_gli}">
                                    ${images_gli[i].outerHTML}
                                </div>`;
		}
		for (var i = 0; i < images_per_page_gli - uneven_gli; i++) {
			result_gli += `<div class="${default_col_class_gli}">
		                        </div>`;
		}
		result_gli += "</div>";
		array_gli.push(result_gli);
	}

	horizontal_scroll_gli.innerHTML = array_gli[currentIndex_gli];

	var previous_gli = document.getElementById("previous");
	var next_gli = document.getElementById("next");
	previous_gli.disabled = true;

	next_gli.addEventListener("click", function() {
		currentIndex_gli += 1;
		if (previous_gli.disabled == true) {
			previous_gli.disabled = false;
		}
		if (uneven_gli == 0) {
			if (currentIndex_gli == num_loop_gli - 1) {
				next_gli.disabled = true;
			}
		} else {
			if (currentIndex_gli == num_loop_gli) {
				next_gli.disabled = true;
			}
		}
		horizontal_scroll_gli.innerHTML = array_gli[currentIndex_gli];
	});
	previous_gli.addEventListener("click", function() {
		currentIndex_gli -= 1;
		if (next_gli.disabled == true) {
			next_gli.disabled = false;
		}
		if (currentIndex_gli == 0) {
			previous_gli.disabled = true;
		}
		horizontal_scroll_gli.innerHTML = array_gli[currentIndex_gli];
	});
}

window.addEventListener("resize", function() {
	populateImageScroll(jsData);
});
