import styled from "styled-components";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState(null);

    useEffect(() => {
        fetch("/get-saved-recipes")
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            setSavedRecipes(data.data)
        })
    }, [])

    return(
        savedRecipes &&
        <MainDiv>
            <h2>Saved Recipes</h2>
            <div className="results">
                {savedRecipes.map((recipe) => {
                    return(
                        <RecipeCard name={recipe.name} image={recipe.image} id={recipe.id} />
                    )
                })}
            </div>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 85vh;
    background-color: var(--color-purple);

    .results{
    display: flex;
    /* border: solid 2px red; */
    width: 900px;
    flex-wrap: wrap;
    justify-content: center;
}
`
export default SavedRecipes;