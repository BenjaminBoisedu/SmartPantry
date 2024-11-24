import React, { useState } from "react";
import "./CSS/MyPantry.css";
import axios from "axios";

export default function MyPantry() {
  const [ingredient, setIngredient] = useState("");
  const [MyPantry, setMyPantry] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addIngredient = (item) => {
    setMyPantry([...MyPantry, item]);
    removePendingItem(item);
  };

  const removeIngredient = (item) => {
    setMyPantry(MyPantry.filter((i) => i.name !== item.name));
  };

  const addPendingItem = async (item) => {
    if (!pendingItems.some((pendingItem) => pendingItem.name === item.name)) {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/food/ingredients/${item.id}/information?amount=1&apiKey=9fd3c6721b55485f97038bcfe016593c`
        );
        const data = response.data;

        setPendingItems([
          ...pendingItems,
          {
            name: data.name,
            image: data.image,
            possibleUnits: data.possibleUnits,
            quantity: 1,
            unit: data.possibleUnits[0], 
          },
        ]);
      } catch (error) {
        console.error("Error fetching ingredient details:", error);
      }
    }
  };

  const updatePendingItem = (index, key, value) => {
    const updatedItems = [...pendingItems];
    updatedItems[index][key] = value;
    setPendingItems(updatedItems);
  };

  const removePendingItem = (itemToRemove) => {
    setPendingItems(
      pendingItems.filter((item) => item.name !== itemToRemove.name)
    );
  };

  const searchIngredients = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${searchQuery}&apiKey=9fd3c6721b55485f97038bcfe016593c`
      );
      const data = response.data.results || [];
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching ingredients:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="containerMypantry">
      <div className="mypantry">
        <h1>My Pantry</h1>
        {MyPantry.length === 0 ? (
          <p>There's nothing there. Add items to your pantry!</p>
        ) : (
          MyPantry.map((item, index) => (
            <div className="item" key={index}>
              <p>
                {item.quantity} {item.unit} of {item.name}
              </p>
              <button onClick={() => removeIngredient(item)}>Remove</button>
            </div>
          ))
        )}

        <div>
          <h1>Add an item in my pantry</h1>
          <input
          className="searchInput"
            type="text"
            placeholder="Search ingredients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={searchIngredients}>Search</button>

          <div className="searchResult">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index} className="ingredientCard">
                  <p>{result.name}</p>
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_250x250/${result.image}`}
                    alt={result.name}
                  />
                  <button onClick={() => addPendingItem(result)}>
                    Add to Pending
                  </button>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>

        <h2>Pending Items</h2>
        {pendingItems.length > 0 ? (
          pendingItems.map((item, index) => (
            <div key={index} className="pendingCard">
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
              <div>
                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updatePendingItem(index, "quantity", e.target.value)
                    }
                  />
                </label>
                <label>
                  Unit:
                  <select
                    value={item.unit}
                    onChange={(e) =>
                      updatePendingItem(index, "unit", e.target.value)
                    }
                  >
                    {item.possibleUnits.map((unit, i) => (
                      <option key={i} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button onClick={() => addIngredient(item)}>
                Add to Pantry
              </button>
              <button onClick={() => removePendingItem(item)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No pending items.</p>
        )}
      </div>
    </div>
  );
}
