import React from 'react';
import Card from '../Card/Card';
import CardCenterpiece from '../CardCenterpiece/CardCenterpiece';
import ErrorPage from '../Error/ErrorPage';
import Loading from '../Loading/Loading';
import './CardContainer.css';

const CardContainer = ({data, selection, toggleFavorite, error, loading}) => {

  const cards = data.map( point => {
    return  <Card 
      data={point} 
      key={point.name} 
      toggleFavorite={toggleFavorite} 
    />;
  }) 

  let display;
  let centerpiece;

  if (error) {
    display = <ErrorPage />
  } else if (loading) {
    display = <Loading />
  } else {
    display = cards
    centerpiece = <CardCenterpiece selection={selection} />
  }

  return (
    <div className="card-container">
      {display}
      {centerpiece}
    </div>
  );
}

export default CardContainer;
