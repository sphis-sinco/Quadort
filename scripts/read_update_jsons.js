export function readUpdateJson(json_name, path_prefix) {
    var path = (path_prefix != undefined ? path_prefix : '') + "update_jsons/" + json_name + ".json";
    console.log(path);

    fetch(path)
        .then((res) => res.text())
        .then((text) => {
            console.info("Fetch success!");

            var update_header = document.createElement("h1");
            update_header.innerHTML = (json_name + " changes").toUpperCase();
            document.body.appendChild(update_header);

            parseUpdateJson(text);
        })
        .catch((e) => console.error(e));
}

function parseUpdateJson(text) {
    var update_json = JSON.parse(text);
    console.log('update_json');

    var group = document.createElement("div");

    for (const key in update_json) {
        var category = update_json[key];
        console.log(`\t${key}`);

        var category_header = document.createElement("h2");
        category_header.innerHTML = key.toUpperCase();
        group.appendChild(category_header);

        var category_group = document.createElement("ul");
        group.appendChild(category_group);

        for (const field in category) {
            console.info('\t\t' + field, category[field]);

            var field_dot = document.createElement("li");

            var line = document.createElement("p");
            line.innerHTML = category[field].line;
            field_dot.appendChild(line);

            if (category[field].elaboration != undefined)
                line.innerHTML += " : " + category[field].elaboration;

            category_group.appendChild(field_dot);
        }
    }

    document.body.appendChild(group);
}