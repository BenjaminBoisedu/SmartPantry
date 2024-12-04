import React, { useState, useEffect } from "react";
import "./CSS/MyPantry.css";
import axios from "axios";

export default function MyPantry() {
  const [ingredient, setIngredient] = useState("");
  const [MyPantry, setMyPantry] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserIngredients = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/products-by-email",
        { email: localStorage.getItem("email") }
      );
      setMyPantry(response.data);
    } catch (error) {
      console.error(
        "Error fetching user ingredients:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    setMyPantry([]);
    fetchUserIngredients();
    console.log(MyPantry);
  }, []);

  const addIngredient = async (item) => {
    try {
      const email = localStorage.getItem("email");

      if (!email) {
        console.error("Email not found in localStorage.");
        return;
      }
      const ingredientData = {
        Name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        email: email,
        id_produit_api: String(item.id),
        imageProduit: String(item.image)
      };

      console.log(ingredientData);
  
      const response = await axios.post(
        "http://localhost:8000/api/produits",
        ingredientData
      );

      if (response.status === 200) {
        setMyPantry((prevPantry) => [...prevPantry, response.data]);
        console.log("Ingredient added to pantry:", response.data);
        removePendingItem(item);
        fetchUserIngredients();
      } else {
        console.error("Error adding ingredient to pantry.");
      }
    } catch (error) {
      console.error(
        "Error adding ingredient:",
        error.response?.data || error.message
      );
    }
  };

  const toggleModifyMode = (index, isEditing = true) => {
    setMyPantry((prevPantry) =>
      prevPantry.map((item, i) =>
        i === index ? { ...item, isEditing } : item
      )
    );
  };

  const handleQuantityChange = (index, newQuantity) => {
    setMyPantry((prevPantry) =>
      prevPantry.map((item, i) =>
        i === index ? { ...item, newQuantity } : item
      )
    );
  };

  const updateQuantity = async (item, index) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/produits/${item.id}`,
        { quantity: item.newQuantity }
      );
  
      if (response.status === 200) {
        setMyPantry((prevPantry) =>
          prevPantry.map((i, idx) =>
            idx === index
              ? { ...i, Quantity: item.newQuantity, isEditing: false, newQuantity: undefined }
              : i
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    }
  };

  const removeIngredient = async (item) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/produits/${item.id}`
      );
      if (response.status === 204) {
        setMyPantry(MyPantry.filter((i) => i.id !== item.id));
      } else {
        console.error("Error removing ingredient from pantry.");
      }
    } catch (error) {
      console.error(
        "Error removing ingredient:",
        error.response?.data || error.message
      );
    }
  };

  const addPendingItem = async (item) => {
    if (!pendingItems.some((pendingItem) => pendingItem.name === item.name)) {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/food/ingredients/${item.id}/information?amount=1&apiKey=c364ddb963a5427cbcdaa07617dfee49`
        );
        const data = response.data;
        console.log("Item id : "+item.id)
        setPendingItems([
          ...pendingItems,
          {
            id: item.id,
            name: data.name,
            image: data.image,
            possibleUnits: data.possibleUnits,
            quantity: 1,
            unit: data.possibleUnits[0], 
            id_produit_api: item.id,
            imageProduit: item.image
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
        `https://api.spoonacular.com/food/ingredients/search?query=${searchQuery}&apiKey=c364ddb963a5427cbcdaa07617dfee49`
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
        <h1 className="titreMyPantry">My Pantry</h1>
        {MyPantry.length === 0 ? (
          <p>There's nothing there. Add items to your pantry!</p>
        ) : (
          <div id="conteneurItem">
            {MyPantry.map((item, index) => ( // Placez correctement la fonction map ici
              <div className="item" key={index}>
                <img
                  src={`https://spoonacular.com/cdn/ingredients_250x250/${item.imageProduit}`}
                  alt={item.imageProduit}
                  onError={(e) => (e.target.src = "Img/Pantry/produit_introuvable.png")} // Image par défaut en cas d'erreur
                />
                <p>
                  {item.Quantity} {item.Unit} of {item.Name}
                </p>
                {!item.isEditing && (
                  <button className="buttonModify" onClick={() => toggleModifyMode(index)}>
                    Modify
                  </button>
                )}
                {item.isEditing && (
                  <div className="editQuantity">
                    <input
                      className="newqProduct"
                      type="number"
                      min="1"
                      value={item.newQuantity || item.Quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                    <div className="savecancel">
                    <button className="buttonSave" onClick={() => updateQuantity(item, index)}>Save</button>
                    <button className="buttonCancel" onClick={() => toggleModifyMode(index, false)}>Cancel</button>
                    </div>
                  </div>
                )}
                <button className="buttonRemove" onClick={() => removeIngredient(item)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
        <div>
          <h1 className="titreMyPantry">Add an item in my pantry</h1>
          <div className="searchInput">
            <input id="searchBar"
            type="text"
            placeholder="Search ingredients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchIngredients();
              }
            }}
          />
          <button id="buttonIngredients" onClick={searchIngredients}>Search</button>
          </div>
          <div className="searchResult">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index} className="item">
                  <p>{result.name}</p>
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_250x250/${result.image}`}
                    alt={result.name}
                    onError={(e) => {
                      e.target.src = "Img/Pantry/produit_introuvable.png"; // Chemin vers l'image par défaut
                    }}
                  />

                  <button className="buttonIngredients" onClick={() => addPendingItem(result)}>
                    Add to Pending
                  </button>
                </div>
              ))
            ) : (
              <p className="noResults">No results add.</p>
            )}
          </div>
        </div>

        <h2 className="titreMyPantry">Pending Items</h2>
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
                  <input  className="infomationProduct"
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
                  <select className="infomationProduct"
                    value={item.unit}
                    onChange={(e) =>
                      updatePendingItem(index, "unit", e.target.value)
                    }
                  >
                    {item.possibleUnits
                      // .filter((unit) => {
                      //   const allowedUnits = ["kg", "g", "l", "ml"];
                      //   return allowedUnits.includes(unit);
                      // })
                      .map((unit, i) => (
                        <option key={i} value={unit}>
                          {unit}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
              <button onClick={() => addIngredient(item)}>Add to Pantry</button>
              <button onClick={() => removePendingItem(item)}>Remove</button>
            </div>
          ))
        ) : (
          <p className="noResults">No pending items.</p>
        )}
      </div>
  );
}
