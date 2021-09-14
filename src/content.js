function getUrlQueries(q) {
    var queryStr = q.slice(1);
    queries = {};

    if (!queryStr) {
        return queries;
    }

    queryStr.split('&').forEach(function (queryStr) {
        var queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });

    return queries;
}


let header3 = document.querySelectorAll("h3");

let a = document.getElementsByTagName("a");
let bmsid;
for (let i = 0; i < a.length; i++) {
    if (a[i].innerText == "更新履歴") {
        bmsid = getUrlQueries(a[i].href).bmsid;
    }
    if ((a[i].href.indexOf("dropbox.com") != 1) && (a[i].href.indexOf("?dl=0") != 1)) {
        a[i].href = a[i].href.replace("?dl=0", "?dl=1");
        a[i].innerText = a[i].innerText.replace("?dl=0", "?dl=1");
    }
}

let header1 = document.querySelectorAll("h1");
for (let i = 0; i < header1.length; i++) {
    document.title = header1[i].innerText + " - LR2 internet ranking";
    break
}

params = getUrlQueries(document.location.search);

if (("bmsid" in params) || ("bmsmd5" in params)) {
    for (let i = 0; i < header3.length; i++) {
        if (i == 0) {
            let new_element = document.createElement('h3');
            new_element.textContent = 'LR2IR-Helper';

            header3[i].before(new_element);

            let table_element = document.createElement("table");

            // bmsid
            bmsid_tr_element = document.createElement("tr");
            bmsid_th_element = document.createElement("th");
            bmsid_th_element.textContent = "bmsid";
            bmsid_th_element.width = "15%";

            bmsid_td_element = document.createElement("td");
            bmsid_a_element = document.createElement("a");

            bmsid_a_element.href = "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=" + bmsid;
            bmsid_a_element.textContent = bmsid;

            bmsid_td_element.appendChild(bmsid_a_element);

            bmsid_tr_element.appendChild(bmsid_th_element);
            bmsid_tr_element.appendChild(bmsid_td_element);
            table_element.appendChild(bmsid_tr_element);

            // bmsmd5
            bmsmd5_tr_element = document.createElement("tr");

            bmsmd5_th_element = document.createElement("th");
            bmsmd5_th_element.textContent = "bmsmd5";
            bmsmd5_th_element.width = "15%";

            bmsmd5_td_element = document.createElement("td");
            bmsmd5_a_element = document.createElement("a");

            // BMS Score Viewer
            viewer_tr_element = document.createElement("tr");
            viewer_th_element = document.createElement("th");
            viewer_th_element.textContent = "BMS Score Viewer";
            viewer_th_element.width = "15%";

            viewer_td_element = document.createElement("td");
            viewer_a_element = document.createElement("a");

            chrome.runtime.sendMessage({
                    bmsid: bmsid
                },
                function (response) {
                    bmsmd5_a_element.href = "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" + response;
                    bmsmd5_a_element.textContent = response;
                    viewer_a_element.href = "http://www.ribbit.xyz/bms/score/view?md5=" + response;
                    viewer_a_element.textContent = "http://www.ribbit.xyz/bms/score/view?md5=" + response;
                });

            bmsmd5_td_element.appendChild(bmsmd5_a_element);
            bmsmd5_tr_element.appendChild(bmsmd5_th_element);
            bmsmd5_tr_element.appendChild(bmsmd5_td_element);
            table_element.appendChild(bmsmd5_tr_element);

            viewer_td_element.appendChild(viewer_a_element);
            viewer_tr_element.appendChild(viewer_th_element);
            viewer_tr_element.appendChild(viewer_td_element);
            table_element.appendChild(viewer_tr_element);

            header3[i].before(table_element);
        }
    }
}