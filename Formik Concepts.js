--------------------------------Formik errror valdiation-----------------------------
import React from 'react';
import {useFormik} from 'formik'

const YouTubeFrom = () => {
  const initialValues ={
    name:'surya',
    email:'',
    channel:''
  }
  const onSubmit= values=>{
    console.log("fromk.value",values)
  }
  const validate = values =>{
    let errors={}

    if(!values.name){
      errors.name="required"
    }
    if(!values.email){
      errors.email="required"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email="Enter correct email"
    }
    if(!values.channel){
      errors.channel="required"
    }
    return errors

  }

  const formik=useFormik({
     initialValues,
     onSubmit,
     validate
  
  

 
})
 console.log("fromk.touched",formik.touched)
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} 
        onBlur={formik.handleBlur}
        ></input>
        { formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> :null}
        </div>
        <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} 
         onBlur={formik.handleBlur}
        ></input>
        { formik.touched.email &&formik.errors.email ? <div className="error">{formik.errors.email}</div> :null}
        </div>
        <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" onChange={formik.handleChange} value={formik.values.channel} 
         onBlur={formik.handleBlur}
        ></input>
        {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div> :null}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default YouTubeFrom;




---------------------------------------Formik Reducer Boiler.js----------------------------------------

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const YouTubeFrom = () => {
  const initialValues = {
    name: 'surya',
    email: '',
    channel: '',
  };
  const onSubmit = (values) => {
    console.log('fromk.value', values);
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Indivual Format').required('Required'),
    channel: Yup.string().required('Required'),
  });
  // const validate = (values) => {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = 'required';
  //   }
  //   if (!values.email) {
  //     errors.email = 'required';
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Enter correct email';
  //   }
  //   if (!values.channel) {
  //     errors.channel = 'required';
  //   }
  //   return errors;
  // };

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  });
  // console.log('fromk.touched', formik.touched);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}  validationSchema={validationSchema}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps('name')}
            // onChange={formik.handleChange}
            // value={formik.values.name}
            // onBlur={formik.handleBlur}
          ></input>
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
            // onChange={formik.handleChange}
            // value={formik.values.email}
            // onBlur={formik.handleBlur}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            {...formik.getFieldProps('channel')}
            // onChange={formik.handleChange}
            // value={formik.values.channel}
            // onBlur={formik.handleBlur}
          ></input>
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default YouTubeFrom;


------------------------------------Formik 16-03-2022-----------------------------
---------------------------App.js--------------------------------
import React from 'react';
import './style.css';
import './App.css'
import YouTubeForm from './components/YouTubeForm';

export default function App() {
  return (
    <div>
      <YouTubeForm />
    </div>
  );
}

--------------------------------App.css------------------------------------
.App {
  display: flex;
  justify-content: center;
}

label {
  font-weight: bold;
  display: flex;
  margin-bottom: 5px;
}

input[type='text'],
input[type='email'],
textarea {
  display: block;
  width: 400px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* margin-bottom: 20px; */
}

.form-control {
  margin-bottom: 20px;
}

.error {
  color: red;
}


----------------------------------------------Components/youTubeForm.js----------------------------------------------------------
import React, { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
  name: 'Surya',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    whatsapp: '',
    instagram: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const savedValues = {
  name: 'Surya',
  email: 'surya@123.com',
  channel: 'suryaChannel',
  comments: 'we achived the moment',
  address: 'erode',
  social: {
    whatsapp: '',
    instagram: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const onSubmit = (values, submitProps) => {
  console.log('Form data', values);
  console.log('submitProps', submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
  comments: Yup.string().required('Required'),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
    >
      {(formik) => {
        console.log('Formik props', formik.values);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="YouTube channel name"
              />
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {({ field, form, meta }) => {
                  console.log('Field render');
                  return (
                    <div>
                      <input type="text" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="whatsapp">Whatsapp</label>
              <Field id="whatsapp" type="text" name="social.whatsapp"></Field>
            </div>
            <div className="form-control">
              <label htmlFor="instgram">Instagram</label>
              <Field id="instagram" type="text" name="social.instagram"></Field>
            </div>
            <div className="form-control">
              <label htmlFor="phoneNumbersOne">phoneNumbersOne</label>
              <Field
                id="phoneNumbersOne"
                type="number"
                name="phoneNumbers[0]"
              ></Field>
            </div>
            <div className="form-control">
              <label htmlFor="phoneNumbersTwo">phoneNumbersTwo</label>
              <Field
                id="phoneNumbersTwo"
                type="number"
                name="phoneNumbers[1]"
              ></Field>
            </div>

            <div className="form-control">
              <label>List of PhNumbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log('form.error', form.errors);

                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          <button type="button" onClick={() => remove(index)}>
                            {' '}
                            - {''}
                          </button>
                          <button type="button" onClick={() => push('')}>
                            {' '}
                            {''}+{''}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button type="button" onClick={()=>formik.validateField('comments')}>validate Comments</button>
            <button type="button" onClick={()=>formik.validateForm()}> validate All</button>

            <button type="button"  onClick={()=>formik.setFieldTouched('comments')}>visit Comments</button>
            <button type="button"  onclick={()=>formik.setTouched({
              name:true,
              email:true,
              channel:true,
              comments:true,
            })}> Vist Field</button> */}

            <button type="button" onClick={() => setFormValues(savedValues)}>
              Saved Value{' '}
            </button>

            <button type="reset">RESET</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;


-----------------------------------------components/errorText.js--------------------------
import React from 'react'

function TextError (props) {
  return <div className='error'>{props.children}</div>
}

export default TextError