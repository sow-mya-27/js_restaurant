function drag(ev, event) {
  event.dataTransfer.setData("id", ev);
}
function allowDrop(event) {
  event.preventDefault();
}
function drop(ev, event) {
  event.preventDefault();
  let image_id = event.dataTransfer.getData("id");
  let table_id = ev;
  tables = [];
  let price_dish;
  data_original.forEach((object) => {
    if (object.id == image_id) {
      price_dish = object.price;
    }
  });
  table_data.forEach((object) => {
    if (object.id == table_id) {
      object.price = parseInt(object.price) + parseInt(price_dish);
      object.items += 1;
    } else {
    }
  });
  loadTables(table_data);
}
