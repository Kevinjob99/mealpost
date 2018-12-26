import React, { Component } from 'react'
import { connect } from 'react-redux'
import MealPlan from './components/MealPlan'
import Quote from './components/Quote'
import CommonQuestions from './components/CommonQuestions'

import './styles.css'

import imgPlan from '../../assets/images/mealplan.png'

class HowItWorks extends Component {

  render () {
    return (
      <div className='div-meal-plans-container'>
        {/* Banner and Title */}
        <div className='div-meal-plans-banner'>
          <div className='div-meal-plans-title'>
            CHOOSE YOUR MEAL COUNT
          </div>
          <div className='div-meal-plans-subtitle'>
            Select how many meals you would like to receive per week. You'll be able to adjust this while choosing your meals.
          </div>
        </div>

        {/* Meal Plans */}
        <div className='div-meal-plans'>
          <div className='div-meal-plans-grid container'>
            {/* Plans */}
            <div className='row'>
              <div className='div-meal-plan-wrapper col-12 col-lg-6'>
                <MealPlan
                  title='Single Plan'
                  subtitle1='Minimum'
                  subtitle2='4 MEALS / Week'
                  image={ imgPlan }
                  startPrice='9.95'
                  totalPrice='39.90'
                />
              </div>
              <div className='div-meal-plan-wrapper col-12 col-lg-6'>
                <MealPlan
                  title='Family Plan'
                  subtitle2='6 MEALS / Week'
                  image={ imgPlan }
                  startPrice='9.95'
                  totalPrice='59.70'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className='div-meal-plans-info'>
          <Quote
            quote={`"I just moved into a new home. MP really help saved dinner for my family!"`}
            author='Heather'
          />
          <Quote
            quote={`"Great service for people who really don't have time to cook or simply can't like myself.. #noshame."`}
            author='James'
          />
          <Quote
            quote={`"Absolutely delicious meals, affordable prices, why would order anything else?"`}
            author='Vicky'
          />
        </div>

        {/* Common Questions */}
        <CommonQuestions/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(HowItWorks)
