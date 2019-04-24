import React, {Component} from 'react';
import Select from 'react-select';
import './screen2.css';

const options = [
    { value: 'TCP', label: 'TCP' },
    { value: 'HTTPS', label: 'HTTPS'},
    { value: 'HTTP', label: 'HTTP'}
];

class Screen2 extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="jumbotron top_banner" id = "img">
                <h2 class="display-4">Create Launch Configuration</h2>
                    <p class="lead">
                        <input type="text" placeholder="Load balancer name"/>
                    </p>
                    <div style={{width : "60%", paddingLeft : "40%"}}>
                    <Select class="form-control" options={options}/>
                    </div>
                    &nbsp;
                    <p class="lead1">
                        <a class="btn btn-primary btn-lg" href="/screen3" role="button">Enter</a>
                    </p>
          </div>
        );
    }
}

export default Screen2;