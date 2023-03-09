import React,{useState,useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import{
//     getLogMsgOccurenceWRTDate
// }from '../../store/action/LogsAction';
import {getLogMsgOccurence,getDeviceCrashAnalytics} from '../../store/action/DeviceAction'
import AnalyticeIcon from '../../assets/icons/analyticIcon.png';
import Style from '../../css/Analytics.module.css';
import SideBar from '../../utils/Sidebar';
import { Navbar } from '../../utils/NavBar';
import { faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';
export default function analytics(){

const [title, setTitle] = useState('');
const [subTitle, setSubTitle] = useState('');
var titleVal, subTitleVal;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const did = urlParams.get('DeviceId');
  const logMsg = urlParams.get('logMsg')

  const projectName = urlParams.get('name');
  let stackArray = urlParams.get('col') || '';
  console.log('stackArray',stackArray)

  let newStack = stackArray.split('at') && stackArray.split(')');
  console.log('newArray',newStack)

  console.log("stack array", stackArray);
    const sidebar_details = {
        name: projectName,
        dashName: projectName,
        link1: {
          iconName: AnalyticeIcon,
          linkName: 'Analytics',
          link: ``,
        },
        link2: {
          iconName: `./assets/icons/settings.png`,
          linkName: 'Settings',
          link: `/settings?code=${code}&name=${projectName}`,
        },
        link3: {
          iconName: `./assets/icons/settings.png`,
          linkName: 'Settings',
          link: `/alarm?code=${code}&name=${projectName}`,
        },
      };
      const navigation_details = {
        name: projectName,
        dashName: projectName,
        link1: {
          iconName: faChartLine,
          linkName: 'Analytics',
        },
        link2: {
          iconName: faCog,
          linkName: 'Settings',
        },
      };

      let mapArrayKey = newStack.map((val, index) => {
        return val;
      });

      const stackLine = () =>{
        var causedError, noCausedError;

        if(mapArrayKey.length == 1){
            setTitle(mapArrayKey[0]);
            setSubTitle('');
            subTitleVal='';
        }else{
            for(let key in mapArrayKey){
                if(mapArrayKey[key].includes('Caused by:')){
                    causedError = mapArrayKey[parseInt(key) + 1];
                    setTitle(
                        causedError.split('(')[1].replace(':',' line ').split(')')[0]
                    );
                    titleVal = causedError.split('(')[1].replace(':',' line ').split(')')[0];
                    setSubTitle(causedError);
                    subTitleVal = causedError;
                }
                console.log('title',titleVal,subTitleVal)
            }
            if (!stackArray.includes('Caused by:')) {
                noCausedError =
                  mapArrayKey[1].split('(')[1].replace(':', ' ').split(')')[0] &&
                  mapArrayKey[1].split('(')[1].replace(':', ' ').replace(' ', ' line ');
                setTitle(noCausedError);
                titleVal = noCausedError;
                setSubTitle(mapArrayKey[1].concat(')'));
                subTitleVal = mapArrayKey[1].concat(')');
        
                // console.log("values", titleVal, subTitleVal);
              }
        }
      };
      const getLogMsgOccurenceReducer = useSelector(
        (state) =>state.getLogMsgOccurenceReducer
      );
      const {loading,data} = getLogMsgOccurenceReducer;
      console.log('data',getLogMsgOccurenceReducer);
      let users = data && data.response ? data.response.length : 0;
      let totalCount = 0;
         //Data Count to be added
      const dispatch = useDispatch();

     
  const dispatchmultiple = () => {
    console.log('subTitleVal', code);
    dispatch(
        getLogMsgOccurence(
        did,
        logMsg,
        subTitleVal ? subTitleVal.replace(' at ', '') : titleVal,
      )
    );

    dispatch(
        getDeviceCrashAnalytics(
        did,
        logMsg,
        subTitleVal ? subTitleVal.replace(' at ', '') : titleVal,
      )
    );
    // dispatch(
    //   getLogMsgOccurenceWRTDate({
    //     did,
    //     logMsg: subTitleVal ? subTitleVal.replace(' at ', '') : titleVal,
    //   })
    // );
  };
  useEffect(() => {
    stackLine();
  }, []);

  useEffect(() => {
    dispatchmultiple();
  }, []);
return(
    <>
    <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
            <SideBar sidebar_details={sidebar_details}/>
        </Col>
        <Col xl={10} lg={10} md={10} sm={10} className='colSection'>
            <Navbar navigation_details={navigation_details}/>
            <Container className={`${Style.mainContainer} container`}>
                <Col>
                <h2
                className='darkModeColor'
                style={{
                    fontweight:'600',
                }}
                >
                    {title}
                </h2>
                <p
                className="darkModeColor"
                style={{
                  fontWeight: '600',
                }}
              >
                {subTitle}
              </p>
                </Col>
                <Col className="my-4">
                    {loading ? (
                        'Loading'
                    ):(
                        <p className={`${Style.paraTextIssue} darkModeColor`}>
                            This issue has{' '}
                            <strong style={{color:'#0099a4'}}>
                                {totalCount} crashes
                            </strong> {' '}
                            events affecting
                            <strong style={{color:'#0099a4'}}> {users} users</strong>
                        </p>
                    )}
                    {stackArray}
                </Col>
            </Container>
        </Col>
    </Row>
    </>
)
}