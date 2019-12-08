var searchForm = document.querySelector(".search-block");
var table = document.querySelector(".table");
var searchText = document.querySelector(".search");
var serverApiurl = "https://pulseteam.io/insideman/insider";
var companiColors = {
    "Яндекс": {
        block: "rgba(255, 216, 44, 0.28)",
        ball: "#ffd82c"
    },
    "Сбербанк": {
        block: "rgba(75, 176, 92, 0.28)",
        ball: "#4bb05c"
    }
};
loadDataByName("");
searchText.addEventListener("input", function (e) {
    var searchLength = searchText.value;

    if (searchLength.length > 2) {
        loadDataByName(e.target.value);
        
    } else if (searchLength.length == 0) {
        loadDataByName(e.target.value);
    }
});

function loadDataByName(name) {
    loadDataForList(name).then(function (response) {
        

        if (!response) {
            return;
        }

        if (response.length === 0) {
            setInformation("Уточните название компании");
            return;
        }

        response = response.map(function (obj) {
            return Object.assign(obj, {
                color: companiColors[obj.company]
            });
        });
        
        clearList();
        generateList(response);
    });
}

function loadDataForList(name) {
    var urlWithParams = "".concat(serverApiurl);

    if (name !== "") {
        urlWithParams += "?companyQuery=".concat(name);
    }

    setInformation("Загрузка данных");
    return fetch(urlWithParams).then(function (response) {
        console.log("RESPONSE", response);

        if (response.status === 200) {
            return response.json();
        }

        if (response.status === 400) {
            setInformation("Уточните название компании");
        }
    }).catch(function () {
        setInformation("Ошибка загрузки данных, попробуйте позднее");
    });
}

function setInformation(text) {
    table.innerHTML = text;
}

function clearList() {
    table.innerHTML = "";
}

function generateList(dataArray) {
    dataArray.forEach(function (data) {
     
        var element = createElement(data);

        table.appendChild(element);
    });
}

function createElement(data) {
    var element = document.createElement("div");
    element.classList.add("table-line");
    element.innerHTML = "\n            <div class=\"table-column\">".concat(data.name, "</div>\n            <div class=\"table-column2\">").concat(data.position, "</div>\n            <div class=\"table-column3\">\n                    <div>").concat(data.city, "</div>\n                    <div>").concat(data.experience, "</div>\n            </div>\n            <div class=\"table-column4\">\n                <span class=\"red\" style=\"background-color:").concat(data.color == undefined ? data.color : data.color.block, "\">\n                <span class=\"ball\" style=\"background-color:").concat(data.color == undefined ? data.color : data.color.ball, "\"></span>").concat(data.company, "</span>\n            </div>\n            ");
    return element;
}
