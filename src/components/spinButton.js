import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
//import Arrow from './arrow';
import Icons from '../resources';

var SpinButton = React.createClass({
    render() {
        let dir = this.props.direction == 'prev' ? 'left' : 'right';
        let appearance = this.props.appearance || 'light';
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{flex: 1, justifyContent:'center',alignItems: 'center'}}>
                {/*<Arrow size={this.props.size} direction={dir} />*/}
                <Image source={Icons['chevron-'+dir+'-'+appearance]}
                    style={{height: this.props.height || 32, width: this.props.width || 32, resizeMode: this.props.resizeMode || 'contain'}}/>
            </TouchableOpacity>
        );
    }
});

module.exports = SpinButton;
