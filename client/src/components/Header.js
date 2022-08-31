import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import {GiMartini} from "react-icons/gi";
import { CurrentColorContext } from "./CurrentColorContext";
import React from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '50px',
        width: '400px',
        height: '190px',
        'border-radius': '60px',
        'background-color': 'black',
        color: '#f5c6dc',
        'font-family': 'IBM Plex Mono',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'font-size': '25px',
        'text-align': 'center',
        'border': 'solid 5px #f5c6dc',
        'z-index': '100',
    },
};

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { currentColor, setCurrentColor } = useContext(CurrentColorContext);
    const { logout } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if(isAuthenticated){
            fetch("/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user})
            })
            .then((res) => res.json())
            .then(data => console.log(data))
        }
    }, [isAuthenticated])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <MainDiv>
            <NavLink to={"/"} className="logos">
                <h1 className="logoname1">CL</h1>
                <GiMartini size={45}/>
                <h1 className="logoname2">NK</h1>
            </NavLink>

            <div className="everythingelse">
                <div className="links">

                    {isAuthenticated ?
                    <NavLink to="/saved-recipes">
                        <StyledButton>saved recipes</StyledButton>
                    </NavLink>
                    :
                    <div>
                        <StyledButton onClick={openModal}>saved recipes</StyledButton>
                        <Modal 
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Please Login Modal"
                        >
                            <div className="modaldiv">
                            <StyledPTag>Please sign-in to use this feature!</StyledPTag>
                            <CloseButn onClick={closeModal}>close</CloseButn>
                            </div>
                        </Modal>
                    </div>
                    }
                    
                    {isAuthenticated ?
                    <NavLink to="/preferences">
                    <StyledButton>preferences</StyledButton>
                    </NavLink>
                    :
                    <StyledButton onClick={openModal}>preferences</StyledButton>
                    }

                        {isAuthenticated ?
                        <StyledButton onClick={() => logout({ returnTo: window.location.origin })}>sign out</StyledButton>
                        : <StyledButton onClick={() => loginWithRedirect()}>sign in</StyledButton>
                        }

                </div>

                {isAuthenticated && (
                    <NavLink className="navclass" to="/profile">
                        <p className="hello"> hello, {user.name.split(" ")[0]}</p>
                    </NavLink>
                )}
            </div>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100vw;
    flex-direction: row;
    height: 10vh;
    background-color: black; 
    z-index: 100;

    .logoname1{
        font-family: var(--font-header-option-two);
        font-size: 50px;
        margin-right: -8px;
        margin-top: 9px;
    }

    .logoname2{
        font-family: var(--font-header-option-two);
        font-size: 50px;
        margin-left: -5px;
        margin-top: 9px;
    }

    .logos{
        display: flex;
        align-items: center;
        padding-left: 130px;
        text-decoration: none;
        color: var(--color-yellow);
        font-style: italic;
    }

    .hello{
        color: #f9cc67;
        font-family: var(--font-header-option-one);
        padding-right: 100px;
        font-size: 26px;
        font-style: italic;
        text-decoration: none;
    }

    .navclass{
        text-decoration: none;
    }

    .everythingelse{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100vw;
        
    }

    .links{
        padding-right: 50px;
        display: flex;
        gap: 12px;
    }
`
const StyledButton = styled.button`
    font-family: var(--font-body);
    color: var(--color-yellow);
    border: 2px solid var(--color-yellow);
    padding: 7px 9px;
    border-radius: 30px;
    width: 140px;
    font-size: 14px;
    background-color: transparent;

    &:hover{
        cursor: pointer;
        background-color: var(--color-yellow);
        color: black;
    }
`

const CloseButn = styled.button`
    width: 80px;
    height: 30px;
    margin-top: 40px;
    background-color: transparent;
    color: var(--color-pink);
    border: solid 1px var(--color-pink);
    font-family: var(--font-body);
    border-radius: 30px;
    font-size: 14px;
    margin-left: 320px;
    margin-top: 60px;

    &:hover{
        cursor: pointer;
        background-color: var(--color-pink);
        color: black;
    }
`
const StyledPTag = styled.p`
    margin-top: 60px;
    margin-bottom: -30px;
`
export default Header;