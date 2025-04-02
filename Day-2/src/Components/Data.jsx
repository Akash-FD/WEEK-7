import React, { useEffect, useState } from 'react'
import { HiViewColumns } from 'react-icons/hi2'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle, IoMdCloudDownload } from 'react-icons/io'
import { MdLocalPrintshop, MdOutlineSearch } from 'react-icons/md'
import { TbMenu4 } from 'react-icons/tb'
import axios from 'axios'
import SingleData from './SingleData'
// import './Data.css'

const Data = (props) => {
    const [search, setSearch] = useState(false)
    const [searching, setSearching] = useState("")
    // const [filterData, setFilterData] = useState([])
    const [paginateData, setPaginateData] = useState([])
    const [page, setPage] = useState(1)
    const [singleDetail, setSingleDetail] = useState({})
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [close, setClose] = useState(true)


    const handleSearch = () => {
        if (search) {
            setSearch(false)
            setSearching("")
        }
        else {
            setSearch(true)
        }
    }
    const prebtn = () => {
        setPage(page - 1)
        setOffset(offset - 10)

    }
    const nextbtn = () => {
        setPage(page + 1)
        setOffset(offset + 10)

    }

    useEffect(() => {
        const fetchData = async () => {
            if (props.select === "All Launches") {
                
                const { data } = await axios.get(`https://api.spacexdata.com/v3/launches`)
                console.log(data);
                setPaginateData(data)
            
                
            }

            if (props.select === "Successful") {
                const { data } = await axios.get(`https://api.spacexdata.com/v3/launches/?launch_success=true`)
                console.log(data);
                setPaginateData(data)
            

                
            }
             if (props.select === "failed") {
                const { data } = await axios.get('https://api.spacexdata.com/v3/launches/?launch_success=false')
                console.log(data);
                setPaginateData(data)
                setPage(1)

            }
             if (props.select === "Upcoming") {
                const { data } = await axios.get('https://api.spacexdata.com/v3/launches/upcoming')
                console.log(data);
                setPaginateData(data)
                setPage(1)


            } 
        }
        fetchData()
        
    }, [props.select, limit, offset, page])



    const UpdatePaginateData = paginateData.slice((page - 1) * limit, page * limit)

    return (
        <div className="border border-gray-300 shadow-md rounded-md">


            <div className="flex justify-between items-center gap-5 text-2xl text-gray-500 mt-4 mx-4">
                {search === true ? <div className="flex items-center search-bar border ml-10 ">
                    <MdOutlineSearch />
                    <input type="text" className='px-2 w-full border-none text-[15px] text-black' value={searching} onChange={(e) => setSearching(e.target.value)} />
                </div>
                    :
                    <div className="search-bar border-b ml-10 opacity-0">
                        <MdOutlineSearch />
                        <input type="text" />
                    </div>}
                <div className='flex justify-end gap-5 text-2xl text-gray-500 mt-4 mx-4'>
                    <MdOutlineSearch onClick={handleSearch} />
                    <IoMdCloudDownload />
                    <MdLocalPrintshop />
                    <HiViewColumns />
                    <TbMenu4 />
                </div>
            </div>

            <div className='mx-3'>

                <table className='w-[100%] mt-10'>
                    <thead className='border-b'>
                        <tr className='table-head font-light text-left cursor-pointer'>
                            <th className='font-normal p-3'>No:</th>
                            {/* <th className='flex items-center'>Launched(UTC) <FaArrowUp /></th> */}
                            <th className='font-normal p-3'>Launched(UTC)</th>
                            <th className='font-normal p-3'>Location</th>
                            <th className='font-normal p-3'>Mission</th>
                            <th className='font-normal p-3'>Orbit</th>
                            <th className='font-normal p-3'>Launch Status</th>
                            <th className='font-normal p-3'>Rocket</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searching.length > 0 ?
                            UpdatePaginateData.filter((item) => { return searching.toLowerCase() === "" ? item : item.launch_site.site_name.toLowerCase().startsWith(searching) }).map((item, index) => {
                                return <tr key={index} className='text-sm border-b cursor-pointer hover:bg-gray-100' onClick={() => {setSingleDetail(item); setClose(true)}}>
                                    <td className='font-normal p-3'>{item.flight_number}</td>
                                    <td className='font-normal p-3'>{item.launch_date_utc}</td>
                                    <td className='font-normal p-3'>{item.launch_site.site_name}</td>
                                    <td className='font-normal p-3'>{item.mission_name}</td>
                                    <td className='font-normal p-3'>{item.rocket.second_stage.payloads[0].orbit}</td>
                                    <td className='font-normal p-3'>{item.launch_success === true ? <button className='bg-green-600 w-20 text-white px-3 py-1 rounded-xl'>success</button> : <button className='bg-red-600 w-20 text-white px-3 py-1 rounded-xl'>failed</button>}</td>
                                    <td className='font-normal p-3'>{item.rocket.rocket_name}</td>
                                </tr>
                            })
                            :


                            UpdatePaginateData.map((item, index) => {
                                return <tr key={index} className='text-sm border-b cursor-pointer hover:bg-gray-100' onClick={() => {setSingleDetail(item); setClose(true)}}>
                                    <td className='font-normal p-3'>{item.flight_number}</td>
                                    <td className='font-normal p-3'>{item.launch_date_utc}</td>
                                    <td className='font-normal p-3'>{item.launch_site.site_name}</td>
                                    <td className='font-normal p-3'>{item.mission_name}</td>
                                    <td className='font-normal p-3'>{item.rocket.second_stage.payloads[0].orbit}</td>
                                    <td className='font-normal p-3'>{item.upcoming === false ? (item.launch_success === true ? <button className='bg-green-600 w-20 text-white px-3 py-1 rounded-xl'>success</button> : <button className='bg-red-600 w-20 text-white px-3 py-1 rounded-xl'>failed</button>) : <button className='bg-yellow-600 w-20 text-white px-3 py-1 rounded-xl'>upcoming</button>}</td>
                                    <td className='font-normal p-3'>{item.rocket.rocket_name}</td>
                                </tr>
                            })}


                    </tbody>
                </table>
                <div className='text-4xl flex gap-4 justify-end my-8'>
                    <button disabled={page <= 1} onClick={prebtn} className='hover:text-red-600'><IoMdArrowDropleftCircle /></button>
                    <p>{page}</p>
                    <button disabled={paginateData.length < 10} onClick={nextbtn} className='hover:text-red-600'><IoMdArrowDroprightCircle /></button>
                </div>

                {
                    Object.keys(singleDetail).length > 0 && <SingleData singleDetail={singleDetail} close={close} setClose={setClose}/>

                }

            </div>
        </div>
    )
}

export default Data