document.addEventListener( "DOMContentLoaded", function() {

    //load json data locally to avoid cross origin policy
    loadJSON('data.json',
        function(response) {

            var data = response.data;

            data.map(function (item, indx) {

                var tmplSlide = _.template("<li class='slide'><img src='http://placehold.it/960x540' /><div class='info'><img src='<%= item.links.logo %>' /><h1><%= item.name %></h1><p><%= item.description %></p></div></li>");
                var slide = tmplSlide({item: item});
                $('#slider-wrapper').append(slide);

                var tmplNav = _.template("<a href='#' data-slide='<%= indx %>'><%= indx+1 %></a>");
                var nav = tmplNav({indx: indx});
                $('#slider-nav').append(nav);
            });

            //initialize the slider
            var aSlider = new Slider("#slider");
        },
        function(xhr) {
            console.error(xhr);
        }
    );
});