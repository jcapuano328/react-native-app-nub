import React from 'react';
import { View, TextInput, Text } from 'react-native';
import SpinButton from './spinButton';
import {Font} from '../services/style';

let format = (v, ib) => {
    if (v != null && v != '') {
        v = ib ? Math.floor(+v).toString() : (+v).toFixed(1);
    } else {
        v = '';
    }
    return v;
}

var SpinNumeric = React.createClass({
    nextValue(value, neg) {
        let values = this.props.values;
        if (!values || values.length < 1) {
            let v = neg ? value - 1 : value + 1;
            if (this.props.hasOwnProperty('min') && v < this.props.min) {
                v = this.props.min;
            } else if (this.props.hasOwnProperty('max') && v > this.props.max) {
                v = this.props.max;
            }
            return v;
        }

        var i = values.findIndex((v) => {return v==value;}) + (neg ? -1 : 1);
        if (i < 0) {
            i = 0;
        } else if (i >= values.length) {
            i = values.length - 1;
        }
        return values[i];
    },
    onPrev() {
        try {
            let v = this.nextValue(+this.props.value, true);
            this.props.onChanged && this.props.onChanged(v.toString());
        } catch(err) {
            console.error(err);
        }
    },
    onNext() {
        try {
            let v = this.nextValue(+this.props.value);
            this.props.onChanged && this.props.onChanged(v.toString());
        } catch(err) {
            console.error(err);
        }
    },
    onChanged(e) {
        try {
            this.props.onChanged && this.props.onChanged(e);
        } catch(err) {
            console.error(err);
        }
    },
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {this.props.label
                    ? <View style={{flex: 10}}>
                        <Text style={{fontSize: this.props.labelFontSize || Font.medium()}}>{this.props.label}</Text>
                    </View>
                    : null
                }
                <View style={{flex: 5}}>
                    <SpinButton image={this.props.imagedown||'button-minus'} scale={.9} onPress={this.onPrev} />
                </View>
                <View style={{flex: 15, justifyContent:'flex-end', alignItems: 'center'}}>
                    <TextInput 
                        style={{alignSelf: 'stretch',                                
                                fontSize: this.props.fontSize || Font.medium(),
                                //borderWidth: 1,borderRadius: 4,borderColor: '#E6E5ED',
                                //backgroundColor: '#F8F8F9',
                                justifyContent: 'flex-end',
                                textAlign: 'center'}}
                        keyboardType={'numeric'}
                        autoCorrect={false}
                        onChangeText={this.onChanged}
                        defaultValue={this.props.defaultValue}
                        value={this.props.value}
                    />
                </View>
                <View style={{flex: 5}}>
                    <SpinButton image={this.props.imageup||'button-plus'} scale={.9} onPress={this.onNext} />
                </View>
            </View>
        );
    }
});

module.exports = SpinNumeric;
