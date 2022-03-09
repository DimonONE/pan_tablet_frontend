import './CreatingFolderForm.scss';
import { CustomInput } from '../CustomInput';
import { addFolderField } from '../../shared/consts/fieldsData/addFolderField';
import * as Yup from 'yup';
import { Formik, FormikState } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { createFolder } from '../../store/actions/folders';
import { FC } from 'react';
import { IRootReducer } from '../../store/reducers';
import { If } from '../If';

interface ICreatingFolderForm {
    cancel?: (state: boolean) => void,
}

export const CreatingFolderForm: FC<ICreatingFolderForm> = ({ cancel }) => {

    const dispatch = useDispatch();
    const { error } = useSelector((state: IRootReducer) => state.folders);

    const cancelCreatingFolder = (resetForm: (nextState?: Partial<FormikState<any>>) => void) => {
        resetForm();

        cancel && cancel(false);
    };

    return (
        <Formik
            initialValues={{ name: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string().trim().required('Pole jest wymagane')
            })}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values, { resetForm }) => {

                dispatch(createFolder(values));
                resetForm();
            }}
        >
            {props => (
                <form className="creating_folder" onSubmit={props.handleSubmit}>
                    <CustomInput
                        fieldData={addFolderField}
                        formikProps={props}
                    />
                    <div className="folder_actions">
                        <button
                            className="submit_btn"
                            disabled={props.isSubmitting}
                            type="submit"
                        >
                            Zapisz dane
                        </button>

                        <button
                            className="cancel_btn"
                            disabled={props.isSubmitting}
                            onClick={() => cancelCreatingFolder(props.resetForm)}
                        >
                            Anuluj
                        </button>
                    </div>
                    <If condition={error}>
                        <div className="error">
                            Księga może się znajdować tylko w jednej teczce.
                            Być może ona już została dodana wcześniej
                        </div>
                    </If>
                </form>
            )}
        </Formik>
    )
};