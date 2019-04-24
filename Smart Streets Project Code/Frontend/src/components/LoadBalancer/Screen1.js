import React, {Component} from 'react';
import './screen1.css';

class Screen1 extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(         
            <div className="bg-loadbalacer">
            <div class="container top-banner" id="img">
                <h2 class="display-4">Load Balancer</h2>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" href="/screen2" role="button">Create Load Balancer</a>
                    </p>
                    <p class="lead1">
                        <a class="btn btn-primary btn-lg" href="#" role="button">Remove Load Balancer</a>
                    </p>
          </div>
          </div>
        );
    }
}

export default Screen1;