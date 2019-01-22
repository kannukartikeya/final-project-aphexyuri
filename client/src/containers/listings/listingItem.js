import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { Grid, Card, Icon, Button, Image } from 'semantic-ui-react'

var multihash = require('../../utils/multihash')

class ListingItem extends Component {
  constructor(props) {
    super(props)

    let ipfsHash =  multihash.getMultihashFromBytes32({
      digest: props.item.primaryIpfsDigest,
      hashFunction: props.item.primaryIpfsHashFunction,
      size: props.item.primaryIpfsSize
    })
    
    this.state = { ipfsHash:  ipfsHash}
  }

  handleItemSelect = (evt) => {
    this.props.itemSelectHandler(this.props.item.assetId)
  }

  render () { 
    let isoCountryCode = this.props.app.web3.utils.hexToAscii(this.props.item.isoCountryCode)
    let stateProvince = this.props.app.web3.utils.hexToAscii(this.props.item.stateProvince)
    let city = this.props.item.city ? this.props.app.web3.utils.hexToAscii(this.props.item.city) : ''

    let location = isoCountryCode + ', ' + stateProvince + (this.props.item.city ? ', ' + city : '')
    
    return (
      <Grid.Column largeScreen={4} computer={5} tablet={8} mobile={8}>
        <Card>
          <Image centered avatar
            src={ 'https://gateway.ipfs.io/ipfs/' + this.state.ipfsHash }
            size='medium'
            verticalAlign='middle'
            style={{'fontSize':130}} onClick={ this.handleItemSelect }/>
          <Card.Content>
            <Card.Header>{ this.props.item.title }</Card.Header>
            <Card.Meta>{ location }</Card.Meta>
            <Card.Content extra>
              <Icon name='ethereum' />
              { this.props.app.web3.utils.fromWei(this.props.item.reward, 'ether') } ETH
              <Button basic color='green' floated='right' size='mini' onClick={ this.handleItemSelect }>
                See details
              </Button>
            </Card.Content>
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  }
}

ListingItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemSelectHandler: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  app: state.app
})
  
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingItem)