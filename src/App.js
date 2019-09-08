import React, { Component } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';



const Styles = styled.div`

h2{
  font-weight:600;
}

.card{
  border:none;
  box-shadow: 0 0 3px #d7c7c7;
  -webkit-transition:  box-shadow .6s ease-out;
     box-shadow: 0 0 3px #d7c7c7;

     &:hover{ 
      box-shadow: 1px 8px 20px #d7c7c7;
     -webkit-transition:  box-shadow .6s ease-in;
   }
}

.news-cards{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
}

.card-body p{
  font-size:12px;
}
.card-text{
  font-size:13px!important;
}
.card-title{
  font-size:18px;
}
.news-cards .card{
  margin-bottom:30px;
  flex: 0 0 50%;
  max-width: 32%;

  @media screen and (max-width: 576px){
    max-width: 100%;
    flex: 0 0 100%;
  }
    
}
.btn-primary{
  background-color: #0e2f51;
  border:1px solid transparent;
  border-radius:0;
  font-size:14px;
  &:hover{
    border:1px solid #0e2f51;
    background-color:#fff;
    color:#0e2f51;
  }
  &:focus,&:visited{
    outline:none;
    box-shadow:none;
  }
}

.parent {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover{
    .child{
      transform: scale(1.1);
    }
  }
}
.child{
  width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: scale(1);
    transform: scale(1);

}
`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }

  }

  componentDidMount() {
    fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=87fbe61b73e148fcb7c7d91399277af4')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        // console.log(JSON.stringify(myJson));
        this.setState({
          articles: myJson.articles
        });
      });
  }
  render() {
    console.log(this.state);
    return (
      <Styles>
        <Container>
          <h2 class="pt-5 pb-5">Todays News</h2>
          <div className="news-cards">

            {this.state.articles.map((items, index) => {
              return (
                <Card>
                  <div className="parent">
                    <div className="child">
                      <Card.Img variant="top" src={items.urlToImage} />
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex">
                      <p>{items.author}</p>
                      <p className="ml-auto">{items.publishedAt}</p>

                    </div>

                    <Card.Title>{items.title}</Card.Title>
                    <Card.Text>
                      {items.content}
                    </Card.Text>
                    <Button variant="primary" href={items.url}>Know More</Button>
                  </Card.Body>
                </Card>
              )
            })

            }

          </div>
        </Container>
      </Styles>

    );
  }
}

export default App;
