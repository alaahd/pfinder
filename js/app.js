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
        this.links = this.el.querySelectorAll("#slider-nav a");
        this.wrapper = this.el.querySelector("#slider-wrapper");
        this.navigate();
    },
    navigate: function navigate() {

        for (var i = 0; i < this.links.length; ++i) {
            var link = this.links[i];
            this.slide(link);
        }
    },

    animate: function animate(slide) {
        var parent = slide.parentNode;
    },

    slide: function slide(element) {
        var self = this;
        element.addEventListener("click", function (e) {
            e.preventDefault();
            var a = this;
            self.setCurrentLink(a);
            var index = parseInt(a.getAttribute("data-slide"), 10) + 1;
            var currentSlide = self.el.querySelector(".slide:nth-child(" + index + ")");

            self.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
            self.animate(currentSlide);
        }, false);
    },
    setCurrentLink: function setCurrentLink(link) {
        var parent = link.parentNode;
        var a = parent.querySelectorAll("a");

        link.className = "current";

        for (var j = 0; j < a.length; ++j) {
            var cur = a[j];
            if (cur !== link) {
                cur.className = "";
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {

    //load json data locally to avoid cross origin policy
    loadJSON('data.json', function (response) {

        var data = response.data;
        var html = "";
        var nav = "";

        data.map(function (item, index) {

            var slideMarkup = "\n                    <li class=\"slide\">\n                        <img src=\"http://placehold.it/960x540\"></img>\n                        <div class='info'>\n                            <img src=\"" + item.links.logo + "\"></img>\n                            <h1>" + item.name + "</h1>\n                            <p>" + item.description + "</p>\n                        </div>\n                    </li>\n                ";

            var navMarkup = "\n                    <a href=\"#\" data-slide=\"" + index + "\">" + (index + 1) + "</a>\n                ";

            html += slideMarkup;
            nav += navMarkup;
        });

        document.getElementById('slider-wrapper').innerHTML = html;
        document.getElementById('slider-nav').innerHTML = nav;

        //initialize the slider
        var aSlider = new Slider("#slider");
    }, function (xhr) {
        console.error(xhr);
    });
});