import { Button , Table, Pagination , InputGroup, Form} from "react-bootstrap"
import { useNavigate } from "react-router";
import EditModal from "../components/EditModal";
import { useCallback, useEffect, useMemo, useState } from "react";
// import moment from "moment";
import * as API from "../API/home"
import Add from "../components/Add";
import { useSelector , useDispatch} from "react-redux";
// import { useSearchParams } from "react-router-dom";

import {fetchListUser, setPaging, setValueTotal, setSearch, setShow} from '../redux/slice/home'


export default function Home(){
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isAdmin = currentUser?.role === "admin";
    
    const handleCloseCreate = () => {
        setCreate(false);
      };
      

    const show = useSelector((state) => state.home.show)

    const list = useSelector((state) => state.home.list)

    const total = useSelector((state) => state.home.total)

    const paging = useSelector((state) => state.home.paging)

    const [accountSelected, SetAccountSelected] = useState({})
    const [tmpSearch, setTmpSearch] = useState('')

    const search = useSelector((state) => state.home.search)
    const [openCreate, setCreate] = useState(false);

    useEffect( () => {
 

        dispatch(fetchListUser({page: paging.page, limit: paging.limit, search}))
        dispatch(setValueTotal(50))

    }, [dispatch, paging, search])



    const handleCreate = useCallback(() => {
        setCreate(true)
    }, [])

    const handleEdit = useCallback(async (userId) => {
      const item = await API.getDetailUser(userId);
      dispatch(setShow(true))
      SetAccountSelected(item)
  }, [dispatch])

    const handleClose = () => {
        dispatch(setShow(false))
        SetAccountSelected({})
    }

    const handleDel = useCallback(async (userId) => {
      await API.DeleteUser(userId)
  }, [])
  

  const handleView = useCallback((userID) => {
    navigate(`/${userID}`)
}, [navigate])
    const handleClickPage = (page) => {
 

        dispatch(setPaging({
            ...paging,
            page: page
        }))
    }


    const handleChangeSearch = (e) => {
        //setSearch(e.target.value)
        console.log(e.target.value)
        setTmpSearch(e.target.value)

    }

    const handleSearch = useCallback(() => {
        //setSearch(tmpSearch)

        dispatch(setSearch(tmpSearch))

    }, [dispatch, tmpSearch])

    const handleSaveCreate = () => {
        setCreate(false);

        // setPaging((prev) => {
        //     return{
        //         ...prev,
        //         page: 5
        //     }
        // })
    }

    const totalPage = useMemo(() => Math.ceil(total /paging.limit), [paging.limit, total])

    const renderTable = useMemo(() => {
        if(list && list.length > 0){
            return list.map((item, _index)=> {
                return (
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.fullName}</td>
                        <td>{item.address}</td>
                        <td><img
    src={item.image}
    alt={item.name}
    style={{
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px'
    }}
    onError={(e) => {
      e.target.src = 'https://via.placeholder.com/100';
    }}
  />
</td>


                        <td>
  {isAdmin ? (
    <>
      <Button
        variant="warning"
        size="sm"
        className="me-1"
        onClick={() => handleEdit(item.id)}
      >
        Edit
      </Button>

      <Button
        variant="danger"
        size="sm"
        className="me-1"
        onClick={() => handleDel(item.id)}
      >
        Delete
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={() => handleView(item.id)}
      >
        View
      </Button>
    </>
  ) : (
    <Button
      variant="success"
      size="sm"
      onClick={() => alert("Đã thêm vào giỏ hàng 🛒")}
    >
      Đặt hàng
    </Button>
  )}
</td>

                    </tr>
                )
            })
        }else{
            return null
        }
         
    }, [handleView, list ,  handleEdit, isAdmin , handleDel])


    return (
        <>
           {isAdmin && (
  <Button
    variant="primary"
    style={{ marginBottom: '1.5rem' }}
    onClick={handleCreate}
  >
    Create
  </Button>
)}


             <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Tìm Kiếm</InputGroup.Text>
                    <Form.Control
                        placeholder="Tên Sản Phẩm ... "
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleChangeSearch}
                    />
                  <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
            </InputGroup>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        
                        <th>STT</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Dòng Vợt</th>
                        <th>Giá</th>
                        <th>Ảnh</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {renderTable}
                </tbody>
            </Table>
            <Pagination>
                 {
                    Array.from({ length: totalPage }, (_, i) => {
                        const number = i + 1;
                        return (
                            <Pagination.Item
                                key={number}
                                active={number === paging.page}
                                onClick={() => handleClickPage(number)}
                            >
                                {number}
                            </Pagination.Item>
                            );
                    }
                )}
            </Pagination>
            {isAdmin && (
  <>
    <EditModal
      show={show}
      handleClose={handleClose}
      accountSelected={accountSelected}
    />
 {
  openCreate && (
    <Add
      show={openCreate}
      handleSaveCreate={handleSaveCreate}
      handleClose={handleCloseCreate}
    />
  )
}

  </>
)}

        </>
    )
}

