import React from 'react'
import { useBarcode } from  '@createnextapp/react-barcode'
import '../Print/print.css'

function Barcodegenerate() {
    const { inputRef } = useBarcode({
        value: ["12345 6789","MRP-12.00"],
        options: {
            width:'1',
            height: '50',
          }
      });
    return (
        <svg className='barcode-img' ref={inputRef} />
    )
}

export default Barcodegenerate
