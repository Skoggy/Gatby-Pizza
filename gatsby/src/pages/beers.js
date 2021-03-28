import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  display: grid;
  align-items: center;
  font-size: 10px;
  color: black;
`;

export default function BeersPage({ data }) {
  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} in Stock!`} />
      <h2 className="center">
        We have {data.beers.nodes.length} Beers available!
      </h2>
      <BeerGridStyles>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`👶`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`👶`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        price
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;
