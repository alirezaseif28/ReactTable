import React, { Component } from 'react';

class Like extends Component {
    state = {  }
    render() { 
        return (<i style={{color:'#ED4956' , cursor: "pointer"}} className={this.props.liked ? "fa fa-heart" : "fa fa-heart-o"} onClick={this.props.onClick} aria-hidden="true"></i>);
    }
}
 
export default Like;



  