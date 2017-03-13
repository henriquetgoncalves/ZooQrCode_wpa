(function () {
    /*****************************************************************************
     *
     * Event listeners for UI elements
     * ****************************************************************************/
    document.getElementById('fabQrCodeScan').addEventListener('click', function () {
        window.location.href = "qrcode-scanner.html";
    });

    document.getElementById('menuItem_About').addEventListener('click', function () {
        window.location.href = "about.html";
    });

    document.getElementById('menuItem_Sair').addEventListener('click', function () {
        window.open(location, '_self', '');
        window.close();
    });
    
    var getData = function (key) {
        var url = 'https://henriquetgoncalves.github.io/ZooQrCode_wpa/' + key + '';

        if ('caches' in window) {
            /*
             * Check if the service worker has already cached this city's weather
             * data. If the service worker has the data, then display the cached
             * data while the app fetches the latest data.
             */
            caches.match(url).then(function (response) {
                if (response) {
                    response.json().then(function updateFromCache(json) {
                        var response = JSON.stringify(json);
                        results = JSON.parse(response);
                        console.log("getting data for cache=" + url);
                        if (key === "animals") {
                            listAnimals(results);
                        }
                    });
                }
            });
        }

        if (navigator.onLine) {
            // Make the XHR to get the data, then update the card
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    results = JSON.parse(request.response);
                    console.log("getting data for URL=" + url);
                    if (key === "animals") {
                        listAnimals(results);
                    }
                }
            };
            request.open('GET', url);
            request.send();

        }
    }
    
    var listAnimals = function (data) {
        for (var a in data) {
            console.log(a);
        }
    }
    getData("animal-detail.html");
    getData("JSONdata/animals.json");
    //Registrando o arquivo service-worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

})();