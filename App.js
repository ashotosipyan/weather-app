import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesInfo: [],
            selectedCitiesList: [],
            selectedCitiesWeatherInfo: []
        };
        this.apiKey = "4DWrDJFA6e4ZLqNnBedGGlzMUNLAgZAn";
        this.selectingCity = this.selectingCity.bind(this);
        this.getWeatherInfo = this.getWeatherInfo.bind(this);
    }

    componentDidMount() {
        fetch(
            `http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=${this.apiKey}`
        )
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    citiesInfo: result
                });
            });
    }

    selectingCity(e) {
        let cityKey = e.currentTarget.dataset.key;

        let getSelectedObjectIndex = this.state.citiesInfo.findIndex(
            key => key.Key == cityKey
        );

        let removeSelectedItem = [...this.state.citiesInfo];

        removeSelectedItem.splice(getSelectedObjectIndex, 1);

        this.setState({
            citiesInfo: removeSelectedItem
        });

        let selectedCityObject = this.state.citiesInfo[getSelectedObjectIndex];

        this.setState({
            selectedCitiesList: [...this.state.selectedCitiesList, selectedCityObject]
        });
    }

    getWeatherInfo(e){
        let cityKey = e.currentTarget.dataset.key;

        fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${this.apiKey}`
        )
            .then(res => res.json())
            .then(result => {
                console.log('a',result.DailyForecasts);
                console.log('b',this.state.selectedCitiesWeatherInfo);
                this.setState({
                    selectedCitiesWeatherInfo: [...this.state.selectedCitiesWeatherInfo, result.DailyForecasts]
                });
            });   
    }

    render() {
        const { citiesInfo, selectedCitiesList, selectedCitiesWeatherInfo } = this.state;
        
        return (
            <div className="row">
                <div className="col-6">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Choose city
                            <span className="caret" />
                        </button>
                        <div className="dropdown-menu">
                            {citiesInfo.map( (item, i) => (
                                <li key={i}>
                                    <a className="dropdown-item" data-key={item.Key} onClick={this.selectingCity}>
                                        {item.EnglishName}
                                    </a>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="selected-cities row">

                        <div className="col-6" style={{ border: '1px solid #000' }}>
                            {selectedCitiesList.map( (item, i) => (
                                <div className="col" key = {i} style={{ padding: '10px 2px', textAlign: 'center' }}>
                                    <a onClick={this.getWeatherInfo} data-key={item.Key} style={{cursor : 'pointer'}}>
                                        {item.EnglishName}
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="col" style={{ border: '1px solid #000', textAlign: 'center' }}>
                            {selectedCitiesWeatherInfo.map((item,i) => (
                                <div key={i} style={{ padding: '10px 2px' }}>
                                    {item[0].Date}
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}
