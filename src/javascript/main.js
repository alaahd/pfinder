document.addEventListener( "DOMContentLoaded", function() {

    //load json data locally to avoid cross origin policy
    loadJSON('data.json',
        function(response) {

            var data = response.data;
            var html = "";

            data.map((item, index)=> {

                const slideMarkup = `
                    <li class="slide">
                        <img src="http://placehold.it/960x540" />
                        <div class='info'>
                            <div class='masthead'>
                                <div>
                                    <img src="${item.links.logo}" />
                                    <h3><span>Total Properties: </span>${item.totalProperties}</h3>
                                </div>
                                <div>
                                    <h1>${item.name}</h1>
                                    <h2>${item.location}</h2>
                                    <p>${item.description.substr(0,520)}&hellip;</p>
                                </div>
                            </div>
                            <ul class='meta'>
                                <li><div><span>Residential For Rent</span>${item.residentialForRentCount}</div></li>
                                <li><div><span>Residential For Sale</span>${item.residentialForSaleCount}</div></li>
                                <li><div><span>Commercial For Rent</span>${item.commercialForRentCount}</div></li>
                                <li><div><span>Commercial For Sale</span>${item.commercialForSaleCount}</div></li>
                                <li><div><span>Commercial Total</span>${item.commercialTotalCount}</div></li>
                                <li><div><span>Available Agents</span>${item.agentCount}</div></li>
                            </ul>
                            <div class='contact'>
                                ${item.phone}
                            </div>
                        </div>
                    </li>
                `;

                html += slideMarkup;
            });

            document.getElementById('slider-wrapper').innerHTML = html;

            //initialize the slider
            window.pSlider = new Slider("#slider");
        },
        function(xhr) {
            console.error(xhr);
        }
    );
});