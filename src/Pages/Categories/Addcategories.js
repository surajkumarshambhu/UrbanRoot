import React from 'react'

const styles={
    addCategories:{
        backgroundColor: '#32BDEA' ,
        borderColor: '#32BDEA'
    },
    delete:{
        backgroundColor: '#E08DB4' ,
        borderColor: '#E08DB4'
    },
}

function Addcategories() {
    return (
        <div className='add-categories-container'>
                <div className='add-categories-container-header'>
                    <h4>Add Category</h4>
                </div>
                <div className='add-categories-container-body'>
                    <form>
                        <div className='add-categories-container-items'>
                            {/* <div className='col-100'>
                                <div className='form-group'>
                                    <label>Image</label>
                                    <input type="file" class="form-control image-file" name="pic" accept="image/*"></input>
                                </div>
                            </div> */}
                            <div className='form-group-col'>
                                <label>Category *</label>
                                <input type="text" className="form-control" placeholder="Enter Category" required=""/>
                            </div>
                            <div className='form-group-row'>
                                <button type="submit" className="btn-primary-style" style={styles.addCategories}>Add category</button>
                                <button type="reset" className="btn-primary-style" style={styles.delete}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Addcategories
