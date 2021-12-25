var data_original = [];
var table_data = [];
var i = 1,
  j = 1;

window.onload = () => {
  fetch("../json files/index.json").then(async (response) => {
    data_original = await response.json();
    loadImages(data_original);
  });
  fetch("../json files/table.json").then(async (response) => {
    table_data = await response.json();
    loadTables(table_data);
  });
};

function loadTables(data) {
  document.getElementById("tables").innerHTML = "";
  data.forEach((object) => {
    let table1 = document.createElement("div");
    table1.setAttribute("class", "table1");
    table1.setAttribute("id", object.id);
    let table_name = document.createElement("div");
    table_name.setAttribute("class", "table-name");
    table1.appendChild(table_name);
    let cost = document.createElement("div");
    cost.setAttribute("class", "cost");
    let total_items = document.createElement("div");
    total_items.setAttribute("class", "total-items");
    table1.appendChild(cost);
    table1.appendChild(total_items);
    cost.innerText = "Total Price :  " + object.price;
    total_items.innerText = "Total Items :  " + object.items;
    table_name.innerText = "Table Name :  " + object.table_name;
    document.getElementById("tables").appendChild(table1);
    table1.setAttribute("ondrop", "drop(this.id,event)");
    table1.setAttribute("ondragover", "allowDrop(event)");
  });
}

function loadImages(data) {
  document.getElementById("container").innerHTML = "";
  data.forEach((object) => {
    var dish = document.createElement("div");
    dish.setAttribute("class", "dish");
    dish.id = object.id;
    dish.setAttribute("id", object.id);
    //dish.setAttribute("onClick", "tableClick(event.target.id)");

    var image = document.createElement("div");
    dish.appendChild(image);
    image.setAttribute("class", "image");
    var img = document.createElement("img");
    image.appendChild(img);
    img.src = object.image;

    var dish_name = document.createElement("div");
    dish_name.setAttribute("class", "dish-name");
    var price = document.createElement("div");
    price.setAttribute("class", "price");
    dish.appendChild(dish_name);

    dish_name.innerText = "Name: " + object.name;
    price.innerText = "price:  " + object.price;
    dish.appendChild(price);
    dish.setAttribute("draggable", "true");
    dish.setAttribute("ondragstart", "drag(this.id,event)");
    //dish.setAttribute("onclick", "tableClick(this.id)");

    document.getElementById("container").appendChild(dish);

    /*
    dish.innerHTML =
      "Table Name: " +
      "element.name" +
      "<br>" +
      "Amount: " +
      "element.total_price" +
      " Rs | Total items: " +
      "element.total_items";
    document.getElementById("container").appendChild(dish);*/
  });
}

function searchTables(input) {
  let searchData = [];
  for (let i = 0; i < table_data.length; i++) {
    const data = table_data[i].table_name.toLowerCase();

    if (data.includes(input)) {
      searchData.push(table_data[i]);
    }
  }
  loadTables(searchData);
}

function searchImages(input) {
  let searchData = [];
  for (let i = 0; i < data_original.length; i++) {
    const data = data_original[i].name.toLowerCase();
    const course = data_original[i].course_type.toLowerCase();
    if (data.includes(input) || course.includes(input)) {
      searchData.push(data_original[i]);
    }
  }
  loadImages(searchData);
}
