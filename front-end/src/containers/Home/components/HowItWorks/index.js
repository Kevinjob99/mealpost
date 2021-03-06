import React, { Component } from 'react'
import Button from '../../../../components/Button'

import './styles.css'

class HowItWorks extends Component {

  onLearnMore = () => {
    this.props.onLearnMore()
  }

  render () {
    const { imageFirst, image, title, description } = this.props

    const textAndButtonContent = (
      <div className='div-how-it-works-center'>
        <div className='div-how-it-works-title'>
          { title }
        </div>
        <div className='div-how-it-works-description'>
          { description }
        </div>
        <Button className='btn-learn-more' onClick={this.onLearnMore}>LEARN MORE</Button>
      </div>
    )

    const imageContent = (
      <img className='img-how-it-works img-responsive' src={image} alt='how-it-works'/>
    )

    const responsiveHowItWorks = (
      <div className='responsive-div-how-it-works'>
        <div className='div-how-it-works-center'>
          { imageContent }
          <div className='div-how-it-works-title'>
            { title }
          </div>
          <div className='div-how-it-works-description'>
            { description }
          </div>
          <Button className='btn-learn-more' onClick={this.onLearnMore}>LEARN MORE</Button>
        </div>
      </div>
    )

    if (imageFirst) {
      return (
        <div className={this.props.className} style={this.props.style}>
          <div className='div-how-it-works'>
            <div className='div-how-it-works-left' style={{width: '40%'}}>
              { imageContent }
            </div>
            <div className='div-how-it-works-right' style={{width: '60%'}}>
              { textAndButtonContent }
            </div>
          </div>

          {/* Responsive */}
          { responsiveHowItWorks }
        </div>
      )
    } else {
      return (
        <div className={this.props.className} style={this.props.style}>
          <div className='div-how-it-works'>
            <div className='div-how-it-works-left'  style={{width: '60%'}}>
              { textAndButtonContent }
            </div>
            <div className='div-how-it-works-right'  style={{width: '40%'}}>
              { imageContent }
            </div>
          </div>

          {/* Responsive */}
          { responsiveHowItWorks }
        </div>
      ) 
    }
  }
}

export default HowItWorks
