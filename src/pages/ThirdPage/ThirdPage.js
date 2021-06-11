import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import Searchable from "react-searchable-dropdown"
import ShowCircularProgress from '../../componenet/CircularProgress';
import "./Style.css";
import { connect } from 'react-redux'

class ThirdPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
            collegeData:[],
            collegeList:[],
            hobbies:["Reading", "Gaming", "Traveling", "Drawing",],
            enterHobby:false,
            currentHobbyAdd:null,
            selectedHobbies:[],
            selectedGender:'',
            selectedCollege:'',
            name:undefined,
            bdate:undefined,
            address:undefined,
            EditUserData:undefined,
            userList:[],
		}
    }

    // this function is to calling college api and fetch data
    
    getData = async () => {
        try{
            const response = await fetch("http://universities.hipolabs.com/search")
            const data = await response.json()
            this.setState({collegeData:data})
            this.assigningData()
        }
        catch(e){
            console.log("Error occoured in getData function : ",e)
        }
    }

    componentDidMount(){
       this.getData();
       if(this.props && this.props.location && this.props.location.userData && this.props.location.userData.user!== undefined){
        const {address, bdate, name, id, college, gender, hobbies} = this.props && this.props.location && this.props.location.userData && this.props.location.userData.user;
        this.setState({address, bdate, name, id, selectedCollege: college,selectedGender: gender, selectedHobbies: hobbies})
        this.props && this.props.location && this.props.location.userData && this.props.location.userData.user && this.setState({EditUserData:this.props.location.userData.user});
        this.setState({userList:this.props.users})
       }
    }

    // assigning array data of user according to condition
    
    assigningData = () => {
        try{
            var array = [];
            var entity = {};
            this.state.collegeData && this.state.collegeData.map((element)=>{
                entity = {value:element.name, label:element.name}
                array.push(entity)
                return array
            })
            this.setState({collegeList:array})
        }
        catch(e){
            console.log("Error occoured in assigningData function : ",e)
        }

    }

    // add hobbies data function
    
    addHobbyToList = () => {
        try{
            if(this.state.currentHobbyAdd!=null){
                var array = []
                array = this.state.hobbies
                array.push(this.state.currentHobbyAdd)
                this.setState({hobbies:array, enterHobby:false})
            }
        }
        catch(e){
            console.log("Error occoured in addHobbyToList function : ",e)
        }

    }

    // remove array data function according to condition
    
    arrayRemove = (arr, value) => { 
        try{
            return arr.filter(function(ele){ 
                return ele !== value; 
            });
        }
        catch(e){
            console.log("Error occoured in arrayRemove function : ",e)
        }
    }

    // manage data function to add selected hobbies
    
    addSelectedHobbies = (hobby) => {
        try{
            var array = this.state.selectedHobbies
            var result = []
            if(array.includes(hobby)){
                result = this.arrayRemove(array, hobby);
                this.setState({selectedHobbies:result})
            }
            else{
                array.push(hobby)
                this.setState({selectedHobbies:array})
            }
        }
        catch(e){
            console.log("Error occoured in addSelectedHobbies function : ",e)
        }
    }

    //save data function to add data ande edit according to condition

    saveData = () => {
        try{
            var object = {}
            var object2 = {}
            var array = this.state.userList
            if(this.state.EditUserData===undefined){
                if(this.state.name === undefined || this.state.bdate === undefined || this.state.address === undefined || this.state.selectedCollege === "" ){
                    alert( "Please fill up all mandatory feilds")
                }
                else{
                    object = {
                        id: this.state.name+this.state.address+this.state.selectedGender,
                        name : this.state.name,
                        bdate : this.state.bdate,
                        address : this.state.address,
                        gender : this.state.selectedGender,
                        college : this.state.selectedCollege,
                        hobbies : this.state.selectedHobbies
                    }
                    this.props.addData(object)
                }
            }
            else{
                object2 = {
                    id: this.state.EditUserData.id,
                    name : this.state.name,
                    bdate : this.state.bdate,
                    address : this.state.address,
                    gender : this.state.selectedGender,
                    college : this.state.selectedCollege,
                    hobbies : this.state.selectedHobbies
                }
                this.state.userList.map((ele,index)=>{
                    if(ele.id === object2.id){
                        array.splice(index,0,object2)
                        array.splice(index+1, 1);
                    }
                    return array
                })
                this.props.editData(array)
            }
        }
        catch(e){
            console.log("Error occoured in saveData function : ",e)
        }
    }

    render(){   
        return(
            <div className="col-12 full-Height" style={{backgroundImage:`url("https://jooinn.com/images/purple-abstract-background-5.png")`}}>
            <div className="contain">
               <div className="add-Details"> {this.state.EditUserData === undefined ? "Add Details" : "Edit Details"}</div>
              {this.state.collegeList.length > 0 ? <div className="column showdetail">
                   <div>
                        <label className="lable-style" style={{marginRight:35}}>Name : </label>
                        <input type="text" className="input-style" style={this.state.name==="" ? {marginBottom:0,width:250}:{width:250}} placeholder={this.state.EditUserData!==undefined ? this.state.EditUserData.name : null} onChange={(e)=>this.setState({name:e.target.value})}/>
                        {this.state.name==="" && <p className="validateText">{"This field is required"}</p>}
                    </div>
                    <div>
                        <label className="lable-style" style={{marginRight:10}}>Birth Date : </label>
                        <input type="date" className="input-style" style={this.state.bdate==="" ? {marginBottom:0,width:250}:{width:250}} placeholder={this.state.EditUserData!==undefined ? this.state.EditUserData.bdate : null} onChange={(e)=>this.setState({bdate:e.target.value})}/>
                        {this.state.bdate==="" && <p className="validateText">{"This field is required"}</p>}
                    </div>
                    <div>
                        <label className="lable-style" style={{marginRight:25}}>Address : </label>
                        <input type="text" className="input-style" style={this.state.address==="" ? {marginBottom:0,width:250}:{width:250}} placeholder={this.state.EditUserData!==undefined ? this.state.EditUserData.address : null} onChange={(e)=>this.setState({address:e.target.value})}/>
                        {this.state.address==="" && <p className="validateText">{"This field is required"}</p>}
                    </div>
                    <div className="row" style={{marginLeft:130}}>
                        <label className="lable-style" style={{marginRight:25}}>Gender : </label>
                        <Searchable
                            className="form-control border-0"
                            value={this.state.EditUserData!==undefined && this.state.EditUserData.gender}
                            notFoundText="No result found" // by default "No result found"
                            options={[{value:"Male",label:"Male"},{value:"Female",label:"Female"},{value:"Other",label:"Other"},]}
                            onSelect={(value) => {
                            this.setState({selectedGender:value})
                            }}
                            style={{marginBottom:20}}
                            listMaxHeight={200} //by default 140
                        />
                    </div>
                    <div className="row" style={{marginLeft:128}}>
                        <label className="lable-style" style={{marginRight:25}}>College : </label>
                        <Searchable
                            className="form-control border-0"
                            value={this.state.EditUserData!==undefined && this.state.EditUserData.college}
                            notFoundText="No result found" // by default "No result found"
                            options={this.state.collegeList}
                            onSelect={(value) => {
                                this.setState({selectedCollege:value})
                                }}
                            style={{marginBottom:20}}
                            listMaxHeight={200} //by default 140
                        />
                    </div>
                    <div className="row" style={{textAlign:'left',marginLeft:140}}>
                        <label style={{marginRight:40, marginBottom:15}}>Hobby : </label>
                        <div className="column col-8">
                            <div className="row">
                                {this.state.hobbies.map((ele,index)=>{
                                    return(
                                        <div><input key={index+{ele}+index} type="checkbox" name={ele} onClick={(e)=>{ this.addSelectedHobbies(e.target.name)}}/> <label style={{marginRight:20}}>{ele}</label></div>
                                    )
                                })}
                            </div>
    
                        </div>
                    </div>
                    {this.state.enterHobby &&<div className="hobby-input-div">
                        <input type="text" placeholder="Enter Your Hobby" className="hobby-input-style hobby-input" onChange={(e)=>{ this.setState({currentHobbyAdd:e.target.value})}}/>
                        <button className="hobby-add" onClick={()=>{ this.addHobbyToList()}}>ADD</button>
                    </div>}
                    {!this.state.enterHobby && <div className="col-5 add-Hooby" onClick={()=>{this.setState({enterHobby:true})}}>
                        Add Your Hobby
                    </div>}

                    <Link to="/users"><button className="save-button" onClick={()=>this.saveData()}>Save</button></Link> 
                    <Link to="/users"><button className="cancel-button">Cancel</button></Link>
               </div> 
               :
               <div style={{position:'absolute',marginLeft:200,marginTop:90}}>
                   <ShowCircularProgress/>
               </div>
               
               }
               
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
        addData: (object) => { dispatch({type: 'ADD_DATA', object: object}) },
        editData: (array) => { dispatch({type: 'EDIT_DATA', array: array}) }
    }
}

//here we are connecting our component with redux features

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThirdPage)) 