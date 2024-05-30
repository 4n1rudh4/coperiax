function Loader() {
    return (
        <div className="bg-[#dde7c7] bg-opacity-80 absolute z-10">
            <div className="flex justify-center items-center h-screen w-screen">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        </div>
    );
}

export default Loader;