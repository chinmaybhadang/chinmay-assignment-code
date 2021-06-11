import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import "./Style.css";
import whiteEdit from '../../image/white-edit.png'
import whiteTrash from '../../image/white-trash.png'
import { connect } from 'react-redux';

class SecondPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
            userList:[],
            selectedRecordIDtoDelete:0,
		}
    }

    componentDidMount(){
        this.setState({userList:this.props.users})
    }

    // This method is used to delete record from list for that we are accepting unique ID
    
    deleteRecord = (id) => {
        try{
            if (window.confirm("Are you sure you really want to delete this record..!!!")) {
                let newUsers = this.state.userList.filter(user => {
                    return id !== user.id
                })
                this.setState({userList:newUsers})
                this.props.deleteData(id)
                this.forceUpdate()
              }
        }
        catch(e){
            console.log("Error from deleteRecord method : ",e)
        }
    }

    addLeadingZeros = (n) => {
        if (n <= 9) {
          return "0" + n;
        }
        return n
      }
      

    // This method is used to format date

    formatDate = (date) => {
        try{
            var today
            today = new Date(date);
            today = this.addLeadingZeros(today.getDate()) + "-" + this.addLeadingZeros(today.getMonth() + 1) + "-" + today.getFullYear()  
            return today
        }
        catch(e){
            console.log("Error from formatDate method : ",e)
        }

    }

    //rendering our jsx code

    render(){
        return(
            <div className="col-12 full-Height" style={{backgroundImage:`url("https://jooinn.com/images/purple-abstract-background-5.png")`}}>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                        <div className="left-side">
                            Student Registration
                        </div>
                        <div className="col-8"></div>
                        <Link to="/add-user">
                            <div className="add-user-button">
                                ADD  <span style={{fontSize:20}}> +</span>
                            </div>
                        </Link>
                        </div>
                        <div className="right-side">
                            {this.state.userList.length>0 ?
                            <table style={{width:"100%"}}>
                            <thead>
                                <tr>
                                    <th className="size" style={{width:"20%"}} scope="col">Name</th>
                                    <th className="size" style={{width:"10%"}} scope="col">Birth Date</th>
                                    <th className="size" style={{width:"20%"}} scope="col">Address</th>
                                    <th className="size" style={{width:"7%"}} scope="col">Gender</th>
                                    <th className="size" style={{width:"25%"}} scope="col">College</th>
                                    <th className="size" style={{width:"10%"}} scope="col">Hobbies</th>
                                    <th className="size" style={{width:"8%"}} scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.userList.map((element)=>{
                                        return(
                                            <tr>
                                            <td className="tdText">{element.name}</td>
                                            <td className="tdText">{this.formatDate(element.bdate)}</td>
                                            <td className="tdText">{element.address}</td>
                                            <td className="tdText">{element.gender}</td>
                                            <td className="tdText">{element.college}</td>
                                            <td className="tdText">{element.hobbies.map((ele)=>{
                                                return ele+", "
                                            })}</td>
                                            <td className="tdText alignCenterIcons">
                                                <Link to={{pathname:'/add-user',userData:{user:element}}}><img style={{paddingRight:20}} src={whiteEdit} alt="Edit" title="Edit"/></Link>
                                                <img src={whiteTrash} onClick={()=>{this.deleteRecord(element.id)}} alt="Edit" title="Delete"/> 
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            :
                            <div className="welcome-text">ADD data into table...!!!</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// This parts are used for retriving data from redux
const mapStateToProps = (state) => {
    return{
        users: state.users
    }
}

// This parts are used for storing data to redux
const mapDispatchToProps = (dispatch) => {
    return{
        deleteData: (id) => { dispatch({type: 'DELETE_DATA', id: id}) }
    }
}

//here we are connecting our component with redux features
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SecondPage))