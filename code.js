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
                name: "Tim Berners-Lee",
                date: "8 de Junio de 1955",
                picture: "https://s2.latercera.com/wp-content/uploads/2018/12/Tim.jpg",
                wiki: "https://en.wikipedia.org/wiki/Tim_Berners-Lee"

            },
            {
                name: "Richard Stallman",
                date: "16 de Marzo 1953",
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7x0V2_5oVEfi3gW6P8PhAxkdXZMJKK-Qo-xRoKuB6Xb_K5fuE",
                wiki: "https://en.wikipedia.org/wiki/Richard_Stallman-Lee"

            },
        ],
        entities: [{
                name: "World Wide Web Consortium",
                date: "1 de Octubre de 1994",
                picture: "https://d2908q01vomqb2.cloudfront.net/ca3512f4dfa95a03169c5a670a4c91a19b3077b4/2018/10/18/w3c_logo-800x400.jpg",
                wiki: "https://en.wikipedia.org/wiki/World_Wide_Web_Consortium"

            },
            {
                name: "Free Software Fundation",
                date: "14 de Octubre de 1985",
                picture: "https://pbs.twimg.com/profile_images/471735621946314752/imENUbEK_400x400.png",
                wiki: "https://en.wikipedia.org/wiki/Free_Software_Foundation"

            },
        ],
        products: [{
                name: "HyperText Markup Language",
                date: "1993",
                picture: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
                wiki: "https://en.wikipedia.org/wiki/HTML"

            },
            {
                name: "GNU / Linux",
                date: "17 de Septiembre 1991",
                picture: "https://www.wallpaperflare.com/static/893/596/940/tux-linux-foxyriot-logo-wallpaper.jpg",
                wiki: "https://en.wikipedia.org/wiki/Linux"

            },
        ]
    }
    calculateID(data);
    window.localStorage.setItem("data", JSON.stringify(data));
    location = "index.html";
    return false;
}

function calculateID(data) {
    var count = 0;
    for (item of data.people) {
        var id = "p";
        if (count < 10) {
            id = id + "0";
        }
        item["id"] = id + count;
        count = count + 1;
    }
    count = 0;
    for (item of data.entities) {
        var id = "e";
        if (count < 10) {
            id = id + "0";
        }
        item["id"] = id + count;
        count = count + 1;
    }
    count = 0;
    for (item of data.products) {
        var id = "r";
        if (count < 10) {
            id = id + "0";
        }
        item["id"] = id + count;
        count = count + 1;
    }
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
    } else {
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

function listTablesWriter() {
    var data = JSON.parse(window.localStorage.getItem("data"));
    displayItemsWriter(data.people, "people");
    displayItemsWriter(data.entities, "entities");
    displayItemsWriter(data.products, "products");
}

function displayItemsWriter(collection, type) {
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
    header.setAttribute("colspan", "3");
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

        var updateData = document.createElement("td");
        tableRow.appendChild(updateData);
        var updateButton = document.createElement("img");
        updateData.appendChild(updateButton);
        updateButton.setAttribute("src", "https://image.flaticon.com/icons/png/512/84/84380.png");
        updateButton.setAttribute("width", "20");
        updateButton.setAttribute("class", "btn-img");
        updateButton.setAttribute("onclick", "location.href=\"edit.html?id=" + item.id + "\"")

        var deleteData = document.createElement("td");
        tableRow.appendChild(deleteData);
        var deleteButton = document.createElement("img");
        deleteData.appendChild(deleteButton);
        deleteButton.setAttribute("src", "https://vectorified.com/images/delete-icon-png-1.png");
        deleteButton.setAttribute("width", "20");
        deleteButton.setAttribute("class", "btn-img");
        deleteButton.setAttribute("onclick", "location.href=\"delete.html?id=" + item.id + "\"")
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
}

function deleteItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var data = JSON.parse(window.localStorage.getItem("data"));
    var position = parseInt(code[1] + code[2]);
    if (code[0] == 'p') {
        data.people.splice(position, 1);
    } else if (code[0] == 'e') {
        data.entities.splice(position, 1);
    } else {
        data.products.splice(position, 1);
    }
    calculateID(data);
    window.localStorage.setItem("data", JSON.stringify(data));
    location = "writer.html";
    return false;
}


function loadData() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var item = searchItemId(code);

    var type = document.getElementById("type");
    type.value = code[0];
    //type.setAttribute("disabled", "true")

    var name = document.getElementById("name");
    name.value = item.name;

    var date = document.getElementById("date");
    date.value = item.date;

    var date1 = document.getElementById("date1");

    var picture = document.getElementById("picture");
    picture.value = item.picture;

    var wiki = document.getElementById("wiki");
    wiki.value = item.wiki;
}

function edit() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var data = JSON.parse(window.localStorage.getItem("data"));
    type = document.getElementById("type").value;
    if (code[0] == type) {
        if (code[0] == 'p') {
            for (item of data.people) {
                if (item.id == code) {
                    item.name = document.getElementById("name").value;
                    item.date = document.getElementById("date").value;
                    item.date1 = document.getElementById("date1").value;
                    item.picture = document.getElementById("picture").value;
                    item.wiki = document.getElementById("wiki").value;
                }
            }
        } else if (code[0] == 'e') {
            for (item of data.entities) {
                if (item.id == code) {
                    item.name = document.getElementById("name").value;
                    item.date = document.getElementById("date").value;
                    item.date1 = document.getElementById("date1").value;
                    item.picture = document.getElementById("picture").value;
                    item.wiki = document.getElementById("wiki").value;
                }
            }
        } else {
            for (item of data.products) {
                if (item.id == code) {
                    item.name = document.getElementById("name").value;
                    item.date = document.getElementById("date").value;
                    item.date1 = document.getElementById("date1").value;
                    item.picture = document.getElementById("picture").value;
                    item.wiki = document.getElementById("wiki").value;
                }
            }
        }
    } else {
        var newItem = new Object;
        newItem.name = document.getElementById("name").value;
        newItem.date = document.getElementById("date").value;
        newItem.date1 = document.getElementById("date1").value;
        newItem.picture = document.getElementById("picture").value;
        newItem.wiki = document.getElementById("wiki").value;
        console.log(newItem);
        var type = document.getElementById("type").value;
        if (type == "p") {
            data.people.push(newItem);
        } else if (type == "e") {
            data.entities.push(newItem);
        } else {
            data.products.push(newItem);
        }
        var position = parseInt(code[1] + code[2]);
        if (code[0] == 'p') {
            data.people.splice(position, 1);
        } else if (code[0] == 'e') {
            data.entities.splice(position, 1);
        } else {
            data.products.splice(position, 1);
        }
        calculateID(data);


    }

    window.localStorage.setItem("data", JSON.stringify(data));
    location = "writer.html";
    return false;
}

function saveNew() {
    var data = JSON.parse(window.localStorage.getItem("data"));
    var newItem = new Object;
    newItem.name = document.getElementById("name").value;
    newItem.date = document.getElementById("date").value;
    newItem.date1 = document.getElementById("date1").value;
    newItem.picture = document.getElementById("picture").value;
    newItem.wiki = document.getElementById("wiki").value;
    console.log(newItem);
    var type = document.getElementById("type").value;
    if (type == "p") {
        data.people.push(newItem);
    } else if (type == "e") {
        data.entities.push(newItem);
    } else {
        data.products.push(newItem);
    }
    calculateID(data);
    window.localStorage.setItem("data", JSON.stringify(data));
    return true;
}