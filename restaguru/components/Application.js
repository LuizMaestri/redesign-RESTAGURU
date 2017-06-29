import React, { Component } from 'react';
import { Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Left, Title } from 'native-base';
import { Text } from 'react-native';
import { Home, Add, Profile } from '../pages';
import { Address, Restaurant } from '../entities';

export default class Application extends Component {
  constructor(){
    super();
    this.state = {
      lists : {
        restaurants: [
            new Restaurant('Miyoshi', new Address('Brazil', 'Florianópolis') , 1),
            new Restaurant('Gokoni', new Address('Brazil', 'São josé') , 1)
        ],
        gurus: [],
        //macGyver
        navigate: (tab) =>  this.setState({ tab })
      },
      tab: null,
      tabName: 'home'
    };
    this.selectTab = this.selectTab.bind(this);
    this.handlerAdd = this.handlerAdd.bind(this);
    this.backHome = this.backHome.bind(this);
  }

  componentWillMount(){
    this.backHome();
  }

  selectTab(tab, tabName){
    return {
      active: this.state.tabName == tabName,
      onPress: () => this.setState({ tab, tabName })
    };
  }

  handlerAdd(restaurant){
    let { address } = restaurant;
    address = address.split(',');
    restaurant.address = new Address(address[1].trim(), address[0].trim())
    let { lists } = this.state;
    let { restaurants } = lists;
    restaurant = Restaurant.cast(restaurant);
    restaurants.push(restaurant);
    lists.restaurants = restaurants;
    this.setState({ lists });
    this.backHome();
  }

  backHome(){
    let tab = (<Home { ...this.state.lists }/>);
    let tabName = 'home';
    this.setState({ tab, tabName });
  }

  render() {
    return (
        <Container>
          <Header>
            <Left/>
            <Body>
              <Title>
                RESTAGURU
              </Title>
            </Body>
          </Header>
          <Content>
            { this.state.tab }
          </Content>
          <Footer>
            <FooterTab>
              <Button { ...(this.selectTab((<Profile {...this.props}/>), 'profile')) }>
                <Icon name="person"/>
              </Button>
              <Button { ...(this.selectTab((<Home onSubmit={ this.handlerAdd } { ...this.state.lists } />), 'home')) }>
                <Icon name="search"/>
              </Button>
              <Button { ...(this.selectTab((<Add onSubmit={ this.handlerAdd }/>), 'add')) }>
                <Icon name="add-circle"/>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
}
