function handleFormSubmit(event) {
    event.preventDefault();
    const websiteName = event.target.websiteName.value;
    const websiteUrl = event.target.websiteurl.value;

    const obj = { websiteName, websiteUrl };
    axios.post("https://crudcrud.com/api/ba190e606e564a34a3adc5b1b438c638/appointmentData", obj)
    .then((response) => {
        showWebsiteOnScreen(response.data);
        console.log(response);
    })
    .catch((err) => {
        document.body.innerHTML += "<h4>Something went wrong</h4>";
        console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/ba190e606e564a34a3adc5b1b438c638/appointmentData")
    .then((response) => {
        console.log(response);
         response.data.forEach((obj) => showWebsiteOnScreen(obj));
       
    })
    .catch((err) => {
        console.log(err);
    });
});

function showWebsiteOnScreen(obj) {
    const parentNode = document.getElementById('listofitems');
    const childNode = `<li id=${obj._id}>
                        
                        <span onclick="showWebsiteName('${obj.websiteName}')">${obj.websiteName}</span> - 
                        <a href="${obj.websiteUrl}" target="_blank" onclick="openWebsite(event, '${obj.websiteUrl}')">${obj.websiteUrl}</a>
                        <button class="edit-button" onclick="editWebsiteDetails('${obj._id}','${obj.websiteName}','${obj.websiteUrl}')">
                            Edit
                        </button>
                        <button class="delete-button" onclick="deleteWebsite('${obj._id}')">
                            Delete
                        </button>
                    </li>`;
    parentNode.innerHTML += childNode;
}


function openWebsite(event, url) {
    event.preventDefault(); // Prevent default behavior of clicking the link
    window.open(url, '_blank'); // Open the website URL in a new tab
}

function showWebsiteName(websiteName) {
    console.log(websiteName); // You can perform any action you want here when the website name is clicked
}

function editWebsiteDetails(id, websiteName, websiteUrl) {
    document.getElementById('websiteName').value = websiteName;
    document.getElementById('websiteurl').value = websiteUrl;
    deleteWebsite(id);
}

function deleteWebsite(id) {
    axios.delete(`https://crudcrud.com/api/ba190e606e564a34a3adc5b1b438c638/appointmentData/${id}`)
    .then((res) => {
        removeWebsiteFromScreen(id);
    })
    .catch((err) => {
        console.log(err);
    });
}

function removeWebsiteFromScreen(id) {
    const parentNode = document.getElementById('listofitems');
    const childNodeToBeRemoved = document.getElementById(id);
    if (childNodeToBeRemoved) {
        parentNode.removeChild(childNodeToBeRemoved);
    }
}
