import React from 'react';
import styles from './input.module.css';

interface CustomInput {
    type: string;
    name: string;
    placeHolder?: string;
    minDate?: string;
    title: string;
    btnValue?: string;
    formValue?: string;
    isDisabled?: boolean;
    setFormValue: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const CustomFormInput = ({ type, name, placeHolder, minDate, title, btnValue, formValue, setFormValue, isDisabled } : CustomInput) => {

    return (
        <div className={styles.inputBx}>
            <p className={styles.title}>{title}</p>
            <input 
                type={type} 
                name={name} 
                placeholder={placeHolder} 
                onChange={(e) =>  setFormValue(prevState => ({
                    ...prevState,
                    [name]: e.target.value
                }))} 
                min={minDate}
                disabled={isDisabled ? isDisabled : false }
                value={btnValue ? btnValue : formValue} />
        </div>
    )
};


export default CustomFormInput;