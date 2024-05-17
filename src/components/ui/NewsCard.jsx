function NewsCard({ img, title, description, link }) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={img} alt="Shoes" loading="lazy" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <a
                        href={link}
                        target="_blank"
                        className="btn btn-primary text-white"
                    >
                        Check Out
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
