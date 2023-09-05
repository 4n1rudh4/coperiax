import React,{useState,useEffect} from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import {auth} from './firebase';
 function JsonDataDisplay(){
    const [username,setUser]=useState("");
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(user.displayName)
            } else{
                setUser("")
                console.log(user);
            }
        })
    })
    const [price, setPrice] = useState([]);
    const [offset,setOffset] = useState(0);
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    
    const API = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000019220782169bf4ab67fc27b9390fd8a8a&format=json&offset=${offset}`;
    
    const fetchArticles = async (url) => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setPrice(data.records);
            
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchArticles(API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Tog1 =()=>{
        const newoffset1=offset+10;
            setOffset(newoffset1);
            fetchArticles();
    }
    const Tog2 =()=>{
            if (offset>0){
                const newoffset2=offset-10;
                setOffset(newoffset2);
                fetchArticles();
            }
    }
 
    return(
        <div>
        <Header date={date} name={username}/>
        <p className="flex justify-center font-medium text-2xl p-4">Prices of Daily Mandi Sale Prices - {date}</p>
        <div className="text-white bg-white flex gap-3 justify-center p-2">
                <button className="hover:bg-green-200 md:block bg-green-600 p-2 rounded-full" onClick={()=> {Tog2();}}>Previous Page</button>
                <button className="hover:bg-green-200 md:block bg-green-600 p-2 rounded-full" onClick={()=> {Tog1();}}>Next Page</button>
            </div>
        <div className="w-11/12 block m-auto border-4">
        
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>State</th>
                    <th>Commodity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>   
                {console.log(price)}
                {price.map((props)=>{
                    return(
                <tr>
                    <td>{props.state}</td>
                    <td>{props.commodity}</td>
                    <td>₹⟩{props.modal_price}</td>
                </tr>
            )})}
                </tbody>
            </table>
            </div>
             <Footer/>
        </div>
    )
 }
 
 export default JsonDataDisplay;