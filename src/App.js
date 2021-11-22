import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  const addToList = () => {
    const foodList = async () => {
      await axios.post('http://localhost:3001/insert', {
        foodName: foodName,
        days: days
      })
  
      const res = await axios.get('http://localhost:3001/read')
      setFoodList(res.data)
     }
  
     foodList()
  }                                                                                                                                                                                                                                         

  const updateFood = id => {
    const updateFoodList = async () => {
      await axios.put('http://localhost:3001/update', {
        id: id,
        newFoodName: newFoodName
      })  

      const res = await axios.get('http://localhost:3001/read')
      setFoodList(res.data)
     }
  
     updateFoodList()
  }

  const deleteFood = id => {
    const updateFoodList = async () => {
      await axios.delete(`http://localhost:3001/delete/${id}`)

      const res = await axios.get('http://localhost:3001/read')
      setFoodList(res.data)
     }
  
     updateFoodList()
  }

  useEffect(() => {
   const foodList = async () => {
    const res = await axios.get('http://localhost:3001/read')
    setFoodList(res.data)
   }

   foodList()
  }, [])

  return (
    <div className="App">
        <h1> CRUD REACT APP </h1>

        <label> Food Name </label>
        <input type="text" onChange={ e => setFoodName(e.target.value) } />
        <br/>
        <label> Days since you ate </label>
        <input type="number" onChange={ e => setDays(e.target.value) }/>
        <br/>
        <button onClick={addToList}> Add To List </button>

        <h1> FOOD LIST </h1>


          {
            foodList.map(f => {
              return(
                <div key={f._id}>
                  <p> { f.foodName } </p>
                  <input type="text" onChange={ e => setNewFoodName(e.target.value) }/>
                  <button onClick={() => updateFood(f._id)}> Update </button>
                  <button onClick={() => deleteFood(f._id)}> Delete </button>
                </div>
              )
            })
          }

    </div>
  );
}

export default App;
