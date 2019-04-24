import React, {Component} from 'react';
import './screen3.css';
import Picky from "react-picky";


const bigList = ['TCP','UDP'];
const bigList1 = ['Round robin', 'Least Count', 'Least traffic'];

class Screen3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          value: null,
          arrayValue: [],
          arrayValue1: []
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
        this.selectMultipleOption1 = this.selectMultipleOption1.bind(this);
      }

    selectMultipleOption(value) {
        console.log("Val", value);
        this.setState({ arrayValue: value });
      }
      selectMultipleOption1(value) {
        console.log("Val", value);
        this.setState({ arrayValue1: value });
      }

      redirectaws=()=>{

      }

    render(){
        return(
            <div class="jumbotron top_banner" id = "img">
                <h2 class="display-4">Choose configuration Policy and Launch</h2>
                <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Type</h3>
                        <Picky
                        value={this.state.arrayValue}
                        options={bigList}
                        onChange={this.selectMultipleOption}
                        open={false}
                        valueKey="id"
                        labelKey="name"
                        multiple={true}
                        includeSelectAll={false}
                        includeFilter={true}
                        dropdownHeight={600}
                        />
                    </div>
                    <div className="col">
                        <h3 >Policy</h3>
                             <Picky
                                value={this.state.arrayValue1}
                                options={bigList1}
                                onChange={this.selectMultipleOption1}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={false}
                                includeFilter={true}
                                dropdownHeight={600}
                                />
                    </div>
                </div>
               
                </div>
                <p class="lead1">
                        <button><a class="btn btn-primary btn-lg" href="https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Fstate%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fhomepage&forceMobileApp=0" role="button">Launch</a>
                        </button>
                  </p>
          </div>
        );
    }
}

export default Screen3;