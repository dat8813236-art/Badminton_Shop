import { Button , Table, Pagination , InputGroup, Form} from "react-bootstrap"
import { useNavigate } from "react-router";
import EditModal from "../components/EditModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import * as API from "../API/home"
import Add from "../components/Add";
import { useSelector , useDispatch} from "react-redux";
import {fetchListUser, setPaging, setValueTotal, setSearch, setShow} from '../redux/slice/home'


export default function Home(){
    const dispatch = useDispatch()
    let navigate = useNavigate();
    //const [show, setShow] = useState(false)

    const show = useSelector((state) => state.home.show)

    // const [list, setList] = useState([]);
    const list = useSelector((state) => state.home.list)
    // const [total, setTotal] = useState(0)
    const total = useSelector((state) => state.home.total)
    // const [paging, setPaging] = useState({
    //     page: 1,
    //     limit: 10
    // })
    const paging = useSelector((state) => state.home.paging)

    const [accountSelected, SetAccountSelected] = useState({})
    const [tmpSearch, setTmpSearch] = useState('')
    //const [search, setSearch] = useState('')
    const search = useSelector((state) => state.home.search)
    const [openCreate, setCreate] = useState(false);

    useEffect( () => {
        // async function fetchData() {
        //     const response = await API.getDataUser();
        //     //setList(response.data)
        //     setTotal(50)
        // }
        // fetchData();

        dispatch(fetchListUser({page: paging.page, limit: paging.limit, search}))
        dispatch(setValueTotal(50))

    }, [dispatch, paging, search])



    const handleCreate = useCallback(() => {
        setCreate(true)
    }, [])

    const handleEdit = async (userId) => {
        const item = await API.getDetailUser(userId);
        dispatch(setShow(true))
        SetAccountSelected(item)
    }

    const handleClose = () => {
        dispatch(setShow(false))
        SetAccountSelected({})
    }

    const handleDel = async (userId) => {
        await API.DeleteUser(userId)
    }

    const handleView = (userID) => {
        navigate(`/${userID}`)
    }

    const handleClickPage = (page) => {
        // setPaging((prev) => {
        //     return {
        //         ...prev,
        //         page: page
        //     }
        // })

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
                        <td>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => handleEdit(item.id)}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDel(item.id)}>Delete</Button>
                            <Button variant="primary" size="sm" onClick={() => handleView(item.id)}>view</Button>
                        </td>
                    </tr>
                )
            })
        }else{
            return null
        }
         
    }, [handleView, list])


    return (
        <>
            <Button variant="primary" style={{ marginBottom: '1.5rem' }} onClick={handleCreate}>
                Create
            </Button>

             <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Frist Name</InputGroup.Text>
                    <Form.Control
                        placeholder="First Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleChangeSearch}
                    />
                  <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
            </InputGroup>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>createdAt</th>
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
            <EditModal show={show} handleClose={handleClose} accountSelected={accountSelected}/>
            {
                openCreate && <Add show={openCreate} handleSaveCreate={handleSaveCreate}/>
            }
        </>
    )
}

