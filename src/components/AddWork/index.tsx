import './AddWork.scss';
import closeIcon from '../../assets/images/close.png';
import { FC } from 'react';
import { addWorkFields } from '../../shared/consts/fieldsData/addWorkFields';
import { CustomInput } from '../CustomInput';
import { Formik } from 'formik';
import { addWorkSchema } from './FormValidation';
import { useDispatch } from 'react-redux';
import { applyForAddingWork } from '../../store/actions/works';
import leftHero from '../../assets/images/left_hero_like.png';
import rightHero from '../../assets/images/right_smile_hero.png';

const initialValues: IApplicationField = {
    email: '',
    phone: '',
};

export interface IApplicationField {
    email: string,
    phone: string
}

export const AddWork: FC<{ changeModalState: (state: boolean) => void }> = ({ changeModalState }) => {

    const dispatch = useDispatch();
    return (
        <div className="add_work active">
            <div className="overlay" onClick={() => changeModalState(false)}></div>

            <div className="popup">

                <div className="head">
                    <img
                        onClick={() => changeModalState(false)}
                        className="close"
                        src={closeIcon}
                        alt="no Close Icon"
                    />
                    <h2>Zapisz się na warsztaty multimedialne</h2>
                </div>

                <div className="content">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={addWorkSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={values => {

                            dispatch(applyForAddingWork(values));
                            changeModalState(false);
                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>

                                <p>
                                    podczas których uczniowie stworzą swoje
                                    prace multimedialne i dołączą je do platformy
                                </p>
                                <div className="error_messages"></div>

                                {addWorkFields.map(field =>
                                    <CustomInput
                                        key={field.id}
                                        fieldData={field}
                                        formikProps={props}
                                    />
                                )}

                                <button
                                    className="submit_btn"
                                    type="submit"
                                >
                                    Zapisz się
                                </button>

                            </form>
                        )}
                    </Formik>
                </div>

                <img src={leftHero} alt="LH" className="left_hero" />
                <img src={rightHero} alt="RH" className="right_hero" />
            </div>
        </div>
    )
};