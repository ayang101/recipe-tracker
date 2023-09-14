import './App.css';

function GroceryList(props) {
    return (
        <div className='grocery-list'>
            <h1>Grocery List</h1>
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
        </div>
    );
};

export default GroceryList;