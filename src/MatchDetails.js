import React, { Component } from 'react';

import {
  NavLink,
  Route,
  HashRouter
} from "react-router-dom";

import Locations from "./Locations";

class MatchDetails extends Component {
    
    constructor() {
    super();
    this.state = {
        matches_per_month: [],
        matches_list_for_team: [],
        matches_to_show: "",
        events: ""

    }
    this.itemClicked = this.itemClicked.bind(this)
    }

    

  itemClicked(){
      this.setState({location_clicked: true})
  }
  
  componentDidMount() {
      var teamSelected = this.props.match.params.id;
    
     fetch("https://api.myjson.com/bins/13kt1r").then((response)=>{
        return response.json().then((json) =>{
            this.matches_per_month = json.months
            let temp_matches_list_for_team = []
            this.matches_per_month.forEach(element => {
                temp_matches_list_for_team.push(Object.values(element)[0].matches.filter(match => String(match.teams).includes(teamSelected)))
            })   
            let matches_to_show = []
            temp_matches_list_for_team.forEach((month) => {
                matches_to_show.push(month.map((element,index)=>
                                    <div key={index} className="schedule-team-container"><h3 className="schedule-team-header">Teams: {element.teams}</h3><div className="schedule-team-body"><p>Date: {element.date}</p><p>Location: <NavLink to={`${this.props.match.url}/locations/${element.location}`} onClick={this.itemClicked}>{element.location}</NavLink></p></div></div>))})
 
            let final_result = <div>{matches_to_show}</div>
                
            this.setState({events:final_result})
        })
    })
  }

    
  render() {
    return (
      <HashRouter>
        <div>
        {this.state.location_clicked ?
        <div><Route path={`${this.props.match.path}/locations/:id`} component={Locations}/></div>
        :
      <div className="matches-body">
        {this.state.events}
      </div>
        }
        </div>
      </HashRouter>
    );
  }
}

export default MatchDetails;