import React, { useState } from 'react';
import { Input, Tooltip, Button } from 'antd';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [dataForm, setDataForm] = useState(
      {
        cardNumber: '**** **** **** ****',
        name: '****************',
        exp: '**/**',
        secureCode: ''
      }
  );

  const [creditCardColor, setCreditCardColor] = useState('credit-card__default')
  const [logoCard, setLogoCard] = useState('')
  const [show, setShow] = useState(false)
  
  const isNumber = (str) => {
      const pattern = /^\d+$/;
      return pattern.test(str);  // returns a boolean
  }

  const numberOnly = (e) => {
      let reg = /^[0-9]+$/;
      console.log("number " + reg.test(String.fromCharCode(e.which)));

      if (!reg.test(String.fromCharCode(e.which))) {
          e.preventDefault();
      }
  }

  const keyRules = (e) => {
      numberOnly(e)
      let { name, value } = e.target

      if(name == 'cardNumber') {
          e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
      }

      if(name == 'exp') {
          value = value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1/').trim();

          if(value.length > 5 && value[5]) {
              return
          }

          e.target.value = value
      }
      
  }

  const handleFormChange = (e) => {
      let { name, value } = e.target
      console.log('dataForm', dataForm)

      if(name == 'cardNumber') {
          if(!value) {
              value = '**** **** **** ****';
              setCreditCardColor('credit-card__default')
          }

          if(value.startsWith('4')) {
              setCreditCardColor('credit-card__visa')
              setLogoCard('/visa.png')
          }
          else if (value.startsWith('51') || 
                  value.startsWith('52') || 
                  value.startsWith('53') || 
                  value.startsWith('54') || 
                  value.startsWith('55') ) {
                      setCreditCardColor('credit-card__mastercard')
                      setLogoCard('/masterCard.png')
                  }
          else { 
              setCreditCardColor('credit-card__default')
              setLogoCard('')
          }
      }

      if(name == 'name') {
          if(!value) value = '****************';
      }

      if(name == 'exp') {
          if(!value) value = '**/**';
      }

      if(name == 'secureCode') {
          if(!value) value = '';
      }

      setDataForm(prevState => (
        {
          ...prevState,
          [name]: value
        }
      ))
  }

  return (
    <div>
      <Head>
        <title>Credit Card UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title__info">
        <Tooltip title="Card Number start with 4 is Visa, and start with 51 - 55 is Master Card">
            <span>Hover Here for the example logic of Credit Card case!</span>
        </Tooltip>
      </h1>

      <div className="container__card">
          <div className="card__left">
              <div className={`credit-card ${creditCardColor}`}>
                  <div className='credit-card__logo'>
                      <div>
                          <img className='logo' src={'/credit-card-chip.png'} width="60"/>
                      </div>
                      <div>
                          <img className='logo' src={logoCard} width={logoCard == '/visa.png' ? 130 : 80}/>
                      </div>
                  </div>

                  <div className='credit-card__number'>
                      <span className="text-card__number">card number</span>
                      <div className="card__number">{dataForm.cardNumber}</div>
                  </div>
                  
                  <div className='credit-card__info'>
                      <div className='credit-card__info_name'>
                          <div className='credit-card__info_label'>cardholder's name</div>
                          <div>{dataForm.name ? dataForm.name.toUpperCase() : ""}</div>
                      </div>

                      <div className='credit-card__info_expiry'>
                          <div className='credit-card__info_label'>expiration</div>
                          <div className="exp_valid">
                            <div className="valid-thru">VALID THRU</div>
                            <div className="exp_text">{dataForm.exp}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="card__right">
              <div className="form__data">
                  <div className="text__title">Name</div>
                  <div className="text__data">
                      <Input 
                          name="name"
                          maxLength={25}
                          onChange={(e) => handleFormChange(e) }
                          placeholder="Name" 
                      />
                  </div>

                  <div className="text__title">Card Number</div>
                  <div className="text__data">
                      <Input 
                          name="cardNumber"
                          maxLength={19}
                          onChange={e => handleFormChange(e) }
                          onKeyPress={(e) => keyRules(e)}
                          placeholder="Card Number" 
                      />
                  </div>

                  <div className="form__exp-secure-code">
                      <div>
                          <div className="text__title">Expiration (mm/yy)</div>
                          <div>
                              <Input 
                                  name="exp"
                                  maxLength={5}
                                  onChange={(e) => handleFormChange(e) }
                                  onKeyPress={(e) => keyRules(e)}
                                  placeholder="Name" 
                              />
                          </div>
                          
                      </div>
                      <div>
                          <div className="text__title">Security Code</div>
                          <div className="input__secure-code">
                              <Input 
                                  name="secureCode"
                                  maxLength={3}
                                  onChange={(e) => handleFormChange(e) }
                                  onKeyPress={(e) => keyRules(e)}
                                  placeholder="Security Code" 
                              />
                          </div>
                      </div>
                  </div>

                  <div>
                      <Button type="primary" onClick={() => setShow(!show)}> 
                          {show ? "Hide" : "Show Object"} 
                      </Button>
                      <br/>
                      <br/>

                      {
                        show &&
                          JSON.stringify(dataForm)
                      }
                      
                  </div>
              </div>
          </div>
      </div>

    </div>
  )
}
