
import React,{useEffect,useState} from "react";
import Header from "./components/header";
import News from "./components/news";
import Footer from "./components/footer";
import {auth} from './firebase';




const App=()=>{
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

    const [news, setNews] = useState([]);

        var today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        const API = `https://gnews.io/api/v4/search?q=agriculture&apikey=f03a5d4039233889a9c9c9a22bc90a88`;

        const fetchArticles = async (url) => {
            try {
                const res = await fetch(API);
                const data = await res.json();
                setNews(data.articles);
                
                
            } catch (e) {
                console.error(e)
            }
        }
    
    
        useEffect(() => {
            fetchArticles(API);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])


    return <>
    
        <Header date={date} name={username}/>
        <div className="flex justify-center font-bold text-2xl pt-4">Top Agriculture News</div>
        <div className="block md:grid md:grid-cols-2">
        {news.map((props)=><News 
        props={props}
        />
    )}</div>
        <Footer/>
    </>
}

export default App;