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
          <svg className='barcode-img' ref={inputRef} />
        </>
    )
}

export default Barcodegenerate
