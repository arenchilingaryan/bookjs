const addAutor = document.getElementById('toAddAutor');
const addYear = document.getElementById('toAddYear');
const addLabel = document.getElementById('toAddLabel');
const addPages = document.getElementById('toAddPages');
const itemList = document.getElementById('itemList');

const toAddBtn = document.getElementById('btnToAdd');


let maxId = 0
const data = []


/* ________________________ ADD ITEM _________________________*/


addItem = (label, autor, yearOfPublish, pages) => {
    if (!(label === "")) {
        data.push(
            {
                label,
                autor,
                yearOfPublish,
                pages,
                id: maxId,
            }
        )
        const renderElement =
            `<div id="del${maxId}" class="ItemListItem">
                <div id=${maxId} class="itemContainer">
                    <span class="infoItems">
                        <span id="autor${maxId}"> ${autor} </span>
                        <br />
                        <span id="label${maxId}" class="bookName"> ${label}</span>
                    </span>
                    <span class="descriptions">
                        <button class="edit" edit=${maxId}>Edit</button>                             
                        <button class="deleteItem" deleteItem=${maxId} class="deleteBook">Delete</button>
                    </span>
                </div>
                <form id="edit${maxId}" class="hide editContainer">
                    <input id="autorEdit${maxId}" class="inputEdit" type="text" placeholder=${autor} />
                    <input id="labelEdit${maxId}" class="inputEdit" type="text" placeholder=${label} />
                    <input id="yearEdit${maxId}" class="inputEdit" type="text" placeholder=${yearOfPublish} />
                    <input id="pagesEdit${maxId}" class="inputEdit" type="text" placeholder=${pages} />
                    <button ok="${maxId}">Done</button>
                    <button cancel="${maxId}">Cancel</button>
                </form>
            </div>`


        itemList.insertAdjacentHTML('afterbegin', renderElement)

        maxId++
    }
}



toAddBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!!addLabel.value.length) {
        addItem(addLabel.value, addAutor.value, addYear.value, addPages.value);
    } else {
        alert("Name Is Wrong")
    }
    addLabel.value = "";
    addAutor.value = "";
    addYear.value = "";
    addPages.value = "";
});

/* ________________________ DELETE ITEM _________________________*/

document.addEventListener("click", function (event) {
    if (event.target.attributes.deleteItem) {
        const idElem = event.target.attributes.deleteItem.value;
        delete data[idElem];
        const deleteWrapper = document.getElementById(`del${idElem}`)
        deleteWrapper.remove()
    }
});

/* ________________________ EDIT ITEM / CLOSE" FROM EDIT PANEL _________________________*/



document.addEventListener("click", function (event) {
    if (event.target.attributes.edit) {
        const idElem = event.target.attributes.edit.value;
        const parentDiv = document.getElementById(idElem)
        parentDiv.classList.add("hide")
        const hide = document.getElementById(`edit${idElem}`)
        hide.classList.remove("hide")
    }
    if (event.target.attributes.cancel) {
        event.preventDefault();
        const idElem = event.target.attributes.cancel.value;
        const parentDiv = document.getElementById(idElem)
        parentDiv.classList.remove("hide")
        const hide = document.getElementById(`edit${idElem}`)
        hide.classList.add("hide")
    }
});


/* ________________________ "OK" FROM EDIT PANEL _________________________*/

document.addEventListener('click', function (event) {
    if (event.target.attributes.ok) {
        event.preventDefault();
        const idElem = event.target.attributes.ok.value;
        const getAutor = document.getElementById(`autorEdit${idElem}`)
        const getLabel = document.getElementById(`labelEdit${idElem}`)
        const getYear = document.getElementById(`yearEdit${idElem}`)
        const getPages = document.getElementById(`pagesEdit${idElem}`)
        const parentDiv = document.getElementById(idElem)
        const hide = document.getElementById(`edit${idElem}`)
        !!data.length ? data[idElem].label = getLabel.value : null
        !!data.length ? data[idElem].autor = getAutor.value : null
        !!data.length ? data[idElem].yearOfPublish = getYear.value : null
        !!data.length ? data[idElem].pages = getPages.value : null
        parentDiv.classList.remove("hide")
        hide.classList.add("hide")
        const toAutorChange = document.getElementById(`autor${idElem}`)
        const toLabelChange = document.getElementById(`label${idElem}`)
        toAutorChange.innerHTML = !!data.length && data[idElem].autor
        toLabelChange.innerHTML = !!data.length && data[idElem].label
    }
});