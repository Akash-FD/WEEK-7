import { use, useReducer, useState } from 'react'
import './App.css'


const reducer = (state, action) => {
  console.log(state); 

  switch (action.type) {
    case "Add":
      return [...state, { name: action.userName, completed: false }]

    case "delete":
      return state.filter((item, index) => index !== action.index)

    // case "edit":  
    // return state.map((item, index) =>{ 
    //   false ? {...item, name:action.userName, completed: false} : item
    // }
    // )
  }

}

function App() {

  const [todo, dispatch] = useReducer(reducer, [{ name: "Akash", completed: false }])
  const [userName, setUserName] = useState("")
  const [editIndex, setEditIndex] = useState(false)
  console.log(todo);
  

  function Add(e) {
    e.preventDefault()
    if (userName !== "" && editIndex === false) {
      // let userName2 = userName.trim()
      dispatch({ type: "Add", userName})
    }else{
      dispatch({ type: "edit", userName})
      setEditIndex(true)

    }
    setUserName("")
  }

  function Delete(index) {
    dispatch({ type: "delete", index })

  }
  function Edit(index) {
    setUserName(todo[index].name)
    setEditIndex(!editIndex)
    // dispatch({ type: "edit", index })

  }


  return (
    <>
      <div className='w-1/2 border text-center mx-auto'>

      <form action="" onSubmit={Add}>

        <input type="text" name="" id="" className='border my-10' value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button className='bg-green-600 px-3 py1 rounded-md text-white'>Add</button>
      </form>

        <table className='flex justify-center'>
          <tbody className='w-full'>
            {todo.map((item, index) => {
              return <tr key={index} className='flex justify-around my-5 border'>

                <td className='border'>
                  <input type="checkbox" name="" id=""/>

                </td>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>

                  <button className='bg-red-600 px-3 py1 rounded-md text-white' onClick={() => Delete(index)}>Delete</button>
                </td>
                <td>

                  <button className='bg-yellow-500 px-3 py1 rounded-md text-white' onClick={() => Edit(index)}>Edit</button>
                </td>

              </tr>
            })}

          </tbody>
        </table>


      </div>

    </>
  )
}

export default App
