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
    col:{
        maxWidth: '50%'
    }
}

function Addproduct() {
    return (
        <div className='add-categories-container'>
                <div className='add-categories-container-header'>
                    <h4>Add Product</h4>
                </div>
                <div className='add-categories-container-body'>
                    <form>
                        <div className='add-categories-container-items'>
                            <div className='form-group-col'>
                                <label>Category *</label>
                                <input type="text" className="form-control" placeholder="Enter category" required="required"/>
                            </div>
                            <div className='form-group-col'>
                                <label>Name *</label>
                                <input type="text" className="form-control" placeholder="Enter product name" required="required"/>
                            </div>
                            <div className='form-group-col'>
                                <label>Barcode Symbology *</label>
                                <input type="text" className="form-control" placeholder="Enter product name" />
                            </div>
                            <div className='form-group-col'>
                                <label>Cost *</label>
                                <input type="text" className="form-control" placeholder="Enter product name" />
                            </div>
                            <div className='form-group-col'>
                                <label>Tax Method *</label>
                                <select className="form-control">
                                    <option value="1">Exclusive</option>
                                    <option value="2">Inclusive</option>
                                </select> 
                            </div>
                            <div className='form-group-col'>
                                <label>Tax *</label>
                                <input type="text" className="form-control" placeholder="Enter tax percentage" />
                            </div>
                            <div className='form-group-col'>
                                <label>HSN Code *</label>
                                <input type="text" className="form-control" placeholder="Enter HSN code" />
                            </div>
                            <div className='form-group-col'>
                                <label>Quantity *</label>
                                <input type="text" className="form-control" placeholder="Enter product name" />
                            </div>
                            <div className='form-group-col'>
                                <label>Image *</label>
                                <input type="file" class="form-control image-file" name="pic" accept="image/*"></input>
                            </div>
                            <div className='form-group-col'>
                                <label>Description / Product Details *</label>
                                <textarea class="form-control text-area" rows="4"></textarea>
                            </div>
                        </div>
                        <div className='form-group-row'>
                            <button type="submit" className="btn-primary-style" style={styles.addCategories}>Add Product</button>
                            <button type="reset" className="btn-primary-style" style={styles.delete}>Reset</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Addproduct
