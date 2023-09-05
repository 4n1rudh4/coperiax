import React from "react";

function news(props){
    return <div className="pt-4 ">
    <div className="text-black bg-slate-200 m-2 h-fit md:w-fit w-fit rounded-3xl  ">
        
        <div><img className="h-25 w-25 rounded" src={props.props.image} alt="img"/></div>
        <div className="text-xl font-medium ">{props.props.title}</div>
        <div>{props.props.description}</div>
        <div className="border-2 text-sm bg-green-300 h-fit w-fit rounded-3xl p-2  hover:bg-green-700 "><a href={props.props.url}>Click Here to read full article</a></div>
        </div>
    </div>
}

export default news;