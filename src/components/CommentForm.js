import react, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, Button, Label, Row, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

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
        console.log("Current State is:"+JSON.stringify(values));
        alert("Current State is:"+JSON.stringify(values));
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
                        <Control.select model=".rating" name='ratingType'
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
export default CommentForm;