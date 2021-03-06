import React, {useEffect, useState} from 'react';
import {
    PieChart, 
    Pie, 
    Cell, 
    LabelList, 
    Legend, 
    ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';




const EventGenre = ({events}) => {
    useEffect(() => {
        setData(getGenresData());
    }, [events]);

    const [data, setData] = useState([]);
    
    const colors = ['#6A8CFA', '#68B54C', '#FA3824', '#ED892B', '#8B69FA'];

    const getGenresData = () => {
        let data = [
            {name: 'jQuery', value: 0},
            {name: 'JavaScript', value: 0},
            {name: 'React', value: 0},
            {name: 'Angular', value: 0},
            {name: 'Node', value: 0}
        ];

        let sum = 0;
        
        // Get number of events for each genre
        events.forEach(({summary}) => {
            summary = summary.toLowerCase();
            for (let i = 0; i < data.length; i++) {
                const genre = data[i].name;
                const value = data[i].value;
                const regex = new RegExp(genre.toLowerCase(), 'g');
                const matches = summary.match(regex);
            
                
                if (matches) {
                    data[i].value = value + matches.length;
                    sum += matches.length;
                }
            }
        });
   
        // Remove genres that have 0 events
        data = data.filter((object) => object.value !== 0);

        // Add percentage property to each object
        data.forEach((object) => {
            const percentage = (object.value / sum) * 100;
            object['percentage'] = percentage.toFixed() + '%';
        });

        return data;
    };

    
    return (
        <div className="chart-container">
            <h3 className="text-center">Events by genre</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart 
                    height={400}
                >
                    <Legend verticalAlign="top" height={30} />
                    <Pie
                        data={data}
                        labelLine={false}
                        outerRadius='90%'
                        dataKey="value"
                    >
                        <LabelList 
                            dataKey="percentage" 
                            position="inside"
                        />
                        {data.map((entry, index) => (
                            <Cell key={index} fill={colors[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

EventGenre.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventGenre;