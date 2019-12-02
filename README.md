## Default Dependency: Bootstrap >= 4.0

-   Using Bootstrap `row` and `col` properties

## Default Setup:

-   Include a stylesheet with

    ```css
    #images_collection {
    	display: none;
    }
    ```

-   A `div` with `id="images_collection` contains all the images Ex:

    ```html
    <img
    	src="https://source.unsplash.com/random"
    	class="screenshot_size"
    	alt="random"
    />
    ```

-   An empty `div` with `id="horizontal_scroll` to display formatted images

    ```html
    <div id="horizontal_scroll"></div>
    ```

-   An empty `div` with `id="navigation_scroll` to display two buttons for navigation
    ```html
    <div id="navigation_scroll"></div>
    ```

*   Add `<script src="imageNav.js"></script>`

*   Add

    ```html
    <script>
    	var data = {
    		btnPrevClasses: "btn btn-secondary",
    		btnNextClasses: "btn btn-secondary",
    		screenSize: {
    			sm: 1,
    			md: 2,
    			lg: 3
    		}
    	};
    	populateImageScroll(data);
    </script>
    ```

    -   Or simply pass `populateImageScroll()`
