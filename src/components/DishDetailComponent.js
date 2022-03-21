import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay, CardText, CardBody } from 'reactstrap';
class DishDetailComponent extends Component{
    constructor(props){
        super(props);
    }
    renderDish(dish){
        if(dish!=null){
            return(
                <div>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
    renderComment(comment){
        if(comment!=null){
            const comments = comment.map((comm)=>{return(
                <div key='comm.id'>
                    <div>
                        <ul className='list-unstyled'>
                            <li>{comm.comment}</li>
                            <li>--{comm.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</li>
                        </ul>
                    </div>
                </div>
            );
        });
          return(
            <div>
            <h4>Comments</h4> 
            {comments}
            </div>
            );  
        }
        else{
            return(<div></div>);
        }
    }
    render(){
        return(
            <div className="container">
             <div className="row">
                 <div className='col-12 col-md-5 m-1'>
                {this.renderDish(this.props.Dish)}
                </div>
                <div className='col-12 col-md-5'>
                {this.renderComment(this.props.Dish.comments)}
                </div>
             </div>
            </div>
            );
    }
}
export default DishDetailComponent;