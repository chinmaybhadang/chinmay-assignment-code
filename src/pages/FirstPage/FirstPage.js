import React, { Component } from 'react';
import { withRouter,Link } from "react-router-dom"
import './Style.css'

// This is our first page to render : getting started page

class Firstpage extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
    }

    render(){   
        return(
            <div className="col-12 full-Height" style={{backgroundImage:`url("https://jooinn.com/images/purple-abstract-background-5.png")`}}>
                <div className="welcome-text">Welcome...!!!</div>
                <Link to="/users"><button className="getStartedButton left-side-button">Get Started</button></Link>
            </div>
        )
    }
}
export default withRouter(Firstpage)