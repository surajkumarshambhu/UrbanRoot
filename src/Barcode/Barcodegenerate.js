import React from 'react'
import { useBarcode } from  '@createnextapp/react-barcode'

function Barcodegenerate() {
    const { inputRef } = useBarcode({
        value: "12345 6789"
      });
    return (
        <canvas ref={inputRef} />
    )
}

export default Barcodegenerate
