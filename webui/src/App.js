import axios from 'axios';

function App() {


      function reportData(town, regionId, casesId, recoveriesId) {
        const region = document.getElementById(regionId).value;
        const newCases = document.getElementById(casesId).value;
        const newRecoveries = document.getElementById(recoveriesId).value;

        const data = {
            townName: town,
            newCases: parseInt(newCases),
            newRecoveries: parseInt(newRecoveries),
            regionName: region
        };
        axios.post('http://localhost:42069/cases', data).then(response => console.log('Data reported:', response.data)).catch(error => console.error('Error reporting data:', error));
    }
      return (
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
    <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>

    <div className="sticky top-0 z-10 bg-white">
        <nav className="container mx-auto p-6 flex justify-between items-center py-3">
            <div className="text-2xl font-medium bg-gradient-to-br from-slate-900 to-fuchsia-600 bg-clip-text text-transparent">PandemiTracker.</div>
        </nav>
    </div>

    <section className="p-16">
        <div className="container mx-auto text-center p-24">
            <h1 className="text-7xl font-light text-gray-800">Monitor the Pandemic in Real-Time</h1>
            <h1 className="text-7xl font-light pb-3 bg-gradient-to-r from-slate-900 to-slate-400 bg-clip-text text-transparent">Stay Ahead with Live Case and Recovery Updates</h1>
            <p className="mt-6 text-gray-600">Pandemi Tracker empowers regions and towns by providing up-to-the-minute insights on new cases and recoveries, helping you make informed decisions.</p>
        </div>
    </section>

    <section className="bg-transparent p-12 text-slate-800">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-light">Track Pandemic Cases in Real-Time</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Windhoek */}
                <div className="border rounded-3xl p-3">
                    <h3 className="text-xl font-light">Town: Windhoek</h3>
                    <p className="mt-4 text-gray-600">Enter region, new cases, and recoveries for Windhoek.</p>
                    <input type="text" id="windhoek-region" className="border px-4 py-2 rounded w-full mt-2" placeholder="Enter region" />
                    <input type="number" id="windhoek-new-cases" className="border px-4 py-2 rounded w-full mt-2" placeholder="New Cases" defaultValue={0} />
                    <input type="number" id="windhoek-recoveries" className="border px-4 py-2 rounded w-full mt-2" placeholder="Recoveries" defaultValue={0} />
                    <button className="mt-4 bg-fuchsia-900 mx-3 text-white px-6 py-2 rounded"
                            onClick={() => reportData('Windhoek', 'windhoek-region', 'windhoek-new-cases', 'windhoek-recoveries')}>Report Data</button>
                </div>

                {/* Swakopmund */}
                <div className="border rounded-3xl p-3">
                    <h3 className="text-xl font-light">Town: Swakopmund</h3>
                    <p className="mt-4 text-gray-600">Enter region, new cases, and recoveries for Swakopmund.</p>
                    <input type="text" id="swakopmund-region" className="border px-4 py-2 rounded w-full mt-2" placeholder="Enter region" />
                    <input type="number" id="swakopmund-new-cases" className="border px-4 py-2 rounded w-full mt-2" placeholder="New Cases" defaultValue={0} />
                    <input type="number" id="swakopmund-recoveries" className="border px-4 py-2 rounded w-full mt-2" placeholder="Recoveries" defaultValue={0} />
                    <button className="mt-4 bg-fuchsia-900 mx-3 text-white px-6 py-2 rounded"
                            onClick={() => reportData('Swakopmund', 'swakopmund-region', 'swakopmund-new-cases', 'swakopmund-recoveries')}>Report Data</button>
                </div>

                {/* Walvis Bay */}
                <div className="border rounded-3xl p-3">
                    <h3 className="text-xl font-light">Town: Walvis Bay</h3>
                    <p className="mt-4 text-gray-600">Enter region, new cases, and recoveries for Walvis Bay.</p>
                    <input type="text" id="walvis-region" className="border px-4 py-2 rounded w-full mt-2" placeholder="Enter region" />
                    <input type="number" id="walvis-new-cases" className="border px-4 py-2 rounded w-full mt-2" placeholder="New Cases" defaultValue={0} />
                    <input type="number" id="walvis-recoveries" className="border px-4 py-2 rounded w-full mt-2" placeholder="Recoveries" defaultValue={0} />
                    <button className="mt-4 bg-fuchsia-900 mx-3 text-white px-6 py-2 rounded"
                            onClick={() => reportData('Walvis Bay', 'walvis-region', 'walvis-new-cases', 'walvis-recoveries')}>Report Data</button>
                </div>
            </div>
        </div>
    </section>

    <footer className="text-slate-800 bg-gray-50/50 py-8">
        <div className="container mx-auto text-center">
            <p>&copy; 2024 PandemiTracker. All Rights Reserved.</p>
            <div className="mt-4"></div>
        </div>
    </footer>
</div>


      );
}


export default App;
