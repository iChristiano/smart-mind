import React from 'react';

class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: ''
        }
    } 

    componentDidMount() {
        this.generateEmoji(this.props.entries);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
            return null;
        }
        this.generateEmoji(this.props.entries);
    }

    generateEmoji = (entries) => {
        fetch(`https://rwkekg4co9.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
        .then(response => response.json())
        .then(data => this.setState({ emoji: data.input }))
        .catch(console.log);
    }

    render() {
        return(
            <div>
                <div className='b white f3'>
                    {`${this.props.name}, your current entry count is...`}
                </div>
                <div className='b i white f1'>
                    {this.props.entries}
                </div>
                <div className='b i white f3'>
                    {`Rank Badge ${this.state.emoji}`}
                </div>
            </div>
        );
    }
    
}

export default Rank;