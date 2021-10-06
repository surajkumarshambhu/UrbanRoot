import React from 'react'
import Barcodegenerate from '../Barcode/Barcodegenerate';
import './print.css'
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {
    render() {
      return (
        <div className='barcode-print-div'>
            <Barcodegenerate barcodeData={this.props.barcodeData} mrp = {this.props.mrp} doe={this.props.doe}></Barcodegenerate>
            <Barcodegenerate barcodeData={this.props.barcodeData} mrp = {this.props.mrp} doe={this.props.doe}></Barcodegenerate>
        </div>
      );
    }
  }

export default class Printbarcode extends React.Component{
    render() {
      const style = {
        display: "flex",
        aligItems: "center",
        justifyContent: "center",
        backgroundColor: "#78C091",
        padding: "5px",
        borderColor: "#78C091",
        border: "none",
        borderRadius: "10px",
        color: "black",
        fontSize: "larger",
        marginTop: "8px",
        cursor:"pointer"
      }
        return (
          <div>
            <ComponentToPrint ref={el => (this.componentRef = el)} barcodeData={this.props.barcodeData} mrp = {this.props.mrp} doe={this.props.doe}/>
            <ReactToPrint 
                trigger={() => <a style={style} href="#">Print this out!</a>}
                content={() => this.componentRef}
            />
          </div>
        )
    };
}

