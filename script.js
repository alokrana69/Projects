let form = document.getElementById("form");

form.addEventListener("submit", getitems);

function getitems(e) {
  e.preventDefault();

  let amount = e.target.amountinput.value;
  let description = e.target.descriptioninput.value;
  let selected = e.target.selected.value;

  if (!amount || !description || selected === "#") {
    alert("Please enter valid expense details.");
    return;
  }

  var obj = {
    amount,
    description,
    selected,
  };
  var objtostr = JSON.stringify(obj);
  localStorage.setItem(description, objtostr);

  displayOnScreen(obj);
}

for (var i = 0; i < localStorage.length; i++) {
  var keys = localStorage.key(i);
  var data = localStorage.getItem(keys);
  var strtoobj = JSON.parse(data);
  displayOnScreen(strtoobj);
}

function displayOnScreen(obj) {
  if (!obj || !obj.amount || !obj.description || !obj.selected) {
    return;
  }

  var li = document.createElement("li");
  li.id = obj.description;
  li.innerHTML = `${obj.amount} ${obj.description} ${obj.selected} <button onclick="deleting('${obj.description}')">del</button> <button onclick="editing('${obj.description}')">edit</button>`;
  
  var target = document.getElementById("ul");
  target.appendChild(li);
}

function deleting(e) {
  localStorage.removeItem(e);
  removeFromScreen(e);
}

function removeFromScreen(e) {
  var parent = document.getElementById("ul");
  var child = document.getElementById(e);
  if (child) {
    parent.removeChild(child);
  }
}

function editing(e) {
  let storedData = JSON.parse(localStorage.getItem(e)) || {};
  let amountval = storedData.amount;
  let descval = storedData.description;
  let selecteditem = storedData.selected;

  if (!amountval || !descval || !selecteditem) {
    return;
  }

  document.getElementById("amountinput").value = amountval;
  document.getElementById("descriptioninput").value = descval;
  document.getElementById("selected").value = selecteditem;
}
