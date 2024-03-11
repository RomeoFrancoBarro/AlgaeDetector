import './script_for_date_and_time'
import React, { useState, useEffect } from 'react';
import Logo from '../assets/Picture1.png';
import Pic1 from '../assets/1.png';
import Pic2 from '../assets/2.png';
import StartFirebase from '../firebase';
import { ref, onValue } from "firebase/database";

const db = StartFirebase();

function MonitoringSystem() {
    const [showWelcome, setShowWelcome] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showInformation, setShowInformation] = useState(false);
    const [bubbles, setBubbles] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [displayCount, setDisplayCount] = useState(10);
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(!showMore);
        if (!showMore) {
            setDisplayCount(tableData.length);
        } else {
            setDisplayCount(10);
        }
    };

    const fetchData = () => {
        const dbRef = ref(db, 'Readings');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.keys(data).map(key => ({ key, ...data[key] }));
                setTableData(dataArray);
            }
        });
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();

        // Set interval to fetch data every 3 seconds
        const interval = setInterval(fetchData, 3000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Create bubbles
        const newBubbles = [];
        for (let i = 0; i < 50; i++) {
            const bubble = {
                id: i,
                left: Math.random() * 200 + '%',
                animationDuration: Math.random() * 40 + 2 + 's',
                size: Math.random() * 10 + 5 + 'px'
            };
            newBubbles.push(bubble);
        }
        setBubbles(newBubbles);

        // Clean up on component unmount
        return () => setBubbles([]);
    }, []);

    const showTable = (tableId) => {
        setShowData(tableId === 'collected-data');
        setShowInformation(tableId === 'information');
        setShowWelcome(false);
    };

    const showWelcomeSection = () => {
        setShowData(false);
        setShowInformation(false);
        setShowWelcome(true);
    };

    return (
        <div className='bodyBG'>
            <header>
                <h1>MONITORING SYSTEM FOR ALGAE BLOOM</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={Logo} alt="Device Logo" width="150" height="150" />
                </div>
            </header>

            <div className="center">
                <button onClick={showWelcomeSection}>Home</button>
                <button onClick={() => showTable('collected-data')}>Collected Data</button>
                <button onClick={() => showTable('information')}>Information</button>
            </div>

            <div className="container">
                <span id="days">Mon</span>
                <span>,</span>
                <span id="hours">00</span>
                <span>:</span>
                <span id="minutes">00</span>
                <span>:</span>
                <span id="seconds">00</span>
                <span id="session">AM</span>
            </div>

            {showData && (
                <div id="collected-data">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Temperature(°C)</th>
                                <th>PH Value</th>
                                <th>Turbidity(NTU)</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.slice().reverse().slice(0, displayCount).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.key.split(";")[0]}</td>
                                    <td>{item.key.split(";")[1]}</td>
                                    <td>{item.temperature}</td>
                                    <td>{item.ph}</td>
                                    <td>{item.ntu}</td>
                                    <td>{item.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'center' }}>
                        {tableData.length > 10 && (
                            <button onClick={handleShowMore}>
                                {showMore ? "See Less" : "See More"}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showInformation && (
                <div id="information">
                    <h2>Information</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Result</th>
                                <th>Recommendation</th>
                                <th>Implication</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>HIGH</td>
                                <td>Do not consume/harvest fish resources on the lake.</td>
                                <td>Conditions are highly conducive to algae bloom, which might affect water quality and fish health. Consuming or harvesting fish during this time could pose risks.</td>
                            </tr>
                            <tr>
                                <td>MODERATE</td>
                                <td>Be careful when consuming/harvesting fish resources on the lake.</td>
                                <td>While conditions are not as severe as in the "HIGH" category, there is still a moderate risk of algae bloom growth. Caution is advised when considering the consumption or harvesting of fish resources.</td>
                            </tr>
                            <tr>
                                <td>LOW</td>
                                <td>It is safe to consume/harvest fish resources on the lake.</td>
                                <td>Conditions are less favorable for algae bloom growth, and it is considered safe to consume or harvest fish resources. Water quality is likely to be better during this period.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {showWelcome && (
                <div id="welcome-section" className="center">
                    <h2 className="animate__animated animate__bounce">Welcome!</h2>
                    <p>This website is created by the researchers from the University of Rizal System - Morong Campus.</p>
                    
                    <img src={Pic1} alt="device picture" width="520" height="400"/>
                    <img src={Pic2} alt="device picture" width="520" height="400"/>
                </div>
            )}

            <div id="bubbles">
                {bubbles.map(bubble => (
                    <div key={bubble.id} className="bubble" style={{ left: bubble.left, animationDuration: bubble.animationDuration, width: bubble.size, height: bubble.size }}></div>
                ))}
            </div>
        </div>
    );
}

export default MonitoringSystem;
