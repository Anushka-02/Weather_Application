import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

const Forecast = ({title, items}) =>{

    return(
        <>
            <div className="flex item-center justify-start my-6">
                <p className="text-white font-medium uppercase">
                    {title}
                </p>
            </div>
            <hr className="my-2"/>
            <div className="flex flex-row items-center justify-between text-white">
                {
                    items.map((item)=>(

                        <div className="flex flex-col items-center justify-center" key={ item.title}>
                            <p className="font-light text-sm">
                                {item.title}
                            </p>
                            <img src={iconUrlFromCode(item.icon)} alt="" 
                                className="w-12 my-1 "/>
                            <p className="font-medium ">
                                {`${item.temp.toFixed()}°`}
                            </p>
                        </div>
                    ))
                }
                
            </div>
        </>
    )
}

export default Forecast;