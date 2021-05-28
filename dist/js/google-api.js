function run() {

    const totalNoURLS = retrieveAllURL();
    for (let i = 0; i < totalNoURLS.length; i++) {

        const url = setUpQuery(totalNoURLS[i].children[1].childNodes[0].value);
        const targetId = totalNoURLS[i].id;

        let totalLen = totalNoURLS[i].children.length;
        for (let x = 4; x <= totalLen; x++) {
            document.querySelector("#" + targetId + " td:nth-child(" + x + ")").classList.add("hide-col");
        }
        document.querySelector("#" + targetId + " td:nth-child(3)").setAttribute("colspan", 6);
        document.querySelector("#" + targetId + " td:nth-child(3)").innerHTML = '<div class="spinner-border text-primary" role="status">' +
            '<span class="visually-hidden">Loading...</span>' +
            '</div>';

        fetch(url)
            .then(response => response.json())
            .then(json => {
                // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
                // to learn more about each of the properties in the response object.

                // showInitialContent(json.id);
                // const cruxMetrics = {
                //     "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
                //     "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
                // };
                // showCruxContent(cruxMetrics);

                const lighthouse = json.lighthouseResult;
                const lighthouseMetrics = {
                    'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
                    'Time To Interactive': lighthouse.audits['interactive'].displayValue,
                    'Speed Index': lighthouse.audits['speed-index'].displayValue,
                    'Total Blocking Time': lighthouse.audits['total-blocking-time'].displayValue,
                    'Largest Contentful Paint': lighthouse.audits['largest-contentful-paint'].displayValue,
                    'Cumulative Layout Shift': lighthouse.audits['cumulative-layout-shift'].displayValue
                };
                showLighthouseContent(targetId, lighthouseMetrics);
            });
    }
}

function setUpQuery(queryURL) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
        url: encodeURIComponent(queryURL),
        key: 'AIzaSyCiWeNmyM8Ej3WBW19JFIubRFRLzf2eOG0',
        strategy: "mobile",
        category: "performance"
    };
    let query = `${api}?`;
    for (let key in parameters) {
        query += `${key}=${parameters[key]}&`;
    }
    return query;
}

function showLighthouseContent(targetId, lighthouseMetrics) {    

    let count = 3;
    for (let key in lighthouseMetrics) {
        
        let targetRow = document.querySelector("#" + targetId + " td:nth-child(" + count + ")");
        if (count === 3) {
            document.querySelector("#" + targetId + " td:nth-child(" + count + ")").removeAttribute("colspan");
        } else {
            document.querySelector("#" + targetId + " td:nth-child(" + count + ")").classList.remove("hide-col");
        }

        targetRow.innerHTML = lighthouseMetrics[key];
        count++;       
    }
    targetId = "";
}

function retrieveAllURL() {
    const getURLs = document.querySelectorAll('[id^="slugRow"]');
    return getURLs;
}

/**
 * None useful functions for the time being.
 *
 */

// function showInitialContent(id) {
//     document.body.innerHTML = '';
//     const title = document.createElement('h1');
//     title.textContent = 'PageSpeed Insights API Demo';
//     document.body.appendChild(title);
//     const page = document.createElement('p');
//     page.textContent = `Page tested: ${id}`;
//     document.body.appendChild(page);
// }

// function showCruxContent(cruxMetrics) {
//     const cruxHeader = document.createElement('h2');
//     cruxHeader.textContent = "Chrome User Experience Report Results";
//     document.body.appendChild(cruxHeader);
//     for (key in cruxMetrics) {
//         const p = document.createElement('p');
//         p.textContent = `${key}: ${cruxMetrics[key]}`;
//         document.body.appendChild(p);
//     }
// }

export {run};