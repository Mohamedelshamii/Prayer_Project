/** @format */
import { useEffect, useState } from 'react';
import Prayer from './Components/prayer';
function App() {
    const [prayerTimes, setPrayerTimes] = useState({});
    const [city, setCity] = useState('Cairo');
    const [date, setDate] = useState(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    });

    const Cities = [
        {
            name: 'القاهرة',
            value: 'Cairo',
        },
        {
            name: 'الاسكندرية',
            value: 'Alexandria',
        },
        {
            name: 'الجيزة',
            value: 'Giza',
        },
        {
            name: 'أسوان',
            value: 'Aswan',
        },
        {
            name: 'المنصورة',
            value: 'Mansoura',
        },
    ];

    const convertTo12Hour = (time24) => {
        if (!time24) return '...';
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    useEffect(() => {
        const FetchPrayerTimes = async () => {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city.toLowerCase()}&country=EG`
                );
                const Date_Prayer = await response.json();

                setPrayerTimes(Date_Prayer.data.timings);

                console.log(Date_Prayer);
            } catch (error) {
                console.error(error);
            }
        };
        FetchPrayerTimes();
    }, [city, date]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        // Convert from YYYY-MM-DD to DD-MM-YYYY
        const [year, month, day] = selectedDate.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        setDate(formattedDate);
    };

    return (
        <section>
            <div className="container">
                <div className="top_sec">
                    <div className="city">
                        <h3>المدينة</h3>
                        <select value={city} onChange={(e) => setCity(e.target.value)}>
                            {Cities.map((city) => (
                                <option key={city.value} value={city.value}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="date">
                        <h3>التاريخ</h3>
                        <input
                            type="date"
                            onChange={handleDateChange}
                            value={date.split('-').reverse().join('-')}
                        />
                    </div>
                </div>
                <br />
                <Prayer Name="الفجر" Time={convertTo12Hour(prayerTimes.Fajr)} />
                <Prayer Name="الظهر" Time={convertTo12Hour(prayerTimes.Dhuhr)} />
                <Prayer Name="العصر" Time={convertTo12Hour(prayerTimes.Asr)} />
                <Prayer Name="المغرب" Time={convertTo12Hour(prayerTimes.Maghrib)} />
                <Prayer Name="العشاء" Time={convertTo12Hour(prayerTimes.Isha)} />
            </div>
        </section>
    );
}

export default App;
