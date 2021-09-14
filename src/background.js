chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        parseItems = [];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://www.ribbit.xyz/bms/search/run?search[value]=" + request.bmsid, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var response = JSON.parse(xhr.responseText);
                sendResponse(response.data[0][0]);
            }
        }
        xhr.send();

        return true;
    }
);