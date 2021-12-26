function modal(event, id) {
  document.getElementById("popup").className = "modal-open";
  let name;
  var table;
  table_data.forEach((object) => {
    
    if (object.table_id == id) {
      name = object.table_name;
      table=(object);
    }
  });
  let i=1;
  table.items_list[0].id.forEach((object)=>{
    //console.log(object.length);
    if(object.dish_id!=0){
      let tr=document.createElement("tr");
    let sno=document.createElement("td");
    sno.innerText = i++;
    let dish_name=document.createElement("td");
    let price_dish=document.createElement("td");
    let qu=document.createElement("input");
    qu.value=object.quantity;
    qu.innerText=object.quantity;
    qu.setAttribute("type","number");
    qu.setAttribute("min",1);
    qu.setAttribute("max",100);
    object.quantity=qu.value;
    console.log(qu.value);
    

    data_original.forEach((dish)=>{
      if(dish.id==object.dish_id){
        dish_name.innerText=(dish.name);
        price_dish.innerText=dish.price*object.quantity;
      }
    })
    tr.appendChild(sno);
    tr.appendChild(dish_name);
    tr.appendChild(qu);
    tr.appendChild(price_dish);
    
    console.log(dish_name);

    document.getElementById("table_modal").appendChild(tr);

    }
  })
  document.getElementById("details").innerHTML.innerText+=name;
  
  
}
function closeModal() {
  document.getElementById("popup").className = "modal-close";
}
function getDishName(id){
  data_original.forEach((object)=>{
    if(object.id==id){
      console.log(object.name);
      return object.name;
    }
  })
}