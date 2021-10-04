import React,{useState,useEffect} from 'react'
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

function AddCatagories() {
    const history = useHistory();
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
        console.log(formData)
    }

    function submit(e){
        e.preventDefault()
        setLoader({
            loader: true
        })
        const postData = 
        {
            request: {
                id: '',
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

    return (
        <div className='add-Catagories-container'>
                <div className='add-Catagories-container-header'>
                    <h4>Add Category</h4>
                </div>
                <div className='add-Catagories-container-body'>
                    <form onSubmit={(e) => submit(e)}>
                        <div className='add-Catagories-container-items'>
                            {/* <div className='col-100'>
                                <div className='form-group'>
                                    <label>Image</label>
                                    <input type="file" class="form-control image-file" name="pic" accept="image/*"></input>
                                </div>
                            </div> */}
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
                                        (loader.loader) === true ? "Adding" : "Add Category"
                                    }
                                </button>
                                <button type="reset" className="btn-primary-style" style={styles.delete}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default AddCatagories
