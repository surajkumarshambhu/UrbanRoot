import React from 'react'
import Barcodegenerate from '../Barcode/Barcodegenerate';
import './print.css'
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
            <Barcodegenerate></Barcodegenerate>
            <Barcodegenerate></Barcodegenerate>
        </div>
      );
    }
  }

export default class Printbarcode extends React.Component{
    render() {
        return (
            <div>
            <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => this.componentRef}
            />
            <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
        )
    };
}

