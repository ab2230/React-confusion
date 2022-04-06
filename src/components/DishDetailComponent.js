import React, {Component} from 'react';
import {  Modal, ModalHeader, ModalBody, Button, Label, Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }
    render(){
        return(
            <div>
           <Button onClick={this.toggleModal} className="text-dark bg-light">
               <span className='fa fa-pencil fa-lg'></span> Submit Comment</Button>
           <div>
           <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <div>
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        <Control.select model=".rating" name='rating'
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                
                        </div>
                        <div>
                        <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name" placeholder="Your Name"
                                className='form-control'
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors
                                 className="text-danger"
                                 model=".name"
                                 show="touched"
                                 messages={{
                                     required: 'Required and it ',
                                     minLength: 'Must be greater than 2 characters',
                                     maxLength: 'Must be 15 characters or less'
                                 }}
                                 />
                        </div>
                        <div>
                        <Label htmlFor="comment" md={2}>Comment</Label>
                        
                                <Control.textarea model=".comment" id="comment" name="comment" rows='12'
                                className="form-control"/>
                                </div>
                        <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
             </Modal>
           </div>
       </div>
        ); 
    }
}

    function RenderDish({dish}){
        if(dish!=null){
            return(
                <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
        
    }
    function RenderComment({comment, addComment, dishId}){
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
            <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
            );  
        }
        else{
            return(<div className='col-12 col-md-5'></div>);
        }
    }
    const DishDetailComponent=(props)=>{
        if(props.isLoading){
                return(
                    <div className='container'>
                        <div className='row'>
                            <Loading />
                        </div>
                    </div>
                );
            }
        else if(props.errMess) {
                return(
                    <div className='container'>
                        <div className='row'>
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
        else{
        return(
            <div className="container">
            <div className='row'>
                 <Breadcrumb>
                 <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem active>{props.Dish.name}</BreadcrumbItem>
                 </Breadcrumb>
                 <div className='col-12'>
                    <h3>{props.Dish.name}</h3>
                    <hr />
            </div>
             </div>
             <div className="row">
                  <RenderDish dish={props.Dish}/>
                  <RenderComment comment={props.comments}
                    addComment={props.addComment}
                    dishId={props.Dish.id}/>
             </div>
            </div>
            );
    }
    }
export default DishDetailComponent;