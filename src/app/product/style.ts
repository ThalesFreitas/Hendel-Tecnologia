
import styled from 'styled-components'


export const Container = styled.div`
position: relative;
 width: 100vw;
 padding-left: 1.7rem;
 margin-left: -25px;
 padding-top: 1rem;
 display: flex;
 

`;

export const Content = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #C4C4C4;
border-radius: 20px;
background: white;
font-size: 1.2rem;

h3{
   margin: 0 auto ;
   margin-top: 1rem;
   margin-bottom: 1rem;
    
}

 > strong{
    color: #4e73df;
     margin-left: 1rem;
     margin-top: 1rem;
    }

> p{
    color: black;
    margin-left: 1rem;
}
   
 .container_quant_price{
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding-right: 1rem;
     height: 100%;
     max-height: 60px;
     div {
         display: flex;
         flex-direction: column;
         strong{
           color: #4e73df;
           margin-left: 1rem;
         
            }
        p{
          color: black;
          margin-left: 1.1rem;
        }
     }

    >p{
        color: gray; 
        position: relative;
        font-size: 1.8rem;
        margin-right: 0.6rem;
        &:before{
            content: 'R$';
            position: absolute;
            font-size: 1.8rem;
            color: green;
            font-weight: bold;
            right: 5rem;
            bottom: 0px;
        }
     }
 }
`;

export const RelatedProducts = styled.div`

 border-top: 2px solid #C4C4C4;
 border-radius: 0px 0px 20px 20px;
 display: flex;
 flex-direction: column;
 max-width: 100%;
 width: 650px;

 .msn_erro_activ {
     visibility: visible;
     display: flex;
     align-items: flex-end;
     justify-content: flex-end;
     padding-top: 3px;
     width:100%;
     
     span{
        font-size:0.7rem;
        margin-left: auto;
        margin-right: 190px;
        color: red;
        font-weight: 700; 
     }   
}
.msn_erro_inativ{
    visibility: hidden;
}

 header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
    color: #4e73df;
    margin-left: 1rem;
    
 }
 .input_erro_activ{
    border: 2px solid red;
}
    input{
    width: 130px;
    height: 40px;
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid gray;
    border-radius: 5px;
    outline: 0;
    margin-left: auto;

    &:focus{
        border: 2px solid  #4e73df;
    }

    & + input {
        margin-top: 1rem;
    }
 }
    button {
        width: 150px;
        height: 40px;
        border: none;
        font-size: 1rem;
        margin-left: 10px;
        margin-right: 1rem;
        cursor: pointer;
        color: white;
        background:  #4e73df;
        border-radius: 5px;
        transition: color 0.2s;
            &:hover {
              filter: brightness(0.8);
              cursor: pointer;
            }
        
    }

    .submit_button{
        color: white;
        background:  #C4C4C4;
    }

 }

 
`;

export const RelatedProductsList = styled.main`
display: flex;
flex-direction: column;
padding-top: 1rem;
padding-bottom: 1.5rem;

strong{
    //margin-top: 1rem;
    margin-left: 1rem;
    font-size: 1rem;
}

 section {
     display: flex;
     justify-content: space-between;
     padding-top: 0.3rem;
     
     background:  #E5E7E9;
     width: 100%;
     max-width: 450px;
     height: 8rem;
     margin-left: 0.8rem;
     line-height: 18px;
     border-radius: 4px;
     & + section {
         margin-top: 1rem;
        
     }
     strong{
         margin-left: 11px;   
     }
    
    
     div {
         
         p{
        color: #4e73df;
        font-weight: bold;
        margin-top: 8px;
        margin-left: 10px;
         }

         .related_cash{
            color: gray;
            position: relative;
            margin-left: 45px;
            font-size: 1.4rem;
            &:before{
            content: 'R$';
            position: absolute;
            font-size: 1.3rem;
            color: green;
            font-weight: bold;
            left: -35px;
            bottom: 0px;
        }
        & + p {
            font-size: 1rem;
            color: gray;
        }
        }
     }
     svg{
         width: 22px;
         height: 22px;
        margin-bottom: auto;
        margin-top: 2px;
        margin-right: 5px;
        color: #4e73df;
         transition: color 0.2s;
                    &:hover {
                    filter: brightness(0.8);
                    cursor: pointer;
                    color: red;
                }
     }

     
 }
`
export const Toast = styled.div`
position: absolute;
width: 100%;
max-width: 350px;
height: 80px;
background: #F9D8D8;
display: flex;
justify-content: space-between;


top: 5%;
left: auto;
right: 18%;
border-radius: 4px;
animation-duration: 0.8s;
//animation-name: toast;
animation: fadein 1s, fadeout 1s 4s;

@keyframes toast {
  from {right: 0px;}
  to {right: 100px;}


}
@-webkit-keyframes fadein {
  from {transform: translateX(320px); opacity: 0;}
  to {transform: translateX(0px); opacity: 1;}
}

@keyframes fadein {
  from {transform: translateX(320px); opacity: 0;}
  to {transform: translateX(0px); opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {transform: translateX(0px); opacity: 1;}
  to {transform: translateX(320px); opacity: 0;}
}

@keyframes fadeout {
  from {transform: translateX(0px); opacity: 1;}
  to {transform: translateX(320px); opacity: 0;}
}

div{
    width: 100%;
    max-width: 300px;
    height: 100%;
    display: flex;
    padding: 7px;
   
   
}

p{
    font-size: 1rem;
    color: #820505;
    font-weight: bold;
    
}
svg {
    width: 22px;
    height: 22px;
    color: #EA0D0D;
    transition: color 0.2s;
   margin-top: 8px;
   margin-right: 6px;
    
    &:hover {
      filter: brightness(0.8);
      cursor: pointer;
      color: #4e73df;
      
    }
}
 
`;