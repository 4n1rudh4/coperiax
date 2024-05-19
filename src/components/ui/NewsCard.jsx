function NewsCard({ img, title, description, link }) {
    return (
        <div className="card outline outline-2 outline-black">
            <figure>
                <img src={img} alt="Shoes" loading="lazy" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <a href={link} target="_blank" className="btn ">
                        Check Out
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
