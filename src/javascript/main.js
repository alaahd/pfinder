document.addEventListener( "DOMContentLoaded", function() {

    //load json data locally to avoid cross origin policy
    loadJSON('data.json',
        function(response) {

            var data = response.data;
            var html = "";
            var nav = "";

            data.map(function (item, index) {

                const slideMarkup = `
                    <li class="slide">
                        <img src="http://placehold.it/960x540"></img>
                        <div class='info'>
                            <img src="${item.links.logo}"></img>
                            <h1>${item.name}</h1>
                            <p>${item.description}</p>
                        </div>
                    </li>
                `;

                const navMarkup = `
                    <a href="#" data-slide="${index}">${index+1}</a>
                `;

                html += slideMarkup;
                nav += navMarkup;
            });

            document.getElementById('slider-wrapper').innerHTML = html;
            document.getElementById('slider-nav').innerHTML = nav;

            //initialize the slider
            var aSlider = new Slider("#slider");
        },
        function(xhr) {
            console.error(xhr);
        }
    );
});