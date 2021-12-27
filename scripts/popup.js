function modal(event, id) {
  document.getElementById("popup").className = "modal-open";
  let name;
  var table;
  table_data.forEach((object) => {
    if (object.table_id == id) {
      name = object.table_name;
      table = object;
    }
  });
  let i = 1;
  loadPopup(table);
  /*table.items_list[0].id.forEach((object) => {
    //console.log(object.length);
    if (object.dish_id != 0) {
      let tr = document.createElement("tr");
      let sno = document.createElement("td");
      sno.innerText = i++;
      let dish_name = document.createElement("td");
      let price_dish = document.createElement("td");
      let qu = document.createElement("input");
      qu.value = object.quantity;
      qu.innerText = object.quantity;
      qu.setAttribute("type", "number");
      qu.setAttribute("min", 1);
      qu.setAttribute("max", 100);
      object.quantity = qu.value;
      console.log(qu.value);

      data_original.forEach((dish) => {
        if (dish.id == object.dish_id) {
          dish_name.innerText = dish.name;
          price_dish.innerText = dish.price * object.quantity;
        }
      });
      tr.appendChild(sno);
      tr.appendChild(dish_name);
      tr.appendChild(qu);
      tr.appendChild(price_dish);

      console.log(dish_name);

      document.getElementById("table_modal").appendChild(tr);
    }
  });
  document.getElementById("details").innerHTML.innerText += name;*/
}
function closeModal() {
  document.getElementById("popup").className = "modal-close";
}
function getDishName(id) {
  data_original.forEach((object) => {
    if (object.id == id) {
      return object.name;
    }
  });
}

function loadPopup(table) {
  document.getElementById("table_modal").innerHTML = "";
  let modal = document.getElementById("table_modal");
  let th = document.createElement("tr");
  th.setAttribute("class", "bold");
  let sno = document.createElement("td");
  sno.innerText = "SNO";
  let itemName = document.createElement("td");
  itemName.innerText = "Item Name";
  let qua = document.createElement("td");
  qua.innerText = "Quantity";
  let price = document.createElement("td");
  price.innerText = "price";
  let del = document.createElement("td");
  del.innerText = "";
  th.appendChild(sno);
  th.appendChild(itemName);
  th.appendChild(qua);
  th.appendChild(price);
  th.appendChild(del);

  modal.appendChild(th);
  let total_price = 0;
  let i = 1;
  let name = table.table_name;
  let delete1;
  table.items_list.forEach((object) => {
    //console.log(object.length);
    if (object.dish_id != 0) {
      let tr = document.createElement("tr");
      let sno = document.createElement("td");
      sno.innerText = i++;
      let dish_name = document.createElement("td");
      let price_dish = document.createElement("td");
      let qu = document.createElement("input");
      qu.setAttribute("value", object.quantity);
      let input_id;
      let dish_id;
      qu.setAttribute("type", "number");
      qu.setAttribute("onchange", "changeContents(event)");
      data_original.forEach((dish) => {
        if (dish.id == object.dish_id) {
          dish_name.innerText = dish.name;
          price_dish.innerText = dish.price * object.quantity;
          total_price = parseInt(total_price) + parseInt(price_dish.innerText);
          dish_id = dish.id;
        }
      });
      input_id = table.table_id + " " + dish_id;
      qu.setAttribute("id", input_id);
      delete1 = document.createElement("img");
      let del_id = table.table_id + "_" + dish_id;
      delete1.setAttribute("id", del_id);
      delete1.src =
        "https://yannismygdanis.com/synth4kids/images/Attributes/Delete.png";
      delete1.setAttribute("class", "del");
      delete1.setAttribute("onclick", "deleteDish(event.target.id)");
      tr.appendChild(sno);
      tr.appendChild(dish_name);
      tr.appendChild(qu);
      tr.appendChild(price_dish);
      tr.appendChild(delete1);
      table.price = total_price;
      document.getElementById("total_price").innerHTML =
        "Total Price :  " + total_price;
      document.getElementById("table_modal").appendChild(tr);
      loadTables(table_data);
    }
  });
}
function changeContents(e) {
  let input = document.getElementById("e.target.id");
  if (e.target.value == 0) {
    let a = e.target.id.replace(" ", "_");

    deleteDish(a);
  }
  let [table_id, dish_id] = e.target.id.split(" ");
  let table;
  table_data.forEach((object) => {
    if (object.table_id == table_id) {
      table = object;
      object.items_list.forEach((dish) => {
        if (dish.dish_id == dish_id) {
          dish.quantity = e.target.value;
        }
      });
    }
  });
  loadPopup(table);
}
function deleteDish(e) {
  let [table_id, dish_id] = e.split("_");
  let dishPrice, table, quantity;
  data_original.forEach((object) => {
    if (object.id == dish_id) {
      dishPrice = object.price;
    }
  });
  table_data.forEach((object) => {
    let i = 0;
    if (object.table_id == table_id) {
      table = object;
      object.items_list.forEach((dish) => {
        i++;
        if (dish.dish_id == dish_id) {
          quantity = dish.quantity;
          dish.quantity = 0;
          console.log(i);
          object.items_list.splice(i - 1, 1);
          i--;
        }
      });
    }
  });
  table.items -= 1;
  table.price -= quantity * dishPrice;
  document.getElementById("total_price").innerHTML =
    "Total Price :  " + table.price;
  loadPopup(table);
  loadTables(table_data);
}
