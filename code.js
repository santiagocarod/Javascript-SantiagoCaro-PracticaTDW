function load() {
    var data = {
        users: [{
                key: 1,
                name: "m",
                password: "m",
                type: "reader"
            },
            {
                key: 2,
                name: "a",
                password: "a",
                type: "reader"
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

function role() {
    if (logged()) {
        return JSON.parse(window.localStorage.getItem("loggedIn")).type;
    } else {
        return null;
    }
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
    if (user != null) {
        var role = user.type;
        var username = user.name;
        var welcomeMessage = document.createElement("h5");
        title.appendChild(welcomeMessage);
        welcomeMessage.innerHTML = "<b>Bienvenido </b>" + username + ", " + role;
    }
}

function enter() {
    var login = document.getElementById("formLogin");
    var data = JSON.parse(window.localStorage.getItem("data"));
    var username = document.getElementById("username").value;
    var password = document.getElementById("pwd").value;
    var user = validateUser(data, username, password);
    if (user == null) {
        username.value = username;
        password.value = password;
        login.action = "./index.html";
    } else {
        window.localStorage.setItem("loggedIn", JSON.stringify(user));
        if (user.type == "reader") {
            login.action = "./reader.html";
        } else {
            login.action = "./writer.html";
        }
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
    window.localStorage.setItem("loggedIn", null);
}

function listTables() {
    var data = JSON.parse(window.localStorage.getItem("data"));
    displayItems(data.people, "people");
    displayItems(data.entities, "entities");
    displayItems(data.products, "products");
}

function displayItems(collection, type) {
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
        tableData.innerHTML = item.name;
    }
}