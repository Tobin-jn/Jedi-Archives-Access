import React, { Component } from 'react';
import './App.css';
import Crawl from '../Crawl/Crawl';
import Header from '../Header/Header';
import Button from '../Button/Button';
import CardContainer from '../CardContainer/CardContainer';
import fetchCall from '../../helpers/fetchCalls';
import Vehicles from '../../helpers/Vehicles';
import Planets from '../../helpers/Planets';
import People from '../../helpers/People';
import { Route, Switch, NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger'
import ModalButtons from '../ModalButtons/ModalButtons'
import favPlaceholders from '../../placeholders'


class App extends Component {
  constructor() {
    super()

    this.state = {
      ready: false,
      currentSelection: '',
      openingCrawl: {},
      people: [],
      vehicles: [],
      planets: [],
      error: false,
      loading: true,
      fetchCall: fetchCall,
      fetchVehicles: new Vehicles(),
      fetchPeople: new People(),
      fetchPlanets: new Planets(),
      favorites: [],
      hamburger: 'closed',
      buttons: 'hide-buttons',
      login: ''
    };

  }

  componentDidMount() {
    this.crawlCall();
    this.checkStorage();
    this.checkURL();
  }

  checkURL = () => {
    if (window.location.pathname !== '/'
    ) {
      this.setReady();
    }
  }

  setReady = () => {
    if (window.location.pathname === '/people') {
      this.setState({
        ready: true,
        login: '',
        currentSelection: 'people'
      })
    } else if (window.location.pathname === '/planets') {
      this.setState({
        ready: true,
        login: '',
        currentSelection: 'planets'
      })
    } else if (window.location.pathname === '/vehicles') {
      this.setState({
        ready: true,
        login: '',
        currentSelection: 'vehicles'
      })
    } else {
      this.setState({
        ready: true,
        login: ''
      })
    }
  }

  loginWarning = () => {
    this.setState({
      login: 'display-login'
    })
  }

  checkStorage = () => {


    this.setState({
        favorites: JSON.parse(localStorage.getItem('favorites')) || favPlaceholders,
        planets: JSON.parse(localStorage.getItem('planets')) || [],
        vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
        people: JSON.parse(localStorage.getItem('people')) || []
    })
  }

  hamburgerChange = () => {
    if (this.state.hamburger === 'closed') {
      this.setState({
        hamburger: 'deployed',
        buttons: 'deploy-buttons',
        login: ''
      });
    } else {
      this.setState({
        hamburger: 'closed',
        buttons: 'hide-buttons',
        login: ''
      });
    }
  }

  crawlCall = () => {
    if (localStorage.films) {
      this.getFilms();
    } else {
      this.fetchFilms();
    }
  }

  getFilms = () => {
    const films = JSON.parse(localStorage.getItem('films'));
    const randomNum = Math.floor(Math.random() * (films.count));
    this.setState({
      openingCrawl: films.results[randomNum], 
      loading: false,
      error: false
    })
  }

  fetchFilms = async () => {
    const url = 'https://swapi.co/api/films/';
    try {
      const films = await this.state.fetchCall(url);

      const randomNum = Math.floor(Math.random() * (films.count))
      this.setState({
        openingCrawl: films.results[randomNum], 
        loading: false,
        error: false
      })
      localStorage.setItem('films', JSON.stringify(films))
    } catch(error) {
      this.setState({ 
        error: true, 
        currentSelection: '' 
      })
    }
  }

  toggleFavorite = (cardData) => {
    this.toggleFavoriteInDatabase(cardData);
      
    let updatedFavorites = this.state.favorites

    if(this.state.favorites.find( fav => cardData.name === fav.name)){
      this.removeFavorite(cardData)
    } else {

      updatedFavorites.pop()
      console.log(updatedFavorites)

      cardData.favorite = true;
      const newFavorites = [cardData, ...updatedFavorites]
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      this.setState({
        favorites: newFavorites,
        planets: JSON.parse(localStorage.getItem('planets')) || [],
        vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
        people: JSON.parse(localStorage.getItem('people')) || []
      })
    }
  }

  toggleFavoriteInDatabase = (cardData) => {
    const library = JSON.parse(localStorage.getItem(cardData.category))
    const target = library.find( card => cardData.name === card.name);
    target.favorite = !target.favorite;
    localStorage.setItem(cardData.category, JSON.stringify(library));
  }

  removeFavorite = (cardData) => {
    const favPlaceholder = {
      name: 'Available Memory',
      info: [],
      favorite: true,
      category: 'favorites'
    }

    const updatedFavorites = this.state.favorites.filter( fav => fav.name !== cardData.name)
    if(updatedFavorites.length < 10) {
      updatedFavorites.push(favPlaceholder)
    } 
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    this.setState({
      favorites: updatedFavorites,
      planets: JSON.parse(localStorage.getItem('planets')) || [],
      vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
      people: JSON.parse(localStorage.getItem('people')) || []
    })
  }
 
  handleSelection = (currentSelection) => {
    if (currentSelection === 'people') {
      this.callFetchPeople();
    } else if (currentSelection === 'vehicles') {
      this.callFetchVehicles();
    } else if (currentSelection === 'planets') {
      this.callFetchPlanets()
    } else if (currentSelection === 'favorites') {
      this.setState({
        currentSelection: 'favorites',
        loading: false,
        error: false
      })
    }
  }

  callFetchVehicles = () => {
    if(localStorage.vehicles){
      this.pullVehicleData();
    } else {
      this.fetchVehicleData();
    }
  }

  pullVehicleData = () => {
    const response = localStorage.getItem('vehicles')
    const vehicles = JSON.parse(response)
    this.setState({
      vehicles: vehicles,
      currentSelection: 'vehicles',
      loading: false,
      error: false
    })    
  }

  fetchVehicleData = async() => {
    await this.setState({ loading: true })

    try {
      const cleanData = await this.state.fetchVehicles.fetchVehicles()
      this.setState({
        vehicles: cleanData,
        currentSelection: 'vehicles',
        loading: false,
        error: false
      })
      localStorage.setItem('vehicles', JSON.stringify(cleanData))
    } catch(error) {
      this.setState({ error: true, currentSelection: '' })
    }
  }

  callFetchPeople = () => {
    if (localStorage.people) {
      this.pullPeopleData();
    } else {
      this.fetchPeopleData();
    }
  }

  pullPeopleData = () => {
    const response = localStorage.getItem('people')
      const people = JSON.parse(response)
      this.setState({
        people: people,
        currentSelection: 'people',
        loading: false,
        error: false
    })
  }

  fetchPeopleData = async () => {
    await this.setState({ loading: true })

    try {
      const cleanedPeople = await this.state.fetchPeople.fetchPeople();
      this.setState({
        people: cleanedPeople,
        currentSelection: 'people',
        loading: false,
        error: false
      })
      localStorage.setItem('people', JSON.stringify(cleanedPeople))
    } catch(error) {
      this.setState({ error: true, currentSelection: '' })
    }
  }

  callFetchPlanets = () => {
    if (localStorage.planets){
      this.pullPlanetData()
    } else {
      this.fetchPlanetData()
    }
  }

  fetchPlanetData = async () => {
    await this.setState({ loading: true })
    try{
      const cleanedPlanets = await this.state.fetchPlanets.fetchPlanets()
      this.setState({
        planets: cleanedPlanets,
        currentSelection: 'planets',
        loading: false,
        error: false
      })
      localStorage.setItem('planets', JSON.stringify(cleanedPlanets))
    } catch(error) {
      this.setState({ error: true })
    }
  }

  pullPlanetData = () => {
    const response = localStorage.getItem('planets')
    const planets = JSON.parse(response)
    this.setState({
      planets: planets,
      currentSelection: 'planets',
      loading: false,
      error: false
    })
  }

  render() {
    return (
      <div className='App'>
        <div className="button-section">
          <header>
            <Hamburger 
              hamburgerChange={this.hamburgerChange}
              loginWarning={this.loginWarning}
              ready={this.state.ready}
            />
            <section className='modal-wrapper'>
              <ModalButtons 
                hamburger={this.state.hamburger}
                currentSelection={this.state.currentSelection}
                handleSelection={this.handleSelection}
              />
            </section>
            <h4 className={`please-login ${this.state.login}`}>Please login to access the archives</h4>
            <section className={`button-wrapper ${this.state.buttons}`}>
              <NavLink 
                to='/people' 
                className='nav-button people' 
              >
                <Button 
                  currentSelection={this.state.currentSelection}
                  buttonName='people'
                  handleSelection={this.handleSelection}
                />
              </NavLink>
              <NavLink 
                to='/planets' 
                className='nav-button planets' 
              >
                <Button 
                  currentSelection={this.state.currentSelection}
                  buttonName='planets'
                  handleSelection={this.handleSelection}
                />
              </NavLink>
              <NavLink 
                to='/vehicles' 
                className='nav-button vehicles' 
              >
                <Button 
                  currentSelection={this.state.currentSelection}
                  buttonName='vehicles'
                  handleSelection={this.handleSelection}
                />
              </NavLink>
              <NavLink 
                to='/favorites' 
                className='nav-button favorites' 
              >
                <Button 
                  currentSelection={this.state.currentSelection}
                  buttonName='favorites'
                  handleSelection={this.handleSelection}
                />
              </NavLink>
            </section>
          </header>
        </div>

        <Switch>
          <Route exact path='/' render={() => (
            <Crawl 
              film={this.state.openingCrawl}
              setReady={this.setReady}
              error={this.state.error}
            />
          )} />

          <Route exact path='/people' render={() => (
            <CardContainer 
              data={this.state.people} 
              selection={this.state.currentSelection}
              toggleFavorite={this.toggleFavorite}
              error={this.state.error}
              loading={this.state.loading}
            />
          )} />

          <Route exact path='/planets' render={() => (
            <CardContainer 
              data={this.state.planets} 
              selection={this.state.currentSelection}
              toggleFavorite={this.toggleFavorite}
              error={this.state.error}
              loading={this.state.loading}
            />
          )} />

          <Route exact path='/vehicles' render={() => (
            <CardContainer 
              data={this.state.vehicles} 
              selection={this.state.currentSelection}
              toggleFavorite={this.toggleFavorite}
              error={this.state.error}
              loading={this.state.loading}
            />
          )} />

          <Route exact path='/favorites' render={() => (
            <CardContainer 
              data={this.state.favorites} 
              selection={this.state.currentSelection}
              toggleFavorite={this.toggleFavorite}
              error={this.state.error}
              loading={this.state.loading} 
            />
          )} />
        
        </Switch>
      </div>
    )
          // <Route component={404} />
  }
}

export default App;


