import axios from "axios";
  import { toast } from 'react-toastify';

const URL = `https://6961f5f2d9d64c761906945c.mockapi.io/test`



export async function getDataUser(page, limit, search){

    console.log('rrrrrrrrrrrrrrrr',page, limit, search)

    let urlBase = `${URL}?`

    if(search){
        urlBase += `name=${search}&`
    }
    if(page && limit){
        urlBase += `page=${page}&limit=${limit}`
    }

    return axios.get(urlBase)
    .then((result) => {
        if(result.status === 200){
            return result
        }
        
    }).catch((err) =>{
        console.log('errrr')
        toast("API error!");
    })
}

export async function DeleteUser(userId){
    return axios.delete(`${URL}/${userId}`)
    .then((result) => {
        if(result.status === 200){
            toast('Ban da xoa thanh cong')
        }
        
    }).catch((err) =>{
        toast("API error!");
    })
}

export async function updateAccount(userId, data){
    return axios.put(`${URL}/${userId}`, data)
    .then((result) => {
        if(result.status === 200){
            toast('Ban da sua thanh cong')
            return
        }
        
    }).catch((err) =>{
        toast("API error!");
    })
}

export async function getDetailUser(userID) {
    return axios.get(`${URL}/${userID}`).then((row) => {
        console.log('ttttttttttt', row)
            if(row.status === 200){
                return row.data
            }
        })
}