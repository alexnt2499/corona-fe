import React, {useEffect, useState} from 'react';
import {Modal,Button, Form} from 'react-bootstrap';
import Axios from 'axios';

function ModelEmail(props) {

    const [email,setEmail] = useState('');

    const onSendMail = async () => {
        let Check = await Axios.get(`https://coronavirusupdatevn.herokuapp.com/api/public/sendEmail?email=${email}`);
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
        if(!email) {
            alert('Email không được để trống.')
        }else if(!re.test(email)) {
            alert('Email sai định dạng.')

        }
        else{
            if(Check.data.status == 200) {
                alert('Đăng ký thành công');
                props.onHide()
            }else {
                alert('Email này bạn đã đăng ký');
            }
        }
        
    }

    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
       
      >
        <Modal.Header  style={{backgroundColor : '#212121'}} closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className='text'>
            Nhận thông báo mới nhất mỗi khi cập nhật tin mới.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{backgroundColor : '#212121'}}>
          <h4 className='text2' >Nhập email để được nhận thông báo nhanh nhất ^.^</h4>
          <Form.Group controlId="formBasicEmail">
            
            <Form.Control onChange={(e) => { setEmail(e.target.value)}} type="email" required placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer  style={{backgroundColor : '#212121'}}>
          <Button onClick={() => {onSendMail()}}>Gửi Mail</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModelEmail;