import styled from 'styled-components';

export const CartDiv=styled.div`
    .w-100{
        width:100%
    }
    .action-btn{
        width:20px;
    }
    .action-btn-box{
        background-color:transparent;
        border:none;
    }
    .input-group{
        position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
    }
    .input-group input{
        width:20%
    }
    .number{
        margin:100px;
    }
    .minus, .plus{
        width:20px;
        height:20px;
        background:#f2f2f2;
        border-radius:4px;
        padding:8px 5px 8px 5px;
        border:1px solid #ddd;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
    }
    @media (min-width: 1025px) {
        .h-custom {
        height: 100vh !important;
        }
        }
        
        .card-registration .select-input.form-control[readonly]:not([disabled]) {
        font-size: 1rem;
        line-height: 2.15;
        padding-left: .75em;
        padding-right: .75em;
        }
        
        .card-registration .select-arrow {
        top: 13px;
        }
        
        .bg-grey {
        background-color: #eae8e8;
        }
        
        @media (min-width: 992px) {
        .card-registration-2 .bg-grey {
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        }
        }
        
        @media (max-width: 991px) {
        .card-registration-2 .bg-grey {
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        }
        }

        .cart-sumr-label{
            float:right;
        }
`;

