import React, { useEffect, useRef, useState } from "react";
import Axios from "axios"

function Display() {
    let totalClicks = 0;
    let totalRequests = 0;
    let totalResponses = 0;
    let totalRevenues = 0;
    let totalImpressions = 0;
    let totalFillRate = 0;
    let totalCTR = 0;

    const [data, setData] = useState([])
    const [app, setApp] = useState([])
    const [display, setDisplay] = useState([])
    const [selected, setSelected] = useState(['Date', 'App', 'Clicks', 'Ad Requests', 'Ad Response', 'Impressions', 'Revenue'])
    const [temp, setTemp] = useState([])

    const [bolClick, setBolClick] = useState(false)
    const [bolRequest, setBolRequest] = useState(false)
    const [bolResponse, setBolResponse] = useState(false)
    const [bolRevenue, setBolRevenue] = useState(false)
    const [bolImpressions, setBolImpressions] = useState(false)
    const [bolApp, setBolApp] = useState(false)
    const [bolDate, setBolDate] = useState(false)

    const [called, setCalled] = useState(false)
    const dragItem = useRef()
    const dragOverItem = useRef()
    const [rangeClick, setRangeClick] = useState(0);
    const [rangeDate, setRangeDate] = useState(0);
    const [rangeRequest, setRangeRequest] = useState(0);
    const [rangeResponse, setRangeResponse] = useState(0);
    const [rangeRevenue, setRangeRevenue] = useState(0);
    const [rangeImpression, setRangeImpression] = useState(0);
    const [maxClicks, setMaxClicks] = useState(Infinity);
    const [maxRequests, setMaxRequests] = useState(Infinity);
    const [maxResponses, setMaxResponses] = useState(Infinity);
    const [maxRevenues, setMaxRevenues] = useState(Infinity);
    const [maxImpressions, setMaxImpressions] = useState(Infinity);
    const [maxDate, setMaxDate] = useState(Infinity)
  
    const [minClicks, setMinClicks] = useState(Infinity);
    const [minRequests, setMinRequests] = useState(Infinity);
    const [minResponses, setMinResponses] = useState(Infinity);
    const [minRevenues, setMinRevenues] = useState(Infinity);
    const [minImpressions, setMinImpressions] = useState(Infinity);

    const [bolSetting, setBolSetting] = useState(false)


    function settings() {
        setDisplay(['Date', 'App', 'Clicks', 'Ad Requests', 'Ad Response', 'Impressions', 'Revenue', 'Fill Rate', 'CTR'])
        setBolSetting(true)
    }

    function close(){
        setBolSetting(false)
    }

    function table(event) {
        const value = selected.filter(m => m === event.target.value)
        if (value[0] === undefined) {
            setSelected(selected => [...selected, event.target.value])
        } else {
            console.log(selected.filter(selected => selected !== value[0]))
            setSelected(selected.filter(selected => selected !== value[0]))
        }
    }


    useEffect(() => {
        Axios.get("http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03").then(
            (res) => {
                setData(res.data.data)
                setCalled(true)
            }
        )
        Axios.get("http://go-dev.greedygame.com/v3/dummy/apps").then(
            (res) => {
                setApp(res.data.data)
            }
        )
    }, [])

    function formatNumber(num) {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(3) + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(3) + 'K';
        }
        return num.toFixed(2);
      }
      
    
    for (let i = 0; i < temp.length; i++) {
      totalClicks += temp[i].clicks;
      totalRequests += temp[i].requests;
      totalResponses += temp[i].responses;
      totalRevenues += temp[i].revenue;
      totalImpressions += temp[i].impressions;
      totalFillRate += (temp[i].requests/temp[i].responses*100)/temp.length
      totalCTR += (temp[i].clicks/temp[i].impressions*100)/temp.length
    }

    let formatClick = formatNumber(totalClicks)
    let formatRequest = formatNumber(totalRequests)
    let formatResponse = formatNumber(totalResponses)
    let formatRevenue = formatNumber(totalRevenues)
    let formatImpressions = formatNumber(totalImpressions)
    let formatFillRate = formatNumber(totalFillRate)
    let formatCTR = formatNumber(totalCTR)

    
  
    useEffect(() => {
      const newMaxClicks = Math.max(...data.map(m => m.clicks));
      const newMaxRequests = Math.max(...data.map(m => m.requests));
      const newMaxResponses = Math.max(...data.map(m => m.responses));
      const newMaxRevenues = Math.max(...data.map(m => m.revenue));
      const newMaxImpressions = Math.max(...data.map(m => m.impressions));
      const newMaxDate = data.length 

      const newMinClicks = Math.min(...data.map(m => m.clicks));
      const newMinRequests = Math.min(...data.map(m => m.requests));
      const newMinResponses = Math.min(...data.map(m => m.responses));
      const newMinRevenues = Math.min(...data.map(m => m.revenue));
      const newMinImpressions = Math.min(...data.map(m => m.impressions));
  
      setMaxClicks(newMaxClicks);
      setMaxRequests(newMaxRequests);
      setMaxResponses(newMaxResponses);
      setMaxRevenues(newMaxRevenues);
      setMaxImpressions(newMaxImpressions);
      setMaxDate(newMaxDate)
  
      setMinClicks(newMinClicks);
      setMinRequests(newMinRequests);
      setMinResponses(newMinResponses);
      setMinRevenues(newMinRevenues);
      setMinImpressions(newMinImpressions);
    }, [called]);


    const [finalClick, setFinalClick] = useState(maxClicks)
    const [finalDate, setFinalDate] = useState(maxDate)
    const [finalRequest, setFinalRequest] = useState(maxRequests)
    const [finalRevenue, setFinalRevenue] =useState(maxRevenues)
    const [finalImpression, setFinalImpression] =useState(maxImpressions)
    const [finalResponse, setFinalResponse] = useState(maxResponses)
    const [finalApp, setFinalApp] = useState("")
    const [appName, setAppName] = useState("")


    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.value);
    }
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.value);
    }
    const drop = (e) => {
        const copyListItems = [...display];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setDisplay(copyListItems);
    };


    function filters(event){
        if(event.currentTarget.dataset.name==='Date'){
            if(bolDate){
                setBolDate(false)
            }else{
                setBolDate(true)                
            }
        }if(event.currentTarget.dataset.name==='Clicks'){
            if(bolClick){
                setBolClick(false)
            }else{
                setBolClick(true)                
            }
        }if(event.currentTarget.dataset.name==='Ad Requests'){
            if(bolRequest){
                setBolRequest(false)
            }else{
                setBolRequest(true)                
            }
        }if(event.currentTarget.dataset.name==='Ad Response'){
            if(bolResponse){
                setBolResponse(false)
            }else{
                setBolResponse(true)                
            }
        }if(event.currentTarget.dataset.name==='Revenue'){
            if(bolRevenue){
                setBolRevenue(false)
            }else{
                setBolRevenue(true)                
            }
        }if(event.currentTarget.dataset.name==='Impressions'){
            if(bolImpressions){
                setBolImpressions(false)
            }else{
                setBolImpressions(true)                
            }
        }if(event.currentTarget.dataset.name==='App'){
            if(bolApp){
                setBolApp(false)
            }else{
                setBolApp(true)                
            }
        }
    }

    function handleRange(event){
        if(event.target.name==='Date'){
            setRangeDate(event.target.value);
        }
        if(event.target.name==='Clicks'){
            setRangeClick(event.target.value);
        }if(event.target.name==='Ad Requests'){
            setRangeRequest(event.target.value);
        }if(event.target.name==='Ad Response'){
            setRangeResponse(event.target.value);
        }if(event.target.name==='Revenue'){
            setRangeRevenue(event.target.value);
        }if(event.target.name==='Impressions'){
            setRangeImpression(event.target.value);
        }if(event.target.name==='App'){
            setAppName(event.target.value);
        }
    }


    function setfilter(event){
        if(event.target.name==='Date'){
            setFinalDate(rangeDate)
            setBolDate(false)
        }
        if(event.target.name==='Clicks'){
            setFinalClick(rangeClick)
            setBolClick(false)
        }if(event.target.name==='Ad Requests'){
            setFinalRequest(rangeRequest)  
            setBolRequest(false)
        }if(event.target.name==='Ad Response'){
            setFinalResponse(rangeResponse)    
            setBolResponse(false) 
        }if(event.target.name==='Revenue'){
            setFinalRevenue(rangeRevenue)   
            setBolRevenue(false)
        }if(event.target.name==='Impressions'){
            setFinalImpression(rangeImpression)    
            setBolImpressions(false)
        }
    }    


    function setfilterApp() {
        const found = app.find(m => m.app_name === appName);
        if (found) {
          setFinalApp(found.app_id);
        }
    }      
    

    useEffect(() => {
        setTemp(data.filter(m => finalClick>=m.clicks && finalRequest>=m.requests && finalResponse>=m.responses
            && finalRevenue>=m.revenue && finalImpression>=m.impressions))
    },[finalDate, finalApp, finalClick,finalResponse,finalRequest,finalRevenue,finalImpression, maxClicks, maxImpressions, maxRequests, maxResponses, maxRevenues])
    
    return (
        <div>
            <div className="settings-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="#007bff" viewBox="0 0 24 24" stroke-width="1.5" stroke="#007bff" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <button className="btn" onClick={settings}>Settings</button>
            </div>

            {bolSetting?
                <div className="button-container">
                {display.map((m, index) => {
                    const found = selected.find(s => s === m);
                    if (found) {
                        return (
                            <div className="settings">
                                <button draggable onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop}
                                    className="display-data btn selected-button settings-button" key={index} id={index} value={m} onClick={table}
                                >{m}</button>
                            </div>
                        );
                    }
                    return (
                        <div className="settings">
                            <button draggable onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop}
                                className="display-data btn settings-button" key={index} id={index} value={m} onClick={table}
                            >{m}</button>
                        </div>
                        
                    );  
                })}
                {bolSetting?<button className="close-button btn" onClick={close}>Close</button>:""}
            </div>
            :""}
            

            <div className="display-data">
                {display.map(d =>
                    selected.map((s,index) => s === d ? (
                        <div className="row">
                            <h6 className="">{s}</h6>

                            {s==='Date'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{temp.length}</b>
                                    {bolDate?
                                    <div className="filter">
                                        <input min="0" max={data.length} className="range" type="range" name={s} onChange={handleRange} />
                                        <span>{rangeDate}</span>
                                        <button name={s} onClick={setfilter}>Set</button>                                        
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{new Date(m.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>)}
                                </div>:

                            s==="App"?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{temp.length}</b>
                                    {bolApp?
                                    <div className="filter">
                                        <input type="text" onChange={handleRange}/>
                                        <button onClick={setfilterApp}>Set</button>                                        
                                    </div>:""}
                                    {temp.map(m => {
                                        const found = app.filter(ap => ap.app_id === m.app_id)
                                        console.log(found)
                                        return(
                                            <p className="rows">{found.map(f => f.app_name)}</p>
                                        )
                                    })}
                                </div>:                                


                            s==='Clicks'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{formatClick}</b> 
                                    {bolClick?
                                    <div className="filter">
                                        <input min={minClicks} className="range" max={maxClicks} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeClick}</span>
                                        <button name={s} onClick={setfilter}>Set</button>
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{m.clicks}</p>)}
                                </div>:



                            s==='Ad Requests'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{formatRequest}</b> 
                                    {bolRequest?
                                    <div className="filter">
                                        <input min={minRequests} className="range" max={maxRequests} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeRequest}</span>
                                        <button name={s} onClick={setfilter}>Set</button>                                        
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{m.requests}</p>)}
                                </div>:



                            s==='Ad Response'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{formatResponse}</b> 
                                    {bolResponse?
                                    <div className="filter">
                                        <input min={minResponses} className="range" max={maxResponses} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeResponse}</span>
                                        <button name={s} onClick={setfilter}>Set</button>
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{m.responses}</p>)}
                                </div>:



                            s==='Revenue'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">${formatRevenue}</b> 
                                    {bolRevenue?
                                    <div className="filter">
                                        <input min={minRevenues} className="range" max={maxRevenues} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeRevenue}</span>
                                        <button name={s} onClick={setfilter}>Set</button>                                        
                                    </div>:""}
                                    {temp.map(m => <p className="rows">${m.revenue.toFixed(2)}</p>)}
                                </div>:



                            s==='Impressions'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{formatImpressions}</b> 
                                    {bolImpressions?
                                    <div className="filter">
                                        <input min={minImpressions} className="range" max={maxImpressions} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeImpression}</span>
                                        <button name={s} onClick={setfilter}>Set</button>
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{m.impressions}</p>)}
                                </div>: 


                                s==='Fill Rate'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{formatFillRate}%</b> 
                                    {bolImpressions?
                                    <div className="filter">
                                        <input min={minImpressions} className="range" max={maxImpressions} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeImpression}</span>
                                        <button name={s} onClick={setfilter}>Set</button>
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{(m.requests/m.responses*100).toFixed(0)}%</p>)}
                                </div>: 
                                
                                
                                s==='CTR'?
                                <div className="column">
                                    <svg key={index} data-name={s} onClick={filters} xmlns="http://www.w3.org/2000/svg" width="25" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>
                                    <b className="count">{formatCTR}%</b> 
                                    {bolImpressions?
                                    <div className="filter">
                                        <input min={minImpressions} className="range" max={maxImpressions} name={s} type="range" onChange={handleRange} />
                                        <span>{rangeImpression}</span>
                                        <button name={s} onClick={setfilter}>Set</button>
                                    </div>:""}
                                    {temp.map(m => <p className="rows">{(m.clicks/m.impressions*100).toFixed(0)}%</p>)}
                                </div>: null}                          
                
                        </div>
                    ) : null)
                )}
            </div>
        </div>
    )
}

export default Display