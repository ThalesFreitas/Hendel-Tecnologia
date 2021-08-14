import styled from 'styled-components'

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;

    .number_of_pages{
    display: flex;
    margin-bottom: 8px;
    margin-right: 20px;   
}

.first_page {
    margin-bottom: 13px;
    margin-right: 20px;
    cursor: pointer;
}

.first_page:hover {
    font-weight: bold;
    color: #4e73df;
}

.arrow-left {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    cursor: pointer;
}

.arrow-left:hover {
    font-weight: bold;
    color: #4e73df;
}

.current{
    margin-left: 1rem;
    color: #858796;
    font-size: 1.1rem;
    cursor: pointer;
    
}

.activepage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    border-radius: 2px;
    background: #4e73df;
    color: rgb(255, 255, 255);   
}

.arrow-right {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    cursor: pointer;
}

.arrow-right:hover {
    font-weight: bold;
    color: #4e73df;
}

.last_page {
    margin-bottom: 13px;
    margin-left: 20px;
    cursor: pointer;
}

.last_page:hover {
    font-weight: bold;
    color: #4e73df;
}

.inactive_page {
    visibility: hidden;
}


`

