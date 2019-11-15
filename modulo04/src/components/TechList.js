import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  state = { //todo estado no react é imutável
    newTech: '', //campo para o input
    techs: [
      /*
      'NodeJS',
      'ReactJS',
      'React Native'
      */
    ]
  };

  // Executado assim que o componente aparece em tela
  componentDidMount() {
    //exibe infos presentes no localstorage
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executado sempre que houver alterações nas props ou estado, (prevProps, prevState)
  componentDidUpdate(_, prevState) {    
    if (prevState.techs !== this.state.techs) {
      //salva no localstorage apenas quando o user muda o estado de techs, 'techs' variavel, transforma o array em JSON
       localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  // Executado quando o componente deixa de existir
  componentWillUnmount() {

  }

  /*
  os handle precisam ficar juntos com o estado que irão manipular /
  arrow function para poder acessar o 'this'
  */
  handleInputChange = e => { //
    this.setState({ newTech: e.target.value }); //add valor do input
  }

  handleSubmit = e => { //feito para evitar q a pagina atualize após usar button
    e.preventDefault();

    /*
    recria o array do zero, '...'copia as infos que já existem, 
    setState cria um novo estado, newTech:'' limpa o input 
    */
    this.setState({ 
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    }); 
    
    //console.log(this.state.newTech);
  }

  handleDelete = (tech) => { 
    // 't' recebe cada uma das techs, e mostra as que são diferentes recebidas por paramatro do delete 
    this.setState({ techs: this.state.techs.filter(t => t !== tech) })
  }

  render() { //key é valor único de cada elemento, <> = fragment(div)
            //'tech={tech}' = propriedade
          //'onDelete' recebe a função, parenteses vazio para delatar apenas no click 
    return ( 
      <form onSubmit={this.handleSubmit} > 
        <ul> 
          {this.state.techs.map(tech => <TechItem 
          key={tech} 
          tech={tech}
          onDelete={() => this.handleDelete(tech)}
          /> )}
        </ul>
        <input 
        type="text" 
        onChange={this.handleInputChange} 
        value={this.state.newTech} 
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;