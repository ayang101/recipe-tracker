import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import './App.css';

function RecipeDetail(props) {
    const [isCheck, setIsCheck] = useState(() => {
        // get stored value
        const savedIndex = localStorage.getItem("savedCheck");
        if (savedIndex !== null) {
            return savedIndex.toString().replace(/,+/g,',');
        }
        return [];
    });
    const [currTab, setCurrTab] = useState("tab1");
    const savedRecipe = useRef(0);
    const recipeId = useParams().id;

    // handle ingredient checkbox
    const handleCheckAll = () => {
        if (isCheck.length === (savedRecipe.current.ingredients).length) {
            setIsCheck([]);
            document.getElementById("selectAll").innerText = "Select all";
        } else {
            setIsCheck(Array.from({length: (savedRecipe.current.ingredients).length}, (_, n) => n));
            document.getElementById("selectAll").innerText = "Deselect all";
        }
    };
    const handleCheckOne = (event) => {
        const id =  parseInt(event.target.id);
        const checked = event.target.checked;
        var array = JSON.parse("[" + isCheck.toString().replace(/,+/g,',') + "]");
        console.log('isCheck');
        console.log(array);
        if (checked) {
            // add to checked items list
            setIsCheck([...array, id]);
        } else {
            // remove from checked items list
            var temp = array.filter(item => item != id).toString();
            setIsCheck(temp.replace(/^\[(.+)\]$/,'$1').replace(/,\s*$/, ""));
            document.getElementById("selectAll").innerText = "Select all";
        }
    };
    
    window.onbeforeunload = (e) => {
        localStorage.setItem("savedCheck", isCheck);
        var ingr_array = JSON.parse("[" + isCheck.toString().replace(/,+/g,',') + "]");
        for (var i=0; i<ingr_array.length; i++) {
            ingr_array[i] = savedRecipe.current.ingredients[ingr_array[i]];
        }
        localStorage.setItem("savedIngr", ingr_array);
    };

    // handle tab switching
    // by default, show ingredients tab    
    const handleTab0 = () => {
        setCurrTab("tab0");
    };
    const handleTab1 = () => {
        setCurrTab("tab1");
        document.getElementById("tab1").style.display = "block";
        document.getElementById("tab2").style.display = "none";
    };
    const handleTab2 = () => {
        setCurrTab("tab2");
        document.getElementById("tab1").style.display = "none";
        document.getElementById("tab2").style.display = "block";
    };
    const currRecipe = props.recipeData.find(rec => {return rec._id === recipeId});
    if (currRecipe !== undefined) {
        savedRecipe.current = currRecipe;
    }

    return (
        <div className='recipe-detail'>
            <div className='recipe-source'>
                <a href= {savedRecipe.current.source} target="_blank" rel="noopener noreferrer">
                    Visit Source
                </a>
            </div>
            <div className='recipe-name'>
                <h1>{savedRecipe.current.name}</h1>
            </div>
            <ul className='recipe-type'>
                <li>{savedRecipe.current.course || '--'}</li>
                <li>{savedRecipe.current.cuisine || '--'}</li>
                <li>{savedRecipe.current.rating || '--'}/10</li>
            </ul>
            <table className='recipe-times'>
                <tr>
                    <td>Servings:</td>
                    <td>Prep Time:</td>
                    <td>Cook Time:</td>
                    <td>Additional Time:</td>
                    <td>Total Time:</td>
                </tr>
                <tr>
                    <td>{savedRecipe.current.servingSize || '--'}</td>
                    <td>{savedRecipe.current.prepTime || '--'}</td>
                    <td>{savedRecipe.current.cookTime || '--'}</td>
                    <td>{savedRecipe.current.additionalTime || '--'}</td>
                    <td>{savedRecipe.current.totalTime || '--'}</td>
                </tr>
            </table>
            <table className='block'>
                <tr>
                    <td className='left-block'>
                        <div className='recipe-image'
                            style={{ backgroundImage: `url("${savedRecipe.current.image}")`,
                                    backgroundPosition: 'left',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    width: 550,
                                    height: 400}}>
                            <div className='btn-container'>
                                <button>Start Cooking</button>
                            </div>
                        </div>
                        <div className='recipe-desc'>
                            <p>{savedRecipe.current.description}</p>
                        </div>
                    </td>

                {/*
                <ul className='recipe-ingr-header'>
                    <li>Ingredients:</li>
                    <div className='scale-convert'>
                        <li>Scale or Convert</li>
                    </div>
                </ul>
                */}
                    <td className='right-block'>
                        <div className='tabs'>
                        <ul className='tab-content'>
                            <li className={currTab === "tab0" ? "active" : ""}
                                onClick={handleTab0}>Equipment</li>
                            <li className={currTab === "tab1" ? "active" : ""}
                                onClick={handleTab1}>Ingredients</li>
                            <li className={currTab === "tab2" ? "active" : ""}
                                onClick={handleTab2}>Instructions</li>
                        </ul>

                        <table id='tab1'>
                            <button id='selectAll' type='button' onClick={handleCheckAll}>Select all</button>
                            {savedRecipe.current.ingredients?.map((element, index) => {
                                return(
                                    <tr key={index}>
                                        <input type='checkbox'
                                               name="inputCheck"
                                               id={index}
                                               value={element}
                                               checked={isCheck.includes(index)}
                                               onChange={handleCheckOne}
                                        />
                                        <td>{element}</td>
                                    </tr>
                                );
                            })}
                        </table>
                        <table id='tab2'>
                            <ol>
                                {savedRecipe.current.instructions?.map((element, index) => {
                                    return(
                                        <tr>
                                            <td>
                                                <li key={index}>
                                                    {element}
                                                </li>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </ol>
                        </table>
                        <h4>Result: {isCheck.toString()}</h4>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default RecipeDetail;