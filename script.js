
//Admin Page Function start
function showAdminItems()
{
// var foodItems  =  [
    //     { id: 1, name: 'Sandwich', price: 99, active: 'Yes', dateOfLaunch: '2017-03-25', category: 'Main Course', freeDelivery: 'Yes' },
    //     { id: 2, name: 'Burger', price: 129, active: 'Yes', dateOfLaunch: '2017-03-25', category: 'Main Course', freeDelivery: 'No' },
    //     { id: 3, name: 'Pizza', price: 149, active: 'Yes', dateOfLaunch: '2017-03-25', category: 'Main Course', freeDelivery: 'No' },
    //     { id: 4, name: 'French Fries', price: 57, active: 'No', dateOfLaunch: '2017-03-25', category: 'Starters', freeDelivery: 'Yes' },
    //     { id: 5, name: 'Chocolate Brownies', price: 32, active: 'Yes', dateOfLaunch: '2017-03-25', category: 'Dessert', freeDelivery: 'Yes' }
    // ]

    //getting food items object array from localstorage
    var foodItems = JSON.parse(localStorage.getItem("foodarr"));
    localStorage.setItem("foodarr",JSON.stringify(foodItems));

    //table div 
    var tableBody = document.getElementById("admin-table");

    //Traversing through array to display food items
    for(var i = 0;i<foodItems.length;i++)
    {   
        //creating row
        var tableRow = document.createElement("tr");
        //creating column
        var name = document.createElement("td");
        //creating attributes
        var colSpan = document.createAttribute("colspan");
        colSpan.value = "6";
        //setting attributes
        name.setAttributeNode(colSpan);
        name.textContent = foodItems[i].name;
        tableRow.appendChild(name);
        name.style.textAlign = "left";

        var price = document.createElement("td");
        price.textContent = "Rs. "+foodItems[i].price;
        var colSpan2 = document.createAttribute("colspan");
        colSpan2.value = "2";
        price.setAttributeNode(colSpan2);
        tableRow.appendChild(price);
        price.style.textAlign = "left";
        
        var active = document.createElement("td");
        active.textContent = foodItems[i].active;
        tableRow.appendChild(active);
        active.style.textAlign = "center";

        var dateOfLaunch = document.createElement("td");
        dateOfLaunch.textContent = foodItems[i].dateOfLaunch;
        tableRow.appendChild(dateOfLaunch);
        dateOfLaunch.style.textAlign = "center";

        var category = document.createElement("td");
        category.textContent = foodItems[i].category;
        tableRow.appendChild(category);
        category.style.textAlign = "center";

        var freeDelivery = document.createElement("td");
        freeDelivery.textContent = foodItems[i].freeDelivery;
        tableRow.appendChild(freeDelivery);
        freeDelivery.style.textAlign = "center";
        var action = document.createElement("td");
        var anch = document.createElement("a");
        anch.textContent = "Edit";
        var href = document.createAttribute("href");
        var linkname = document.createAttribute("name");
        href.value = "edit-menu-item.html";
        linkname.value = foodItems[i].name;
        anch.onclick = editItem;
        anch.setAttributeNode(href);
        anch.setAttributeNode(linkname);
        action.appendChild(anch);
        tableRow.appendChild(action);
        action.style.textAlign = "center";
        tableBody.appendChild(tableRow);
    }
}


//finding index of element to edit
var editItem = function(event){
    var x = event.path[0].attributes[1].value;
    localStorage.setItem("editValue",x);
}

//Function to edit menu item
function editItems()
{
    // debugger;
    if(!localStorage.getItem("editValue")){
        alert("Please select item to edit");
        return false;
    }
    // debugger;
    var prodname = document.getElementById("prodname").value;
    var price = document.getElementById("price").value;
    var active = document.getElementById("active1").checked?"Yes":"No";
    var category = document.getElementById("category").value;
    var freeDelivery = document.getElementById("freeDelivery").checked?"Yes":"No";
    var dateOfLaunch = document.getElementById("dateOfLaunch").value;

    if(!prodname || !price || !dateOfLaunch || !freeDelivery || parseInt(price)<1){
    alert("Please Fill all the details");
    return false;
    }
    // debugger;
    const foodItems = JSON.parse(localStorage.getItem("foodarr"));
    // debugger;
    var item = foodItems.find(indexEditItem);
    foodItems[item.id-1].name = prodname;
    foodItems[item.id-1].price = price;
    foodItems[item.id-1].active = active;
    foodItems[item.id-1].category = category;
    foodItems[item.id-1].freeDelivery = freeDelivery;
    foodItems[item.id-1].dateOfLaunch = dateOfLaunch;
    // debugger;
    localStorage.setItem("foodarr",JSON.stringify(foodItems));
    // debugger;
    localStorage.removeItem("editValue");
    return true;
}

//returns object(Menu Item) to be edited
function indexEditItem(item){
    return item.name  == localStorage.getItem("editValue");
}

//loading fields with previous values
function loadFields()
{

    const foodItems = JSON.parse(localStorage.getItem("foodarr"));
    debugger;
    var item = foodItems.find(indexEditItem);
    document.getElementById("prodname").value = item.name;
    document.getElementById("price").value = item.price;
    debugger;
    if(item.active == "Yes")
    document.getElementById("active1").checked = true;
    else
    document.getElementById("active2").checked = true;
    if(item.freeDelivery == "Yes")
    document.getElementById("freeDelivery").checked = true;
    else
    document.getElementById("freeDelivery").checked = false;
    document.getElementById("category").value = item.category;
    document.getElementById("dateOfLaunch").value = item.dateOfLaunch
}
//Admin Page Functions End

//Customer Page Functions start
function showCustomerItems()
{
    debugger;
    document.getElementById("itemVisibility").style.visibility = "hidden";
    var foodItems = JSON.parse(localStorage.getItem("foodarr"));
    var tableBody = document.getElementById("admin-table");
    for(var i = 0;i < foodItems.length;i++)
    {
        if(foodItems[i].active === "No")
        continue;
        var tr = document.createElement("tr");
        
        var name = document.createElement("td");
        var colspan = document.createAttribute("colspan");
        colspan.value = "6";
        name.setAttributeNode(colspan);
        name.textContent = foodItems[i].name;
        tr.appendChild(name);
        name.style.textAlign = "left";

        var freeDelivery = document.createElement("td");
        freeDelivery.textContent = foodItems[i].freeDelivery;
        tr.appendChild(freeDelivery);
        freeDelivery.style.textAlign = "center";

        var price = document.createElement("td");
        price.textContent = "Rs. "+foodItems[i].price;
        var colspan2 = document.createAttribute("colspan");
        colspan2.value = "2";
        price.setAttributeNode(colspan2);
        tr.appendChild(price);
        price.style.textAlign = "left";
        
        var category = document.createElement("td");
        category.textContent = foodItems[i].category;
        tr.appendChild(category);
        category.style.textAlign = "center";
        
        var action = document.createElement("td");
        var anch = document.createElement("a");
        anch.textContent = "Add to cart";
        var href = document.createAttribute("href");
        var elem = document.createAttribute("name");
        elem.value = foodItems[i].name;
        debugger;
        anch.onclick = cartAdd;
        debugger;
        anch.setAttributeNode(href);
        anch.setAttributeNode(elem);
        action.appendChild(anch);
        tr.appendChild(action);
        debugger;
        if(localStorage.getItem("addCart"))
        document.getElementById("itemVisibility").style.visibility = "visible";
        tableBody.appendChild(tr);
      }
}

var cartAdd = function(event){
    var x = event.path[0].attributes[1].value;
    localStorage.setItem("cartValue",x);    
    addToCart();
}

function addToCart()
{
    localStorage.setItem("addCart","true");
    debugger;
    const foodItems = JSON.parse(localStorage.getItem("foodarr"));
    var item = foodItems.find(indexAddItem);
    if(!localStorage.getItem("totalPrice"))
    localStorage.setItem("totalPrice",parseInt(item.price));
    else{
    var totalPrice = parseInt(localStorage.getItem("totalPrice"));
    totalPrice = totalPrice + parseInt(item.price);
    localStorage.setItem("totalPrice",totalPrice);    
}
    if(!localStorage.getItem("cartItems"))
    {
        var newCart = [];
        newCart.push(item);
        localStorage.setItem("cartItems",JSON.stringify(newCart));
    }
    else{
    var existingCart = JSON.parse(localStorage.getItem("cartItems"));
    existingCart.push(item);
    localStorage.setItem("cartItems",JSON.stringify(existingCart));
}
}
function indexAddItem(item){
    return item.name == localStorage.getItem("cartValue");
}
//Customer Page Functions end

//Cart Functions Start
function showCartItems()
{
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    // console.log(cartItems);
    if(cartItems.length>0)
    {
        var th = document.createElement("tr");
        var headprice = document.createElement("th");
        var headfreeDelivery = document.createElement("th");
        var headname = document.createElement("th");
        headname.textContent = "Name";
        headfreeDelivery.textContent = "Free Delivery";
        headprice.textContent = "Price";
        th.appendChild(headname);
        th.appendChild(headfreeDelivery);
        th.appendChild(headprice);
        document.getElementById("thead").appendChild(th); 
    
    for(var i = 0;i < cartItems.length;i++)
    {
        var tr = document.createElement("tr");
        var name = document.createElement("td");
        name.textContent = cartItems[i].name;
        tr.appendChild(name);
        name.style.textAlign = "left";

        var freeDelivery = document.createElement("td");
        freeDelivery.textContent = cartItems[i].freeDelivery;
        tr.appendChild(freeDelivery);
        freeDelivery.style.textAlign = "center";

        var price = document.createElement("td");
        price.textContent = "Rs. "+cartItems[i].price;
        tr.appendChild(price);
        price.style.textAlign = "left";
        
        var action = document.createElement("td");
        var anch = document.createElement("a");
        anch.textContent = "Delete";
        var href = document.createAttribute("href");
        var elem = document.createAttribute("name");
        elem.value = cartItems[i].name;
        href.value = "cart-notification.html";
        anch.onclick = cartRemove;        
        anch.setAttributeNode(href);
        anch.setAttributeNode(elem);
        action.appendChild(anch);
        tr.appendChild(action);
        document.getElementById("cart-table").appendChild(tr);
    }
    var trr = document.createElement("tr");
    var tdd = document.createElement("td");
    tdd.textContent = "Total";
    tdd.style.fontWeight = "bold";
    var tdd2 = document.createElement("td");
    tdd2.textContent = "Rs. " + localStorage.getItem("totalPrice");
    tdd2.style.fontWeight = "bold";
    var tdd3 = document.createElement("td");
    trr.appendChild(tdd3);
    trr.appendChild(tdd);
    trr.appendChild(tdd2);
    document.getElementById("cart-table").appendChild(trr);
    }
    else
    {
        location.href = "cart-empty.html";
    }
}


var cartRemove = function(event){
    var x = event.path[0].attributes[1].value;
    localStorage.setItem("cartValue",x);    
    removeFromCart();
}

function removeFromCart()
{
    const foodItems = JSON.parse(localStorage.getItem("cartItems"));
    if(foodItems.length==1)
    localStorage.removeItem("cartItems");
    var item = foodItems.find(indexRemoveItem);
    var totalPricee = parseInt(localStorage.getItem("totalPrice"));
    totalPricee = totalPricee - (parseInt(item.price));
    localStorage.setItem("totalPrice",totalPricee);
    // var newFoodItems = foodItems.filter((itemm) = > itemm.id! = item.id);
    var newFoodItems = foodItems.splice(foodItems.findIndex(v => v.id === item.id),1);
    localStorage.setItem("cartItems",JSON.stringify(foodItems));    
}
function indexRemoveItem(item){
    return item.name == localStorage.getItem("cartValue");
}

