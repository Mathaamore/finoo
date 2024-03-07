import styled from "styled-components"

//Components
import AuthForm from "../../components/auth/form";

const HomeWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    color: #313131;

    >div{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    >div:first-child{
        background-color: #FAFAFD;
        padding: 0 6%;
    }

    >div:nth-child(2){
        background-color: #FFFFFF;
        padding: 0 6%;
    }
`


function LoginPage() {
    return (
        <HomeWrapper>
            <div>
                <h1>Welcome to Finoo!</h1>
                <p>Please login in order to access to the app</p>
                <AuthForm />
            </div>
            <div>
                <img style={{width: "30vw"}} src="/login.png" alt="login" />
            </div>
        </HomeWrapper>
    );
}

export default LoginPage;
