import styled from 'styled-components';

export const ProductDiv = styled.div`
.col-lg-4{
    margin-bottom:10px;
}
`;
export const ProductCard =styled.div`

    .card-img{
        width:100%;
    }
    .card {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0,0,0,.125);
        border-radius: 0.25rem;
      }
      .justify-content-end {
        -ms-flex-pack: end!important;
        justify-content: flex-end!important;
      }
      .d-flex {
        display: -ms-flexbox!important;
        display: flex!important;
      }
      .card-img-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1.25rem;
      }
      .card-body {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 1.25rem;
      }
      .card-title {
        margin-bottom: 0.75rem;
      }
      .text-muted {
        color: #6c757d!important;
      }
      .mb-2, .my-2 {
        margin-bottom: 0.5rem!important;
      }
      .card-subtitle {
        margin-top: -0.375rem;
        margin-bottom: 0;
      }
      .flex-fill {
        -ms-flex: 1 1 auto!important;
        flex: 1 1 auto!important;
      }
      .d-flex {
        display: -ms-flexbox!important;
        display: flex!important;
      }
      .align-items-center {
        -ms-flex-align: center!important;
        align-items: center!important;
      }
      .justify-content-between {
        -ms-flex-pack: justify!important;
        justify-content: space-between!important;
      }
      .d-flex {
        display: -ms-flexbox!important;
        display: flex!important;
      }
      .text-success {
        color: #28a745!important;
      }
      .btn:not(:disabled):not(.disabled) {
        cursor: pointer;
      }
      .mt-3, .my-3 {
        margin-top: 1rem!important;
      }
      .btn-danger {
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
      }
      .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }
      a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
      }
`;