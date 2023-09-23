import { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

function GroceryList(props) {
    const [isSubmitGroceryListForm, setIsSubmitGroceryListForm] = useState(false);
    const [modalGroceryListIsOpen, setModalGroceryListIsOpen] = useState(false);
    const [isSubmitGroceryItemForm, setIsSubmitGroceryItemForm] = useState(false);
    const [modalGroceryItemIsOpen, setModalGroceryItemIsOpen] = useState(false);
    const [currTab, setCurrTab] = useState("all");
    const [currGroceryList, setCurrGroceryList] = useState(null);
    const [isCheck, setIsCheck] = useState(() => {
        // get stored value
        const savedIndex = localStorage.getItem("savedCheck-2");
        if (savedIndex !== null) {
            return savedIndex.toString().replace(/,+/g,',');
        }
        return [];
    });
    const [newGroceryList, setNewGroceryList] = useState(
        {
            name: "",
            items: []
        }
    );
    const [newGroceryItem, setNewGroceryItem] = useState(
        {
            name: "",
            category: "",
            priority: 1,
            quantity: 1,
            isComplete: false
        }
    );

    function openGroceryListModal(){
        setModalGroceryListIsOpen(true);
    }

    function closeGroceryListModal(){
        setModalGroceryListIsOpen(false);
    }

    function openGroceryItemModal(){
        setModalGroceryItemIsOpen(true);
    }

    function closeGroceryItemModal(){
        setModalGroceryItemIsOpen(false);
    }

    function submitGroceryListForm(){
        setIsSubmitGroceryListForm(true);
        props.handleGroceryListSubmitForm(newGroceryList);
        closeGroceryListModal();
    }

    function handleGroceryListFormChange(event) {
        const { name, value } = event.target;
        if (name === 'name') {
            setNewGroceryList({
                name: value,
                items: newGroceryList['items']
            });
        } else if (name === 'items') {
            setNewGroceryList({
                name: newGroceryList['name'],
                items: value
            });
        }
    }

    const submitGroceryItemForm = (event) => {
        // get the grocery list where the grocery item will be added to
        var grocery_list_id = event.currentTarget.id;

        setIsSubmitGroceryItemForm(true);
        props.handleGroceryItemSubmitForm(grocery_list_id, newGroceryItem);
        closeGroceryItemModal();
    }

    function handleGroceryItemFormChange(event) {
        const { name, value } = event.target;
        if (name === 'name') {
            setNewGroceryItem({
                name: value,
                category: newGroceryItem['category'],
                priority: newGroceryItem['priority'],
                quantity: newGroceryItem['quantity'],
                isComplete: false
            });
        } else if (name === 'category') {
            setNewGroceryItem({
                name: newGroceryItem['name'],
                category: value,
                priority: newGroceryItem['priority'],
                quantity: newGroceryItem['quantity'],
                isComplete: false
            });
        } else if (name === 'priority') {
            setNewGroceryItem({
                name: newGroceryItem['name'],
                category: newGroceryItem['category'],
                priority: value,
                quantity: newGroceryItem['quantity'],
                isComplete: false
            });
        } else if (name === 'quantity') {
            setNewGroceryItem({
                name: newGroceryItem['name'],
                category: newGroceryItem['category'],
                priority: newGroceryItem['priority'],
                quantity: value,
                isComplete: false
            });
        }
    }

    // helper: strips the 'tab-' from the string
    function cleanTab(tab) {
        if (tab.includes('tab-') && tab.indexOf('tab-') === 0) {
            return tab.substr(4, tab.length);
        }
        return tab;
    }

    window.onbeforeunload = (e) => {
        localStorage.setItem("savedCheck-2", isCheck);
    };

    const handleTab = (event) => {
        console.log('current tab:')
        console.log(event.currentTarget.id);
        var current_tab = event.currentTarget.id;
        if (current_tab === "all") {
            setCurrGroceryList(null);
        } else {
            // truncate the 'tab-' off the current_tab string
            var current_tab_temp = cleanTab(current_tab)
            // get the current grocery list from props
            for (var i=0; i<props.groceryLists.length; i++) {
                if (props.groceryLists[i].name === current_tab_temp) {
                    setCurrGroceryList(props.groceryLists[i]);
                    break;
                }
            }
        }
        setCurrTab(current_tab);

        var allTabs = document.getElementsByClassName('tab-content-grocery-list');
        for (var j=0; j<allTabs.length; j++) {
            if (allTabs[j].id !== currTab) {
                allTabs[j].style.display = "none";
            }
        }

        // only the currently clicked on tab is displayed
        document.getElementById(current_tab).style.display = "block";
    }
    
    function getGroceryItemsFromIdArray(grocery_item_ids) {
        var grocery_items_arr = [];
        for (var k=0; k<grocery_item_ids.length; k++) {
            for (var l=0; l<props.groceryItems.length; l++) {
                if (props.groceryItems[l]._id === grocery_item_ids[k]) {
                    grocery_items_arr.push(props.groceryItems[l]);
                    break;
                }
            }
        }
        return grocery_items_arr;
    }

    function getGroceryItemFromId(grocery_item_id) {
        for (var m=0; m<props.groceryItems.length; m++) {
            if (props.groceryItems[m]._id === grocery_item_id) {
                return props.groceryItems[m];
            }
        }
        console.log("getGroceryItemFromId: grocery item not found");
        return null;
    }

    const handleCheckOne = (event) => {
        const id = event.currentTarget.value;
        const checked = event.currentTarget.checked;
        const checkedGroceryItem = getGroceryItemFromId(id);
        console.log('checked');
        console.log(checked);
        if (checked) {
            // add to checked items list
            setIsCheck([...isCheck, id]);
            console.log('item is checked, isComplete:');
            console.log(checkedGroceryItem.isComplete);
            if (checkedGroceryItem.isComplete === false) {
                console.log('isComplete is false, called props');
                props.updateGroceryItemIsComplete(id);
            }
        } else {
            // remove from checked items list
            console.log('temp');
            var temp = (JSON.parse("[" + JSON.stringify(isCheck).replace(/,+/g,',') + "]")).filter(item => item !== id);
            setIsCheck(temp);
            if (checkedGroceryItem.isComplete === true) {
                console.log('isComplete is true, called props');
                props.updateGroceryItemIsComplete(id);
            }
        }
        console.log('grocery items');
        console.log(props.groceryItems);
        console.log('isCheck');
        console.log(isCheck);
    }

    return (
        <div className='grocery-list'>
            <h1>Grocery List</h1>

            <table className='block'>
                <tr>
                    <td className='left-block-grocery-list'>
                        <div>
                            <button onClick={openGroceryListModal}>+</button>
                            <Modal
                                isOpen={modalGroceryListIsOpen}
                                onRequestClose={closeGroceryListModal}>
                                <button onClick={closeGroceryListModal}>X</button>
                                <form>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={newGroceryList.name}
                                        onChange={handleGroceryListFormChange} />
                                    <input type="button" value="Submit" onClick={submitGroceryListForm} />
                                </form>
                            </Modal>
                        </div>
                        <div className='tabs-grocery-list'>
                            <ul className='tab-list'>
                                <li className={currTab === "all" ? "active" : ""}
                                    id='all'
                                    onClick={handleTab}>
                                        All
                                </li>
                                {props.groceryLists.map((row, index) => {
                                    return (
                                        <li className={currTab === ('tab-' + row.name) ? "active" : ""}
                                            id={'tab-' + row.name}
                                            onClick={handleTab}>
                                                {row.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </td>
                    <td className='right-block-grocery-list'>
                        <div>
                            {/* default list shows all grocery items 
                            <ul>
                                {localStorage.getItem("savedIngr") ?
                                    localStorage.getItem("savedIngr").toString().replace(/\[|\]/g,'').split(',')?.map((element, index) => {
                                        return(
                                            <li key={index}>
                                                {element}
                                            </li>
                                        );
                                    }) :
                                    <h4>No items so far</h4>
                                }
                            </ul>
                            */}
                            {/* here is where the grocery items for the active grocery list goes */}
                            {console.log('grocery lists:')}
                            {console.log(props.groceryLists)}
                            {console.log('grocery items:')}
                            {console.log(props.groceryItems)}
                            <>
                                {currTab === "all" ?
                                    ((props.groceryItems && props.groceryItems.length > 0) ?
                                        <ul className='tab-content-grocery-list'
                                            id={currTab}>
                                            {props.groceryItems.map((element, index) => {
                                                return (
                                                    <li key={index}>
                                                        {element.name}
                                                    </li>
                                                )
                                            })}
                                        </ul> :
                                        <p>No items in list</p>
                                    ) :
                                    <div>
                                        <div>
                                            <button onClick={openGroceryItemModal}>+</button>
                                            <Modal
                                                isOpen={modalGroceryItemIsOpen}
                                                onRequestClose={closeGroceryItemModal}>
                                                <button onClick={closeGroceryItemModal}>X</button>
                                                <form>
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={newGroceryItem.name}
                                                        onChange={handleGroceryItemFormChange} />
                                                    <label htmlFor="category">Category</label>
                                                    <input
                                                        type="text"
                                                        name="category"
                                                        id="category"
                                                        value={newGroceryItem.category}
                                                        onChange={handleGroceryItemFormChange} />
                                                    <label htmlFor="priority">Priority</label>
                                                    <input
                                                        type="text"
                                                        name="priority"
                                                        id="priority"
                                                        value={newGroceryItem.priority}
                                                        onChange={handleGroceryItemFormChange} />
                                                    <label htmlFor="quantity">Quantity</label>
                                                    <input
                                                        type="text"
                                                        name="quantity"
                                                        id="quantity"
                                                        value={newGroceryItem.quantity}
                                                        onChange={handleGroceryItemFormChange} />
                                                    <input id={currGroceryList ? currGroceryList._id : null} type="button" value="Submit" onClick={submitGroceryItemForm} />
                                                </form>
                                            </Modal>
                                        </div>
                                        {(currGroceryList.items && currGroceryList.items.length > 0) ?
                                            <ul className='tab-content-grocery-list'
                                                id={currTab}>
                                                {getGroceryItemsFromIdArray(currGroceryList.items).map((element, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <input type='checkbox'
                                                                       name="inputCheck"
                                                                       id={index}
                                                                       value={element._id}
                                                                       checked={isCheck.includes(element._id)}
                                                                       onChange={handleCheckOne}
                                                                />
                                                                {element.name}
                                                            </li>
                                                        )
                                                    })}
                                            </ul> :
                                            <p>No items in list</p>
                                        }
                                    </div>
                                }
                            </>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default GroceryList;