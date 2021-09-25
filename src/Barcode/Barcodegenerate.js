import React from 'react'
import { useBarcode } from  '@createnextapp/react-barcode'
import '../Print/print.css'

function Barcodegenerate() {
    const { inputRef } = useBarcode({
        value: "12345 6789"
      });
    return (
        <img className='barcode-img' ref={inputRef} />
    )
}

export default Barcodegenerate
