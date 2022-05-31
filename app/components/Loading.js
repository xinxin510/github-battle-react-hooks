import React from 'react';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.text
    }
  }

  componentDidMount() {
    const {speed, text} = this.props;

    this.interval = setInterval(() => {
      console.log('setInterval is working');
      this.state.content === text + '...' ?
      this.setState({content: text}) :
      this.setState(({content}) => ({content: content + '.'}))
    }, speed)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <p style={styles.content}>
        {this.state.content}
      </p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}