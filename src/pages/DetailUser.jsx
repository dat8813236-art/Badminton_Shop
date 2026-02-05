import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

export default function DetailUser(){
    const {userID} = useParams();
    const [data, setData] = useState({})
    const total = useSelector((state) => state.home.total)

    useEffect(() => {
        axios.get(`https://6961f5f2d9d64c761906945c.mockapi.io/test/${userID}`).then((row) => {
            if(row.status === 200){
                setData(row.data)
            }
        })
    }, [userID])

    return( 
        <>
            <h1>Tổng sản phẩm trong kho {total}</h1>
            <h1>Thông tin sản phẩm</h1>
            <h2>Tên :  {data.name}</h2>
            <image src={data.avatar}/>
            <h2>Ngày Thêm   : {moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}</h2>
        </>
    
    )
}