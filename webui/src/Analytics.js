import { React } from "react";
import { Link } from "react-router-dom";


function Analytics(){
    return (
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>

            <div className="sticky top-0 z-10 bg-white">
                <nav className="container mx-auto p-6 flex justify-between items-center py-3">
                    <Link to="/" className="text-2xl font-medium bg-gradient-to-br from-slate-900 to-fuchsia-600 bg-clip-text text-transparent">PandemiTracker.</Link>
                    <Link to="/analytics"  className="text-2xl font-medium bg-gradient-to-br from-slate-900 to-fuchsia-600 bg-clip-text text-transparent">Analytics</Link>
                    <div className='flex justify-content-end'>
                    <section className="bg-transparent text-slate-800">

            </section>
                    </div>
                </nav>
            </div>
            </div>
    );
}

export default Analytics;
