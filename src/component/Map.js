import React, {useState, useEffect} from 'react';
import ReactMapGL , {Marker,Popup} from 'react-map-gl';
import './../css/mapstyle.css';
import Axios  from 'axios';

function Mapss(props) {
    const Token = 'pk.eyJ1IjoiZGVubmEyNDcxOTk5IiwiYSI6ImNrNmNmd2x3ZDEzdm0zanJ5ZmxpY3dseDAifQ.4vQDLt0E5wV7RNE9IgSKBQ';
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 720,
        latitude: 10.823099,
        longitude: 106.629662,
        zoom: 2
    });

    const [ position ,setPosition] = useState({
        latitude: 10.823099,
        longitude: 106.629662,
    })

    const [showPopup, setShowPopup] = useState(false);
    const [dataPopup,setDataPopup] = useState({})
    const [listData,setListData] = useState([]);

    useEffect(() => {
        const getData = async () => {
           let getData = await Axios.get('https://coronavirusupdatevn.herokuapp.com/api/public/getAllDataCoronaByDate?date=2020-2-7');
            
           setListData(getData.data.data);
        }

        getData()
    },[])

    return (
        <ReactMapGL
        mapStyle={'mapbox://styles/denna2471999/ck6ch44dq3fsr1imr5kbljwhi'}
        mapboxApiAccessToken={Token}
        {...viewport}
        onViewportChange={setViewport}
        >
            {listData.map((value) => {
              
                
                if(value.data.confirmed >= 1000 || value.data.country == 'China' ) {
                    return (<Marker  latitude={value.data.latitude} longitude={value.data.longitude} offsetLeft={-20} offsetTop={-10}>
                       
                        <div onMouseOut={() => {setShowPopup(false)}} onMouseOver={() => {setPosition({latitude : value.data.latitude, longitude : value.data.longitude });
                                setDataPopup({
                                    country :  value.data.country ,
                                    nhiem : value.data.confirmed,
                                    chet :  value.data.deaths ? value.data.deaths : 0  ,
                                    quaKhoi : value.data.recuperate ? value.data.recuperate : 0
                                 })  ; ;setShowPopup(!showPopup)}} style={{backgroundColor : 'red' , width : 200, height : 200, borderRadius : 100, opacity : 0.3}}></div>
                        </Marker>)
                }
                else if(value.data.confirmed >= 100 && value.data.confirmed < 1000) {
                    return (
                        <Marker  latitude={value.data.latitude} longitude={value.data.longitude} offsetLeft={-20} offsetTop={-10}>
                            <div onMouseOut={() => {setShowPopup(false)}}  onMouseOver={() => { 
                                setPosition({latitude : value.data.latitude, longitude : value.data.longitude });
                                 setDataPopup({
                                    country :  value.data.country ,
                                    nhiem : value.data.confirmed,
                                    chet : value.data.deaths ? value.data.deaths : 0 ,
                                    quaKhoi : value.data.recuperate ? value.data.recuperate : 0
                                 })  ;
                                 setShowPopup(true)}} style={{backgroundColor : 'red' , width : 100, height : 100, borderRadius : 50, opacity : 0.3}}></div>

                        </Marker>
                    )
                }
            
                else if(value.data.confirmed >= 10 && value.data.confirmed < 100) {
                    return (
                        <Marker  latitude={value.data.latitude} longitude={value.data.longitude} offsetLeft={-20} offsetTop={-10}>
                            <div onMouseOut={() => {setShowPopup(false)}}  onMouseOver={() => { 
                                setPosition({latitude : value.data.latitude, longitude : value.data.longitude });
                                 setDataPopup({
                                    country :  value.data.country ,
                                    nhiem : value.data.confirmed,
                                    chet : value.data.deaths ? value.data.deaths : 0 ,
                                    quaKhoi : value.data.recuperate ? value.data.recuperate : 0
                                 })  ;
                                 setShowPopup(true)}} style={{backgroundColor : 'red' , width : 50, height : 50, borderRadius : 25, opacity : 0.3}}></div>

                        </Marker>
                    )
                }
                else if(value.data.confirmed > 0 && value.data.confirmed < 10) {
                    return (
                        <Marker  latitude={value.data.latitude} longitude={value.data.longitude} offsetLeft={-20} offsetTop={-10}>
                            <div onMouseOut={() => {setShowPopup(false)}}  onMouseOver={() => { 
                                setPosition({latitude : value.data.latitude, longitude : value.data.longitude });
                                 setDataPopup({
                                    country :  value.data.country ,
                                    nhiem : value.data.confirmed,
                                    chet : value.data.deaths ? value.data.deaths : 0 ,
                                    quaKhoi : value.data.recuperate ? value.data.recuperate : 0
                                 })  ;
                                 setShowPopup(true)}} style={{backgroundColor : 'red' , width : 20, height : 20, borderRadius : 10, opacity : 0.3}}></div>

                        </Marker>
                    )
                }
            })}
             

             {/* <Marker  latitude={35.861660} longitude={104.195396} offsetLeft={-20} offsetTop={-10}>
                <div onClick={() => { setPosition({latitude : 35.861660, longitude : 104.195396 }) ;setShowPopup(true)}} style={{backgroundColor : 'red' , width : 100, height : 100, borderRadius : 50, opacity : 0.3}}></div>
             </Marker>

             <Marker  latitude={1.3} longitude={103.8} offsetLeft={-20} offsetTop={-10}>
                <div onClick={() => { setPosition({latitude : 35.861660, longitude : 104.195396 }) ;setShowPopup(true)}} style={{backgroundColor : 'red' , width : 100, height : 100, borderRadius : 50, opacity : 0.3}}></div>
             </Marker> */}

            {showPopup && <Popup
            latitude={position.latitude} longitude={position.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
            anchor="bottom"
           
            >
            <div style={{display : 'flex', flexDirection : 'column'}}>
                <div className='textMap2'> Quốc gia : {dataPopup.country}  </div>
               <div className='textMap'> Tổng ca nhiễm :  {dataPopup.nhiem}  </div>
               <div className='textMap'> Tử vong :  {dataPopup.chet} </div>
               <div className='textMap'> Bình phục :  {dataPopup.quaKhoi} </div>
            </div>
            </Popup>}
        </ReactMapGL>
    );
}

export default Mapss;