import styled from  'styled-components'

export const CheckoutDiv=styled.div`
.checkout-pr-label{
    float:right;
    margin-top: -20px;
}
.invalid-feedback{
    color:red;
}
.success-msg{
    text-align: center;
    font-size: 25px;
    color: #086d08;
}
.preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    transition: opacity 0.3s linear;
    overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
`;  