import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedTown, setSelectedTown] = useState('');
    const [patientId, setPatientId] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientGender, setPatientGender] = useState('male'); // Radio button for gender
    const [caseOrRecovery, setCaseOrRecovery] = useState('newCase'); // Radio button for cases/recoveries
    const [simulationRunning, setSimulationRunning] = useState(false); // Track simulation state
    const [intervalId, setIntervalId] = useState(null); // Store interval ID
    const regions = {
        'Erongo': ['Swakopmund', 'Walvis Bay', 'Henties Bay', 'Usakos', 'Omaruru', 'Karibib'],
        'Hardap': ['Mariental', 'Rehoboth', 'Maltahöhe', 'Gibeon', 'Aranos'],
        '//Karas': ['Keetmanshoop', 'Lüderitz', 'Karasburg', 'Oranjemund'],
        'Kavango East': ['Rundu', 'Divundu'],
        'Kavango West': ['Nkurenkuru'],
        'Khomas': ['Windhoek', 'Okahandja'],
        'Kunene': ['Opuwo', 'Kamanjab', 'Khorixas', 'Outjo'],
        'Ohangwena': ['Eenhana', 'Helao Nafidi', 'Ongenga', 'Okongo'],
        'Omaheke': ['Gobabis', 'Leonardville', 'Aminuis', 'Otjinene'],
        'Omusati': ['Outapi', 'Oshikuku', 'Ruacana', 'Tsandi'],
        'Oshana': ['Oshakati', 'Ongwediva', 'Ondangwa'],
        'Oshikoto': ['Omuthiya', 'Tsumeb', 'Onayena'],
        'Otjozondjupa': ['Otjiwarongo', 'Grootfontein', 'Okahandja', 'Okakarara'],
        'Zambezi': ['Katima Mulilo', 'Bukalo'],
    };


    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setSelectedTown(''); // Reset town when region changes
    };

    const handleTownChange = (event) => {
        setSelectedTown(event.target.value);
    };

    const handleRadioChange = (event) => {
        setCaseOrRecovery(event.target.value);
    };

    const handleGenderChange = (event) => {
        setPatientGender(event.target.value);
    };

    const generateDummyData = () => {
        const towns = Object.values(regions).flat(); // Get all towns from the regions
        const genders = ['male', 'female'];

        // Generate a random town name first
        const randomTown = towns[Math.floor(Math.random() * towns.length)];
        const randomRegion = Object.keys(regions).find(region =>regions[region].includes(randomTown)); // Get region based on town

        const newRecord = {
            townName: randomTown,
            regionName: randomRegion,
            patientId: `P${Math.floor(Math.random() * 10000)}`, // Random patient ID
            age: Math.floor(Math.random() * 100), // Random age between 0 and 99
            gender: genders[Math.floor(Math.random() * genders.length)],
            newCases: Math.random() < 0.5 ? 1 : 0, // Random new case
            newRecoveries: Math.random() < 0.5 ? 1 : 0, // Random new recovery
        };

        return newRecord;
    };

    const simulateDataTraffic = () => {
        const id = setInterval(() => {
            const dummyData = generateDummyData();
            sendDataToServer(dummyData);
        }, 1); // Sends data every 5 seconds
        setIntervalId(id); // Store the interval ID
    };

    // Function to send data to your backend
    const sendDataToServer = (data) => {
        axios.post('http://localhost:42069/cases', data)
            .then(response => {
                console.log('Dummy data sent:', response.data);
            })
            .catch(error => console.error('Error sending dummy data:', error));
    };

    // Start simulation when button is clicked
    const startSimulation = () => {
        setSimulationRunning(true);
        simulateDataTraffic();
    };

    // Function to stop the simulation
    const stopSimulation = () => {
        clearInterval(intervalId); // Clear the interval
        setSimulationRunning(false); // Update state to indicate simulation is stopped
    };

    // Using useEffect to cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId); // Clear interval if running
            }
        };
    }, [intervalId]);

    const reportData = () => {
        const data = {
            townName: selectedTown,
            regionName: selectedRegion,
            patientId: patientId,
            age: parseInt(patientAge, 10),  // Convert patientAge to an integer
            gender: patientGender,
            newCases: caseOrRecovery === 'newCase' ? 1 : 0,
            newRecoveries: caseOrRecovery === 'recovery' ? 1 : 0,
        };


        axios.post('http://localhost:42069/cases', data)
            .then(response => console.log('Data reported:', response.data))
            .catch(error => console.error('Error reporting data:', error));

        setModalOpen(false); // Close modal after reporting
    };

    return (
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>

            <div className="sticky top-0 z-10 bg-white">
                <nav className="container mx-auto p-6 flex justify-between items-center py-3">
                    <Link to="/" className="text-2xl font-medium bg-gradient-to-br from-slate-900 to-fuchsia-600 bg-clip-text text-transparent">PandemiTracker.</Link>

                    <div className='flex justify-content-end'>
                    <section className="bg-transparent text-slate-800">
                <div className="container mx-auto text-center bg-gray-200 rounded-3xl shadow-md p-4 border">
                    <Link to="/analytics"  className="text-sm font-medium mr-2 p-3 hover:bg-gray-100 rounded-xl ">Analytics</Link>
                    <button className=" bg-slate-800 font-xs text-white px-3 py-2 rounded-xl hover:bg-slate-700 transition ease-in-out delay-100"
                        onClick={startSimulation} disabled={simulationRunning}>
                        {simulationRunning ? 'Simulation Running...' : 'Start Data Simulation'}
                    </button>
                    <button className="bg-red-600 font-xs text-white ml-2 px-2 py-2 rounded-xl hover:bg-red-500"
                        onClick={stopSimulation} disabled={!simulationRunning}>
                        Stop Simulation
                    </button>
                </div>
            </section>
                    </div>
                </nav>
            </div>

            <section className="pt-1">
                <div className="container mx-auto text-center p-24">
                    <h1 className="text-7xl font-light text-gray-800">Monitor the Pandemic in Real-Time</h1>
                    <h1 className="text-7xl font-light pb-3 bg-gradient-to-r from-slate-900 to-slate-400 bg-clip-text text-transparent">Stay Ahead with Live Case and Recovery Updates</h1>
                    <p className="mt-6 text-gray-600">Pandemi Tracker empowers regions and towns by providing up-to-the-minute insights on new cases and recoveries, helping you make informed decisions.</p>
                </div>
                <section className="bg-transparent p-3 pb-12 text-slate-800">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-light">Track Pandemic Cases in Real-Time</h2>
                    <button className="mt-4 bg-fuchsia-900 text-white px-6 py-2 rounded-xl hover:fuchsia-800"
                        onClick={() => setModalOpen(true)}>Report Data</button>
                </div>
            </section>
            </section>



            {modalOpen && (
                <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center modal-enter modal-enter-active`}>
                        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-light mb-4">Report New Cases or Recoveries</h3>

                        {/* Patient Fields */}
                        <label className="block text-left">Patient Name</label>
                        <input type="text" className="border px-4 py-2 rounded-xl w-full mt-2" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Enter Patient ID" />

                        <label className="block text-left mt-4">Patient Age</label>
                        <input type="number" className="border px-4 py-2 rounded-xl w-full mt-2" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="Enter Patient Age" />

                        {/* Gender Radio Buttons */}
                        <label className="block text-left mt-4">Gender</label>
                        <div className="mt-2">
                            <input type="radio" id="male" name="gender" value="male" checked={patientGender === 'male'} onChange={handleGenderChange} />
                            <label htmlFor="male" className="ml-2">Male</label>

                            <input type="radio" id="female" name="gender" value="female" checked={patientGender === 'female'} onChange={handleGenderChange} className="ml-4" />
                            <label htmlFor="female" className="ml-2">Female</label>
                        </div>

                        {/* Region and Town Fields */}
                        <label className="block text-left mt-4">Select Region</label>
                        <select className="border px-4 py-2 rounded-xl w-full mt-2" value={selectedRegion} onChange={handleRegionChange}>
                            <option value="">-- Select Region --</option>
                            {Object.keys(regions).map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>

                        {selectedRegion && (
                            <>
                                <label className="block text-left mt-4">Select Town</label>
                                <select className="border px-4 py-2 rounded-xl w-full mt-2" value={selectedTown} onChange={handleTownChange}>
                                    <option value="">-- Select Town --</option>
                                    {regions[selectedRegion].map((town) => (
                                        <option key={town} value={town}>{town}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        {/* Radio Buttons for New Cases or Recoveries */}
                        <label className="block text-left mt-4">Report Type</label>
                        <div className="mt-2">
                            <input type="radio" id="newCase" name="caseOrRecovery" value="newCase" checked={caseOrRecovery === 'newCase'} onChange={handleRadioChange} />
                            <label htmlFor="newCase" className="ml-2">New Case</label>

                            <input type="radio" id="recovery" name="caseOrRecovery" value="recovery" checked={caseOrRecovery === 'recovery'} onChange={handleRadioChange} className="ml-4" />
                            <label htmlFor="recovery" className="ml-2">Recovery</label>
                        </div>

                        <button className="mt-4 bg-fuchsia-900 text-white px-6 py-2 rounded-xl w-full" onClick={reportData}>Submit</button>
                        <button className="mt-2 text-gray-600 underline" onClick={() => setModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <footer className="text-slate-800 bg-gray-50/50 py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 PandemiTracker. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
