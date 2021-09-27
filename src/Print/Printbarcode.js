import React from 'react'
import Barcodegenerate from '../Barcode/Barcodegenerate';
import './print.css'
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {
    render() {
      return (
        <div className='barcode-print-div'>
            <Barcodegenerate></Barcodegenerate>
            <Barcodegenerate></Barcodegenerate>
        </div>
      );
    }
  }

export default class Printbarcode extends React.Component{
    render() {
        return (
          <>
            <ComponentToPrint ref={el => (this.componentRef = el)} />
            <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => this.componentRef}
            />
          </>
        )
    };
}

