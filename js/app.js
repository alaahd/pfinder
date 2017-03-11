"use strict";

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
function Slider(element) {
    this.el = document.querySelector(element);
    this.init();
}

Slider.prototype = {
    init: function init() {
        this.slides = this.el.querySelectorAll("#slider-wrapper .slide");
        this.wrapper = this.el.querySelector("#slider-wrapper");
        this.currentSlideIndex = 1;
        //this.navigate();
    },
    next: function next(event) {
        event.preventDefault();
        this.slide(this.currentSlideIndex + 1);
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    },
    prev: function prev(event) {
        event.preventDefault();
        if (this.currentSlideIndex == 1) {
            this.slide(this.slides.length);
            this.currentSlideIndex = this.slides.length;
        } else {
            this.slide(this.currentSlideIndex - 1);
            this.currentSlideIndex--;
        }
    },
    animate: function animate(slide) {
        var parent = slide.parentNode;
    },

    slide: function slide(index) {
        var currentSlide = this.el.querySelector(".slide:nth-child(" + index + ")");
        this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
        this.animate(currentSlide);
    }
};

document.addEventListener("DOMContentLoaded", function () {

    //load json data locally to avoid cross origin policy
    loadJSON('data.json', function (response) {

        var data = response.data;
        var html = "";

        data.map(function (item, index) {

            var slideMarkup = "\n                    <li class=\"slide\">\n                        <img src=\"http://placehold.it/960x540\" />\n                        <div class='info'>\n                            <div class='masthead'>\n                                <div>\n                                    <img src=\"" + item.links.logo + "\" />\n                                    <h3><span>Total Properties: </span>" + item.totalProperties + "</h3>\n                                </div>\n                                <div>\n                                    <h1>" + item.name + "</h1>\n                                    <h2>" + item.location + "</h2>\n                                    <p>" + item.description.substr(0, 520) + "&hellip;</p>\n                                </div>\n                            </div>\n                            <ul class='meta'>\n                                <li><div><span>Residential For Rent Count</span>" + item.residentialForRentCount + "</div></li>\n                                <li><div><span>Residential For Sale Count</span>" + item.residentialForSaleCount + "</div></li>\n                                <li><div><span>Commercial For Rent Count</span>" + item.commercialForRentCount + "</div></li>\n                                <li><div><span>Commercial For Sale Count</span>" + item.commercialForSaleCount + "</div></li>\n                                <li><div><span>Commercial Total Count</span>" + item.commercialTotalCount + "</div></li>\n                            </ul>\n                            <div class='contact'>\n                                " + item.phone + "\n                            </div>\n                        </div>\n                    </li>\n                ";

            html += slideMarkup;
        });

        document.getElementById('slider-wrapper').innerHTML = html;

        //initialize the slider
        window.pSlider = new Slider("#slider");
    }, function (xhr) {
        console.error(xhr);
    });
});