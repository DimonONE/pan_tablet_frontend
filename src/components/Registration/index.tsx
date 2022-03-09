import { RegistrationForm } from '../RegistrationForm';
import { AddPortfolio } from '../AddPortfolio';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { SignUpLogo } from '../SignUpLogo';
import './Registration.scss';
import { Redirect } from 'react-router';
import { userRoutes } from '../../shared/consts/url/routes';
import { AuthChecking } from '../AuthGuard/AuthChecking';

export const Registration = () => {

    const isAuthorized = AuthChecking();

    if (isAuthorized) {

        return <Redirect to={userRoutes.mainPage} />
    }

    return (
        <>
            <Navbar />
            <AddPortfolio />
            <SignUpLogo />

            <div className='registration_text container'>
                <h1>Rejestracja</h1>
                <span>Załóż teczkę multimedialną!</span>
                <h2>Stwórz historię swoich wszystkich prac!</h2>
            </div>

            <RegistrationForm />
            <Footer />
        </>
    )
};