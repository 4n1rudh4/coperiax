function Card({ src, details, title }) {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl group ">
            <figure className="w-1/3 overflow-hidden">
                <img
                    src={src}
                    alt="Album"
                    className="h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
            </figure>
            <div className="card-body w-2/3">
                <h2 className="card-title">{title}</h2>
                <p>{details}</p>
                <div className="card-actions justify-end tracking-wider">
                    <button className="btn btn-primary">View</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
