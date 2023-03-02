import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Modal ,Badge} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const limit = 20;

function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  function fetchPokemonList() {
    setLoading(true);
    fetch(`${baseUrl}?offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList((pokemonList) => [...pokemonList, ...data.results]);
        setLoading(false);
      });
  }

  function handlePokemonClick(pokemon) {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon(data);
        setShowModal(true);
      });
  }

  function handleLoadMoreClick() {
    setOffset((offset) => offset + limit);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  function getPokemonIdFromUrl(url) {
    const matches = url.match(/\/(\d+)\/$/);
    return matches[1];
  }
  return (
    <div className="container">
      <h1 className="text-center mb-4 mt-4">
      <Badge bg="dark">
      Pokemon List
      </Badge>
      </h1>
      <hr></hr>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-3">
        {pokemonList.map((pokemon) => (
          <Col key={uuidv4()}>
            <Card
              className="shadow-lg p-3 mb-5 bg-white rounded"
              style={{ cursor: "pointer" }}
              onClick={() => handlePokemonClick(pokemon)}
            >
              <Card.Img
                variant="top"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(
                  pokemon.url
                )}.png`}
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title className="text-capitalize" as={"h4"}>{pokemon.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
        
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        {selectedPokemon && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-capitalize">{selectedPokemon.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                alt={selectedPokemon.name}
                style={{ width: "180px", height: "180px" }}
              />
              <div>
                <b>Height: </b>
                {selectedPokemon.height}
              </div>
              <div>
                <b>Weight: </b>
                {selectedPokemon.weight}
              </div>
              <div>
                <b>Abilities: </b>
                {selectedPokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {pokemonList.length % limit === 0 && (
        <div className="text-center mt-4">
          <Button size="lg" variant="dark" onClick={handleLoadMoreClick}>Load More</Button>
        </div>
      )}
    </div>
  );
}

export default List;
