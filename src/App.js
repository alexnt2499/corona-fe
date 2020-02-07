import React, {useEffect,useState} from 'react';
import './css/index.css';
import {Container,Row,Col,Badge,Spinner} from 'react-bootstrap';
import logoSubee from './../src/assets/image/icon.jpg';
import { FaBell,FaFacebookSquare ,FaGlobeAsia , FaPlusSquare,FaHaykal,FaSyringe,FaPencilAlt } from 'react-icons/fa';
import Mapss from './component/Map';
import Axios from 'axios';
import ModalEmail from './../src/component/ModelEmail';

function App() {
  const [listData,setListData] = useState([]);
  const [dataTotal,setDataTotal] = useState({});
  const [loading,setLoading] = useState(true);
  const [openModal,setOpenModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
        setLoading(true);
       let getData = await Axios.get('https://coronavirusupdatevn.herokuapp.com/api/public/getAllDataCoronaByDate?date=2020-2-7');
        let sumNhiem = 0;
        let sumChet = 0;
        let sumKhoi = 0;
        for (let index = 0; index < getData.data.data.length; index++) {
          const element = getData.data.data[index].data;
          let deaths = element.deaths != '' ? element.deaths.replace(',','') : 0;
          let khoi = element.recuperate != '' ? element.recuperate.replace(',','') :0;
          let nhiem = element.confirmed != '' ? element.confirmed.replace(',','') :0;

          sumNhiem += Number(nhiem);
          sumChet += Number(deaths);
          sumKhoi += Number(khoi);
          console.log( nhiem);

        }
        
        setDataTotal({
          sumNhiem,
          sumChet,
          sumKhoi
        })
       setListData(getData.data.data);
       setLoading(false);

    }

    getData()
  },[])
  return (
      <Container  style={{width : '100%', height : '100%'}} fluid={true}>
        
          <Row>
              <Col className='row-1' md={12}>
                <Container  fluid={true}>
                  <Row>
                    <Col className='row-2' md={2}>
                        <div className='col-style'>
                          <img className='avatar' src={logoSubee} width='50px' height='50px'></img>
                          <p className={'text2'} >NTD Coder</p>
                        </div>
                    </Col>

                    <Col className='row-2' md={3}>
                        <p className='text'>Coronavirus (2019-nCoV)</p>
                    </Col>

                    <Col className='row-2' md={3}>
                     
                        <div className={'buttonStyleFa'} style={{marginRight : 10}}>
                              <FaFacebookSquare color={'white'} style={{marginRight : 3}}></FaFacebookSquare>
                              <span style={{color : 'white', fontSize : 10}}>Chia sẻ</span>
                        </div>

                        <div onClick={() => {setOpenModal(true)}} className={'buttonStyle'}>
                              <FaBell color={'white'} style={{marginRight : 3}}></FaBell>
                              <span style={{color : 'white', fontSize : 10}}>Nhận thông báo</span>
                        </div>
                       

                       
                    </Col>

                    <Col className='row-2' md={4}>
                      <table>
                        <td>
                          <tr className={'text2'}>
                            Cập nhập lần cuối lúc {new Date().toString()}
                          </tr>
                          <tr className={'text2'}>
                            Nguồn : WHO, CDC, NHC, DXY & Bộ Y Tế Việt Nam. 
                          </tr>
                          <tr className={'text2'}>
                            Liên hệ : <a href='#'>ntd.codervn@gmail.com</a>
                          </tr>
                        </td>
                      </table>
                  

                    </Col>
                  </Row>


                 
                  
                 </Container>
              </Col>
             
          </Row>

          <Row  style={{marginTop : 10}}>
                    <Col className='row-1-col-2' md={3}>
                        <Container  fluid={true}>
                          
                          <Row style={{marginTop : 10}}>
                           
                              <Col md={12}>
                                <div style={{justifyContent : 'center', display :'flex', alignItems : 'center' , marginBottom : 20}}>
                               
                                  <Badge variant="dark">0</Badge>
                                  <div className='text2' style={{fontSize : 10,marginLeft : 5}}> Số ca nhiễm</div>
                                
                                
                                <Badge variant="danger" style={{marginLeft : 20}}>0</Badge>
                                  <div className='text2'  style={{fontSize : 10,marginLeft : 5}}> Tử vong</div>
                               
                               
                                <Badge variant="success" style={{marginLeft : 20}}>0</Badge>
                                  <div className='text2' style={{fontSize : 10,marginLeft : 5}}> Hồi phục</div>
                                

                                </div>
                                <div className={'text2'} style={{marginBottom : 10, fontWeight : 'bold'}}><FaGlobeAsia></FaGlobeAsia> Thống kê ca nhiễm theo quốc gia</div>
                                {loading ? <div style={{width : '100%', display :'flex' , justifyContent : 'center', alignItems : 'center'}}><Spinner style={{textAlign : 'center'}} animation="border" variant="light" /></div> : <table>
                                  {listData.map((element) => {
                                     return (<tr>
                                      <td> <div className={'text2'}>{element.data.country}</div></td>
                                      <td> <div className={'text2'} style={{marginLeft : 10}}> <Badge variant="dark">{element.data.confirmed != '' ? element.data.confirmed.replace(',','') : 0}</Badge></div></td>
                                      <td> <div className={'text2'}  style={{marginRight : 10, marginLeft : 10}}> <Badge variant="danger">{element.data.deaths != '' ? element.data.deaths.replace(',','') : 0}</Badge></div></td>
                                      <td> <div className={'text2'}> <Badge variant="success">{element.data.recuperate != '' ? element.data.recuperate.replace(',','') : 0}</Badge></div></td>
                                      
                                    </tr>)
                                  })}
                                </table>}
                              </Col>

                            
                          </Row>
                        </Container>
                    </Col>

                    <Col className='row-1-col-2' md={6}>
                      <p className='text2' style={{textAlign : 'center'}}> <FaGlobeAsia></FaGlobeAsia> Biểu đồ lây nhiễm toàn thế giới</p>
                     <Mapss></Mapss>

                    </Col>

                    <Col className='row-1-col-2' md={3}>
                   
                    {loading ? <div style={{width : '100%', display :'flex' , justifyContent : 'center', alignItems : 'center'}}><Spinner style={{textAlign : 'center'}} animation="border" variant="light" /></div> : 
                        <Row>
                       <Col md={4}>
                        <div className='col-style'>
                          <div className='text2'> <FaSyringe></FaSyringe>  Tổng ca nhiễm</div>
                          <div className='text'> {dataTotal.sumNhiem}</div>
                        </div>
                      </Col>

                      <Col md={4}>
                      <div className='col-style'>
                      <div className='text2'><FaHaykal></FaHaykal> Tử vong</div>
                      <div className='text'> {dataTotal.sumChet}</div>
                      </div>

                      </Col>
                     
                      <Col md={4}>
                      <div className='col-style'>
                      <div className='text2'> <FaPlusSquare></FaPlusSquare> Hồi phục</div>
                      <div className='text'> {dataTotal.sumKhoi}</div>
                      </div>
                      </Col>
                        </Row>
                    }
                            

                           


                      

                        <Row style={{marginTop : 50}}>
                          <Col md={12} style={{display : 'flex', flexDirection : 'row', alignItems : 'center', marginBottom : 30}}>
                            
                            <div className='text2' style={{marginLeft : 10, fontWeight : 'bold'}}> <FaPencilAlt></FaPencilAlt> Chú thích biểu đồ</div>
                          </Col>
                          <Col md={12} style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                            <div style={{backgroundColor : 'red' , width : 100, height : 100, borderRadius : 50, opacity : 0.3}}></div>
                            <div className='text2' style={{marginLeft : 10}}>Từ 1000-1,000,000</div>
                          </Col>
                          <Col md={12} style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                            <div style={{backgroundColor : 'red', marginLeft : 10, marginTop : 10 , width : 80, height : 80, borderRadius : 40, opacity : 0.3}}></div>
                            <div className='text2' style={{marginLeft : 10}}>Từ 100-1000</div>
                          </Col>
                          <Col md={12} style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                            <div style={{backgroundColor : 'red', marginLeft : 30, marginTop : 10 , width : 40, height : 40, borderRadius : 20, opacity : 0.3}}></div>
                            <div className='text2' style={{marginLeft : 10}}>Từ 10-100</div>
                          </Col>
                          <Col md={12} style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                            <div style={{backgroundColor : 'red', marginLeft : 38, marginTop : 10 , width : 20, height : 20, borderRadius : 10, opacity : 0.3}}></div>
                            <div className='text2' style={{marginLeft : 10}}>Từ 0-10</div>
                          </Col>
                        </Row>
                    </Col>
                  </Row>
                  <ModalEmail
                    show={openModal}
                    onHide={() => setOpenModal(false)}
                  ></ModalEmail>

      </Container>
  );
}

export default App;
