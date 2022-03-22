import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay, CardText, CardBody } from 'reactstrap';

    function RenderDish({dish}){
        if(dish!=null){
            return(
                <div className='col-12 col-md-5 m-1'>
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
    function RenderComment({comment}){
        if(comment!= null && comment != undefined){
            const comments = comment.map((comm)=>{return(
                <div key='comm.id'>
                    <div>
                        <ul className='list-unstyled'>
                            <li>{comm.comment}</li>
                            <li>-- {comm.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</li>
                        </ul>
                    </div>
                </div>
            );
        });
          return(
            <div className='col-12 col-md-5'>
            <h4>Comments</h4> 
            {comments}
            </div>
            );  
        }
        else{
            return(<div className='col-12 col-md-5'></div>);
        }
    }
    const DishDetailComponent=(props)=>{
        if(props.Dish==null && props.Dish==undefined){
            return(<div></div>);
        }      
        return(
            <div className="container">
             <div className="row">
                  <RenderDish dish={props.Dish}/>
                  <RenderComment comment={props.Dish.comments}/>
             </div>
            </div>
            );
    }

export default DishDetailComponent;