function WeatherCard({
    src,
    temperature,
    feelsLike,
    humidity,
    wind,
    precipitation,
    title,
}) {
    return (
        <div className="card  outline outline-2 outline-black flex items-center flex-row-reverse justify-center  ">
            <div className="px-10 pt-10">
                <img
                    src={src}
                    alt="Weather Icon"
                    className="h-20 w-20 scale-110"
                />
            </div>
            <div className="card-body items-start text-center">
                <h1 className="card-title">{title}</h1>

                <p className="text-lg">
                    The temperature is{" "}
                    <span className="font-semibold">{temperature}</span>
                    &deg;
                </p>
                <p className="text-lg">
                    Feels Like It Is{" "}
                    <span className="font-semibold">{feelsLike}</span>
                </p>
                <p className="text-lg">
                    Wind Speed being{" "}
                    <span className="font-semibold">{wind}</span> km/h
                </p>
                <p className="text-lg">
                    Humidity Levels{" "}
                    <span className="font-semibold">{humidity}</span> %
                </p>
                <p className="text-lg">
                    Precipitation:{" "}
                    <span className="font-semibold">{precipitation}</span> mm
                </p>
            </div>
        </div>
    );
}

export default WeatherCard;
