function drag(ev, event) {
  event.dataTransfer.setData("id", ev);
}
function allowDrop(event) {
  event.preventDefault();
}
function drop(ev, event) {
  event.preventDefault();
  let image_id = event.dataTransfer.getData("id");
  let table_id_ = ev;
  tables = [];
  let price_dish;
  data_original.forEach((object) => {
    if (object.id == image_id) {
      price_dish = object.price;
    }
  });
  /*table_data.forEach((object) => {
    if (object.table_id == table_id_) {
      object.price = parseInt(object.price) + parseInt(price_dish);
      
      if(object.items_list[0].id.includes(image_id)){
        object.items_list[0].quantity+=1;
      }
      else{
        object.items_list[0].id.push(image_id);
        object.items+=1;
      }
      
    } else {
    }
  });*/
  table_data.forEach((object) => {
    if (object.table_id == table_id_) {
      object.price = parseInt(object.price) + parseInt(price_dish);
      let flag = 0;
      object.items_list.forEach((dish) => {
        if (dish.dish_id == image_id) {
          flag = 1;
          dish.quantity += 1;
        }
      });
      if (flag == 0) {
        object.items_list.push({
          dish_id: image_id,
          quantity: 1,
        });
        object.items += 1;
      }
      /*if(object.items_list[0].id.dish_id[0].includes(image_id)){
        object.items_list[0].id.quantity+=1;
      }
      else{
        object.items_list[0].id.push({"dish_id":image_id,"quantitty":1});
        object.items+=1;
      }
      console.log(object.items_list[0].id);*/
    } else {
    }
  });
  loadTables(table_data);
}
