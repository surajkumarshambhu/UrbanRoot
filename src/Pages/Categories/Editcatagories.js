import React, { useEffect,useState }  from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router';
import { ApiHelper } from '../../Helper/APIHelper'

const styles={
    addCatagories:{
        backgroundColor: '#32BDEA' ,
        borderColor: '#32BDEA'
    },
    delete:{
        backgroundColor: '#E08DB4' ,
        borderColor: '#E08DB4'
    },
    display:{
        display: "block",
    },
    none:{
        display: "none",
    },
}

function Editcatagories() {

    const history = useHistory();
    const [showPrintDiv, setPrintDiv] = useState(false);
    const [loader, setLoader] = useState({
        loader: false,
    })

    const [formData,setFormData] = useState({
        id:'',
        category: '',
    })

    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    function submit(e){
        e.preventDefault()
        setLoader({
            loader: true
        })
        const postData = 
        {
            request: {
                id: formData.id,
                category: formData.category,
            }
        }
        let url = "add-category";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            history.push("/Catagories");
            setLoader({
                loader: false
            })
        })
    }

    useEffect(() => {
        setPrintDiv(true);
        if (localStorage.getItem("editId") === null) {
            return
        }
        const requestBody = {request: {catagory_id: localStorage.getItem("editId")}}
        let url = "get-catagories-id";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.data.categories_list.length > 0){
                setFormData({
                    id: resposnse.data.categories_list[0].id,
                    category: resposnse.data.categories_list[0].category,
                })
                localStorage.removeItem('editId');
                setPrintDiv(false);
            }
            else{
                setPrintDiv(false);
            }
        })
    },[]);

    return (
        <div className='add-Catagories-container'>
        <div className=''>
            <h4>Edit Category</h4>
        </div>
        <div className='add-Catagories-container-body'>
        {
            showPrintDiv ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
            <form onSubmit={(e) => submit(e)}>
                <div className='add-Catagories-container-items'>
                    <div className='form-group-col'>
                        <label>Category *</label>
                        <input type="text" className="form-control" placeholder="Enter Category" required="required" onChange={(e) => handle(e)} id = 'category' value={formData.category}/>
                    </div>
                    <div className='form-group-row'>
                        <button type="submit" className="btn-primary-style" style={styles.addCatagories} disabled={loader.loader}>
                            {
                                loader.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                            }
                            {
                                (loader.loader) === true ? "Updating" : "Edit Category"
                            }
                        </button>
                    </div>
                </div>
            </form>
        }
        </div>
        </div>
    )
}

export default Editcatagories
