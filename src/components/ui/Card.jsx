function Card({ src, details, title }) {
    return (
        <div className="card lg:card-side bg-brwn-0 outline outline-2 outline-black group  ">
            <figure className="lg:w-1/3 overflow-hidden">
                <img
                    src={src}
                    alt="Album"
                    className="lg:h-full h-72 w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
            </figure>
            <div className="card-body lg:w-2/3">
                <h2 className="card-title font-cabin">{title}</h2>
                <p className="font-poppins text-base">{details}</p>
                {/* <div className="card-actions justify-end tracking-wider">
                    <button className="btn btn-primary">View</button>
                </div> */}
            </div>
        </div>
    );
}

export default Card;
