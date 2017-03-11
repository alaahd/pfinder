function Slider( element ) {
    this.el = document.querySelector( element );
    this.init();
}

Slider.prototype = {
    init: function () {
        this.slides = this.el.querySelectorAll( "#slider-wrapper .slide" );
        this.wrapper = this.el.querySelector( "#slider-wrapper" );
        this.currentSlideIndex = 1;
        //this.navigate();
    },
    next: function (event) {
        event.preventDefault();
        this.slide(this.currentSlideIndex + 1);
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    },
    prev: function (event) {
        event.preventDefault();
        if (this.currentSlideIndex == 1) {
            this.slide(this.slides.length);
            this.currentSlideIndex = this.slides.length;
        } else {
            this.slide(this.currentSlideIndex - 1);
            this.currentSlideIndex --;
        }
    },
    animate: function( slide ) {
        var parent = slide.parentNode;
    },

    slide: function( index ) {
        var currentSlide = this.el.querySelector( ".slide:nth-child(" + index + ")" );
        this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
        this.animate( currentSlide );
    }
};
