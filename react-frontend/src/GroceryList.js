import './App.css';

const GroceryList = () => {
    return (
        <div className='grocery-list'>
            <h1>Grocery List</h1>
            <ul>
                {localStorage.getItem("savedIngr").toString().replace(/\[|\]/g,'').split(',')?.map((element, index) => {
                    return(
                        <li key={index}>
                            {element}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GroceryList;