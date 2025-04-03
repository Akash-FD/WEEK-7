import { useState } from 'react'
import './App.css'
import { IoIosSearch } from 'react-icons/io'
import NasaServices from './Service/NasaService'

function App() {
  const [search, setSearch] = useState("")
  const [searching, setSerching]=useState("")
  const [nasaData, setNasaData] = useState({})


  const showData =  async() => {
    // console.log(NasaServices.getImages(searching))
    // const { data } = await axios.get(`http://images-api.nasa.gov/search?q=${search}`)
    // setNasaData(data)
    // setSerching(search)
    // // console.log(nasaData.collection.items[0].links);
    //  console.log(nasaData.collection);

    try {
     const data = await NasaServices.getImages(search)
     setNasaData(data)
     setSerching(search)
    } catch (error) {
      console.log("somthing went wrong : ", error);
      
      
    }


  }

  return (
    <>
      <div className='header bg-[https://images.nasa.gov/images/global-header_bg..png] h-48 w-full'>
        <div className='flex gap-2 ml-[30%] p-10 rounded-xl'>
          <div className='w-[50%]  rounded-xl'>
            <input type="text" placeholder='Enter text' className='w-full h-full px-3 rounded-xl' value={search} onChange={(e) => setSearch(e.target.value)} />

          </div>
          <button className='p-2 bg-blue-500 hover:bg-blue-600 text-2xl text-white rounded-full' disabled={search.length===0} onClick={showData}><IoIosSearch /></button>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='text-white text-3xl my-10'>
          <h1 className=''>Showing results for "{searching}":</h1>
        </div>
        <div className='columns-3 gap-7 '>
        {nasaData && nasaData.collection?.items.map((value,i)=>{  
            return  <img key={i} src={value?.links?.[1]?.href} alt="" className='my-5 w-[95%] border border-slate-500 rounded-lg'/>
             

          })}

        </div>
          
          {/* <div className="image-gallery">
          {nasaData.collection.items[0].links.map((item,index)=>{
            return <img src={item.href} alt="" width={item.width} size={item.size}/>
          })}

        </div> */}

        </div>

        

     
    </>

  )
}

export default App
