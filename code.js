function load() {
    var data = {
        users: [{
                key: 1,
                name: "m",
                password: "m",
                type: "writer"
            },
            {
                key: 2,
                name: "a",
                password: "a",
                type: "writer"
            },
            {
                key: 3,
                name: "b",
                password: "b",
                type: "writer"
            },
            {
                key: 4,
                name: "c",
                password: "c",
                type: "writer"
            },
        ],
        people: [{
                id: "p01",
                name: "Tim Berners-Lee",
                date: "8 de Junio de 1955",
                picture: "https://s2.latercera.com/wp-content/uploads/2018/12/Tim.jpg",
                wiki: "https://en.wikipedia.org/wiki/Tim_Berners-Lee",
                video: "https://www.youtube.com/embed/OM6XIICm_qo"

            },
            {
                id: "p02",
                name: "Richard Stallman",
                date: "16 de Marzo 1953",
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7x0V2_5oVEfi3gW6P8PhAxkdXZMJKK-Qo-xRoKuB6Xb_K5fuE",
                wiki: "https://en.wikipedia.org/wiki/Richard_Stallman-Lee",
                video: "https://www.youtube.com/embed/Gnw_K5DPkbc"

            },
        ],
        entities: [{
                id: "e01",
                name: "World Wide Web Consortium",
                date: "1 de Octubre de 1994",
                picture: "https://d2908q01vomqb2.cloudfront.net/ca3512f4dfa95a03169c5a670a4c91a19b3077b4/2018/10/18/w3c_logo-800x400.jpg",
                wiki: "https://en.wikipedia.org/wiki/World_Wide_Web_Consortium",
                video: "https://www.youtube.com/embed/20SHvU2PKsM"

            },
            {
                id: "e02",
                name: "Free Software Fundation",
                date: "14 de Octubre de 1985",
                picture: "https://pbs.twimg.com/profile_images/471735621946314752/imENUbEK_400x400.png",
                wiki: "https://en.wikipedia.org/wiki/Free_Software_Foundation",
                video: "https://www.youtube.com/embed/AgjoWc-_y6Q"

            },
        ],
        products: [{
                id: "r01",
                name: "HyperText Markup Language",
                date: "1993",
                picture: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
                wiki: "https://en.wikipedia.org/wiki/HTML",
                video: "https://www.youtube.com/embed/7OghSdE6gfI"

            },
            {
                id: "r02",
                name: "GNU / Linux",
                date: "17 de Septiembre 1991",
                picture: "https://www.wallpaperflare.com/static/893/596/940/tux-linux-foxyriot-logo-wallpaper.jpg",
                wiki: "https://en.wikipedia.org/wiki/Linux",
                video: "https://www.youtube.com/embed/zA3vmx0GaO8"

            },
        ]
    }
    window.localStorage.setItem("data", JSON.stringify(data));
}

function logged() {
    return JSON.parse(window.localStorage.getItem("loggedIn")) != null
}

function validate() {
    if (!logged()) {
        var body = document.getElementsByTagName("body")[0];
        body.innerHTML = "";
        var message = document.createElement("h4");
        body.appendChild(message);
        message.innerHTML = "<br><br><br><br><center><a href=\"./index.html\">Por favor ingrese al sistema primero</center>";
    }
}

function printUser() {
    var title = document.getElementById("title");
    var user = JSON.parse(window.localStorage.getItem("loggedIn"));

    var div1 = document.createElement("div");
    title.appendChild(div1);
    div1.setAttribute("class", "container");

    var div2 = document.createElement("div");
    div1.appendChild(div2)
    div2.setAttribute("class", "row");

    var divHome = document.createElement("div");
    div2.appendChild(divHome);
    divHome.setAttribute("class", "col-sm");
    var homeButton = document.createElement("button");
    divHome.appendChild(homeButton);
    homeButton.innerHTML = "Inicio";
    homeButton.setAttribute("class", "btn btn-secondary")
    if (user != null) {
        homeButton.setAttribute("onclick", "location.href=\"writer.html\"")
   
        var divWelcome = document.createElement("div");
        div2.appendChild(divWelcome);
        divWelcome.setAttribute("class", "col-sm");

        var username = user.name;
        var welcomeMessage = document.createElement("h5");
        divWelcome.appendChild(welcomeMessage);

        welcomeMessage.innerHTML = "<b><center>Bienvenido </b>" + username;

        var divButton = document.createElement("div");
        div2.appendChild(divButton);
        divButton.setAttribute("class", "col-sm");
        var form = document.createElement("form")
        divButton.appendChild(form);
        form.setAttribute("onsubmit", "return logout();");
        var logOutButton = document.createElement("button");
        form.appendChild(logOutButton);
        logOutButton.setAttribute("class", "btn btn-secondary float-right");
        logOutButton.innerHTML = "Salir";
    }
    else{
        homeButton.setAttribute("onclick", "location.href=\"index.html\"")
    }
}

function enter() {
    var login = document.getElementById("formLogin");
    var data = JSON.parse(window.localStorage.getItem("data"));
    var username = document.getElementById("username").value;
    var password = document.getElementById("pwd").value;
    var user = validateUser(data, username, password);
    if (user == null) {
        username.value = "";
        password.value = "";
        login.action = "./index.html";
    } else {
        window.localStorage.setItem("loggedIn", JSON.stringify(user));
        login.action = "./writer.html";

    }
    return user != null;
}


function validateUser(data, username, password) {
    for (user of data.users) {
        if (user.name == username && user.password == password) {
            return user;
        }
    }
    return null;
}

function logout() {
    location = "index.html";
    window.localStorage.setItem("loggedIn", null);
    return false;
}

function listTablesReader() {
    var data = JSON.parse(window.localStorage.getItem("data"));
    displayItemsReader(data.people, "people");
    displayItemsReader(data.entities, "entities");
    displayItemsReader(data.products, "products");
}

function displayItemsReader(collection, type) {
    var column = document.getElementById(type + "Column");
    var table = document.createElement("table");
    table.setAttribute("id", type + "Table");
    table.setAttribute("class", "table");
    column.appendChild(table);
    var tableHeader = document.createElement("thead");
    table.appendChild(tableHeader);
    tableHeader.setAttribute("class", "thead-dark");
    var tableRow = document.createElement("tr");
    tableHeader.appendChild(tableRow);
    var header = document.createElement("th");
    tableRow.appendChild(header);
    header.setAttribute("scope", "col");
    if (type == "people") {
        var title = "Personas";
    } else if (type == "entities") {
        var title = "Entidades";
    } else {
        var title = "Productos";
    }
    header.innerHTML = title;
    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    for (item of collection) {
        var tableRow = document.createElement("tr")
        tableBody.appendChild(tableRow);
        var tableData = document.createElement("td");
        tableRow.appendChild(tableData);
        var link = document.createElement("a");
        tableData.appendChild(link);
        link.setAttribute("href", "/displayItem.html?id=" + item.id);
        link.innerHTML = item.name;
    }
}

function searchItemId(code) {
    var data = JSON.parse(window.localStorage.getItem("data"));
    var collection;
    if (code[0] == 'p') {
        collection = data.people;
    } else if (code[0] == 'e') {
        collection = data.entities;
    } else {
        collection = data.products;
    }

    for (item of collection) {
        if (item.id == code) {
            return item;
        }
    }
    return null;

}

function printItem() {

    var title = document.getElementById("title");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var h1 = document.createElement("h1");
    title.appendChild(h1);
    h1.innerHTML = searchItemId(code).name;

    var picture = document.getElementById("picture");
    picture.setAttribute("src", item.picture);

    var date = document.getElementById("date");
    var dateInfo = document.createElement("h5");
    date.appendChild(dateInfo);
    dateInfo.innerHTML = item.date;

    var body = document.getElementById("wiki");
    var wikiTitle = document.createElement("h4");
    body.appendChild(wikiTitle);
    wikiTitle.innerHTML = "<br>Wiki";

    var divIframe = document.createElement("div");
    body.appendChild(divIframe);
    divIframe.setAttribute("class", "embed-responsive embed-responsive-16by9")

    var wiki = document.createElement("iframe");
    divIframe.appendChild(wiki);
    wiki.setAttribute("src", item.wiki);
    wiki.setAttribute("class", "embed-responsive-item");

    var videosTitle = document.createElement("h4");
    body.appendChild(videosTitle);
    videosTitle.innerHTML = "<br>Videos";

    var divIframeVideo = document.createElement("div");
    body.appendChild(divIframeVideo);
    divIframe.setAttribute("class", "embed-responsive embed-responsive-16by9")

    var video = document.createElement("iframe");
    divIframeVideo.appendChild(video);
    video.setAttribute("src", item.video);
    video.setAttribute("class", "embed-responsive embed-responsive-16by9")
    video.setAttribute("height", "500");


}