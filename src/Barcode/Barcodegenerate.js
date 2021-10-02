import React from 'react'
import { useBarcode } from  '@createnextapp/react-barcode'
import '../Print/print.css'

function Barcodegenerate(props) {
    console.log("code"+ props.barcodeData + "   mrp" + props.mrp);
    const { inputRef } = useBarcode({
        value: [props.barcodeData],
        options: {
            width:'2',
            height: '50',
          }
      });
    return (
        <>
          <div className='barcode-div'>
              <span>MRP:120/-<br/>D.O.E-12/12/2021</span>
              <svg className='barcode-img' ref={inputRef} />
          </div>
        </>
    )
}

export default Barcodegenerate
