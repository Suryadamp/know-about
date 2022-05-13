---------------------index.js----------------------
import React, { useState } from 'react'
import DialogBox from '../../../../components/Hoc/DialogBox'
import { Grid, Button, Box, Typography, Checkbox } from '@material-ui/core'
import {
    TextField,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
} from '@material-ui/core'
import { InputLabel, Select } from '@material-ui/core'
import Address from './CustomerAddress'
import CustomerDetails from './CustomerDetails'
import OtherDetails from './OtherDetails'
import { makeStyles } from '@material-ui/core'
import PersonDetails from './PersonDetails'

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#e0e0e0',
    },
})

const AddCustomerInformation = (props) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [customerDetails, setCustomerDetails] = useState({
        customer_type: '',
        salutation: '',
        firstname: '',
        lastname: '',
        domainname: '',
        business_category: '',
        workphone: '',
        mobile: '',
        email: '',
        website: '',
        taxable_type: '',
        gst_treatment: '',
        tan: '',
        taxable: '',
        exemption_reason: '',
        currency: '',
        payment_method: '',
        paymentterms: '',
        pricelist: '',
        same_address: '',
        line1: '',
        line2: '',
        pincode: '',
        pincode1: '',
        city: '',
        city1: '',
        district: '',
        district1: '',
        state: '',
        state1: '',
        gstn: '',
        pan: '',
        radioButton: '',
    })
    console.log(customerDetails)

    const [contactPerson, setContactPerson] = useState([
        {
            fName: '',
            lName: '',
            emailAddress: '',
            workPhoneInfo: '',
            mobileInfo: '',
        },
    ])

    const [error, setError] = useState(false)
    const [customerError, setCustomerError] = useState(false)
    const [otherError, setOtherError] = useState(false)
    const nextStep = () => {
        if (activeStep === 0) {
            if (
                !customerDetails.firstname ||
                !customerDetails.customer_type
                //  ||
                // !customerDetails.salutation ||
                // !customerDetails.lastname ||
                // !customerDetails.domainname ||
                // !customerDetails.email ||
                // !customerDetails.mobile ||
                // !customerDetails.workphone ||
                // !customerDetails.website
            ) {
                setCustomerError(true)
            } else {
                setActiveStep((currentStep) => currentStep + 1)
            }
        } else if (activeStep === 1) {
            if (
                !customerDetails.gst_treatment
                //  ||
                // !customerDetails.pan ||
                // !customerDetails.gstn ||
                // !customerDetails.tan ||
                // !customerDetails.currency ||
                // !customerDetails.payment_method
            ) {
                setOtherError(true)
            } else {
                setActiveStep((currentStep) => currentStep + 1)
            }
        } else if (activeStep === 2) {
            setActiveStep((currentStep) => currentStep + 1)

        }else if (activeStep === 3 ){
            setCustomerDetails((prevState) => ({
                ...prevState,
                contactPerson
            }))

            console.log(customerDetails)
        }
    }

    const prevStep = () => {
        if (activeStep === 0) {
            setActiveStep(0)
        } else setActiveStep((currentStep) => currentStep - 1)
    }

    const handleCustomerDetails = (e) => {
        const { name, value, checked } = e.target
        if (name === 'same_address') {
            setCustomerDetails((prevState) => ({
                ...prevState,
                [name]: checked,
            }))
            if (checked) {
                setCustomerDetails((prevState) => ({
                    ...prevState,
                    line2: customerDetails.line1,
                    pincode1: customerDetails.pincode,
                    city1: customerDetails.city,
                    state1: customerDetails.state,
                }))
            } else {
                setCustomerDetails((prevState) => ({
                    ...prevState,
                    line2: '',
                    pincode1: '',
                    city1: '',
                    state1: '',
                }))
            }
        } else {
            setCustomerDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }))
        }
    }

    const handlePersonDetails = (index, event) => {
        const values = [...contactPerson]
        console.log(contactPerson)
        values[index][event.target.name] = event.target.value
        setContactPerson(values)
    }

    const handleAddDetails = () => {
        setContactPerson([
            ...contactPerson,
            {
                fName: '',
                lName: '',
                emailAddress: '',
                workPhoneInfo: '',
                mobileInfo: '',
            },
        ])
    }

    const handleRemoveDetails = (index) => {
        const values = [...contactPerson]
        console.log("remove delete",values, index)
        values.splice(index, 1)
        setContactPerson(values)
    }

    const selectedAutoCompleted = (name, value) => {
        if (value == null) {
          value = [];
        }

        if (value) {
          setCustomerDetails(prevState => ({
            ...prevState,
            [name]: value.key
          }));
        }
      };
    return (
        <div>
            <DialogBox
                open={props.open}
                activeStep={activeStep}
                stepperLable={[
                    'Customer Detials',
                    'Other Detials',
                    'Address',
                    'Contact Preson',
                ]}
                title="Create new customer"
                onDialogClose={props.formDialogCloseHandler}
            >
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                    style={{ marginBlock: 1 }}
                >
                    {activeStep === 0 ? (
                        <CustomerDetails
                            customerDetails={customerDetails}
                            handleCustomerDetails={handleCustomerDetails}
                            selectedAutoCompleted={selectedAutoCompleted}
                            error={customerError}
                        />
                    ) : activeStep === 1 ? (
                        <OtherDetails
                            customerDetails={customerDetails}
                            handleCustomerDetails={handleCustomerDetails}
                            selectedAutoCompleted={selectedAutoCompleted}
                            error={otherError}
                        />
                    ) : activeStep === 2 ? (
                        <Address
                            customerDetails={customerDetails}
                            handleCustomerDetails={handleCustomerDetails}
                            // handleChecked={handleCheckBox}
                            error={error}
                        />
                    ) : (
                        <PersonDetails
                            contactPerson={contactPerson}
                            handlePersonDetails={handlePersonDetails}
                            handleAddDetails={handleAddDetails}
                            handleRemoveDetails={handleRemoveDetails}
                        />
                    )}
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                    <Box textAlign="right">
                        {activeStep === 0 ? (
                            ''
                        ) : activeStep === 3 ? (
                            <>
                                <Button
                                 variant="contained"
                                 color="secondary"
                                 className={classes.btn}
                                 style={{width:"20px"}}
                                >Cancel</Button>


                                <Button
                                    variant="contained"
                                    className={classes.btn}
                                    style={{ marginLeft: '20px' }}
                                    onClick={() => {
                                        prevStep()
                                    }}
                                >
                                    {' '}
                                    back{' '}
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                className={classes.btn}
                                // style={{ marginLeft: '60px' }}
                                onClick={() => {
                                    prevStep()
                                }}
                            >
                                {' '}
                                back{' '}
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '20px' }}
                            onClick={() => nextStep()}
                        >
                            {' '}
                            {activeStep === 3 ? 'Save' : 'Next'}
                        </Button>
                    </Box>
                </Grid>
            </DialogBox>
        </div>
    )
}

export default AddCustomerInformation



-----------------------------------customerDetails.js--------------------------
import React, { useState } from 'react'
import { Grid, Button, Box, Typography, Checkbox } from '@material-ui/core'
import {
    TextField,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
} from '@material-ui/core'
import { InputLabel, Select } from '@material-ui/core'
import {
    salutationMasterData,
    categoryMasterData

} from '../../../../utils/static.json'
import { MenuItem } from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'


const CustomerDetials = (props) => {
    const { handleCustomerDetails, customerDetails, error ,selectedAutoCompleted} = props

    return (
        <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
            style={{ paddingBlock: 20, width: 800 }}
        >
            {/* <Grid item md={4} sm={4} xs={12}>
                    <TextField
                        // component={FormTextInput}
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={customerDetails?.name}
                        onChange={handleCustomerDetails}
                        label="First Name"
                    />
                </Grid>
               */}

            {/* <Grid item md={12} sm={12} xs={12}>
                                <RadioButtons
                                    name="customer_type"
                                    label="Tax Preference"
                                    options={RadioOption}
                                />
                            </Grid> */}
            <Grid item md={12} sm={12} xs={12}>
                <FormControl error={error && !customerDetails.customer_type} >
                    <FormLabel>Tax Preference</FormLabel>
                    <RadioGroup
                        row
                        name="customer_type"
                       
                        value={customerDetails?.customer_type}
                        onChange={handleCustomerDetails}
                        // error={error && !customerDetails?.firstname}
                        // helperText={ customerDetails?.customer_type=== "" ? 'Empty field!' : ' '}
                    >
                        <FormControlLabel
                            value="business"

                            control={<Radio  color="primary" />}

                            label="Business"
                        />
                        <FormControlLabel
                            value="individual"
                            control={<Radio color="primary" />}
                            label="Individual"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item md={2} sm={2} xs={12}>
              
            
                  <Autocomplete
                  id="salutation"
                  name="salutation"
                  options={salutationMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('salutation', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Salutation"
                      name="salutation"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.salutation}
                    />
                  )}
                />
            </Grid>

            <Grid item md={4} sm={4} xs={12}>
                <TextField
                    // component={FormTextInput}
                    fullWidth
                    variant="outlined"
                    name="firstname"
                    size="small"
                    value={customerDetails?.firstname}
                    onChange={handleCustomerDetails}
                    label="First Name"
                    error={error && !customerDetails?.firstname}
                />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
                <TextField
                    className="min-w-188"
                    fullWidth
                    variant="outlined"
                    name="lastname"
                    label="Last Name"
                    size="small"
                    value={customerDetails?.lastname}
                    onChange={handleCustomerDetails}
                    // error={error && !customerDetails?.lastname}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <TextField
                    className="min-w-188"
                    fullWidth
                    variant="outlined"
                    name="domainname"
                    label="Domain Name"
                    size="small"
                    value={customerDetails?.domainname}
                    onChange={handleCustomerDetails}
                    // error={error && !customerDetails?.domainname}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
          
                  <Autocomplete
                  id="business_category"
                  name="business_category"
                  options={categoryMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('business_category', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Business Category"
                      name="business_category"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.business_category}
                    />
                  )}
                />
           
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <TextField
                    variant="outlined"
                    className="min-w-188"
                    fullWidth
                    name="workphone"
                    label="Work Phone"
                    size="small"
                    value={customerDetails?.workphone}
                    onChange={handleCustomerDetails}
                    // error={error && !customerDetails?.workphone}
                />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
                <TextField
                    className="min-w-188"
                    variant="outlined"
                    fullWidth
                    name="mobile"
                    label="Mobile"
                    size="small"
                    value={customerDetails?.mobile}
                    onChange={handleCustomerDetails}
                    // error={error && !customerDetails?.mobile}
                />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
                <TextField
                    className="min-w-188"
                    fullWidth
                    variant="outlined"
                    name="email"
                    label="Email"
                    size="small"
                    value={customerDetails?.email}
                    onChange={handleCustomerDetails}
                    // error={error && !customerDetails?.email}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <TextField
                    className="min-w-188"
                    fullWidth
                    variant="outlined"
                    name="website"
                    label="Website"
                    size="small"
                    value={customerDetails?.website}
                    onChange={handleCustomerDetails}
                    // error={error && !customerDetails?.website}
                />
            </Grid>
        </Grid>
    )
}
export default CustomerDetials;

---------------------------------------CustomerAddres.j------------------------
import React, { useState } from 'react'
import { Grid, Button, Box, Typography, Checkbox } from '@material-ui/core'
import {
    TextField,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
} from '@material-ui/core'
import { InputLabel, Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'



const Address = (props) => {
    
    const { customerDetails, handleCustomerDetails, handleCheckBox,error } = props
  



    return (
        <div>
            <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="center"
                style={{ paddingBlock: 20, width: 800 }}
            >
                <Grid item md={6} sm={6} xs={12}  >
                <Typography>Residential Address</Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={12} >
                 <Typography>Business Address</Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        value={customerDetails?.line1}
                        onChange={handleCustomerDetails}
                        variant="outlined"
                        name="line1"
                        label="Line1"
                        size="small"
                         error={error && !customerDetails?.line1}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        value={customerDetails?.line2}
                        onChange={handleCustomerDetails}
                        name="line2"
                        label="Line2"
                        size="small"
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="pincode"
                        value={customerDetails?.pincode}
                        onChange={handleCustomerDetails}
                        label="Pincode"
                        size="small"
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="pincode1"
                        label="Pincode1"
                        size="small"
                        value={customerDetails?.pincode1}
                        onChange={handleCustomerDetails}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="city"
                        size="small"
                        value={customerDetails?.city}
                        onChange={handleCustomerDetails}
                        label="City"
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        size="small"
                        name="city1"
                        value={customerDetails?.city1}
                        onChange={handleCustomerDetails}
                        label="City1"
                    />
                </Grid>
                {/* <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        value={customerDetails?.district}
                        onChange={handleCustomerDetails}
                        name="district"
                        label="District"
                    />
                </Grid> */}
                {/* <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        value={customerDetails?.district1}
                        onChange={handleCustomerDetails}
                        name="district1"
                        label="District1"
                    />
                </Grid> */}
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={customerDetails?.state}
                        onChange={handleCustomerDetails}
                        name="state"
                        label="State"
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="state1"
                        label="State1"
                        size="small"
                        value={customerDetails?.state1}
                        onChange={handleCustomerDetails}
                    />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <FormControlLabel
                     
                        control={<Checkbox 
                            style={{color:"primary"}}
                            name="same_address"
                            color="primary"
                            checked={customerDetails.same_address || false}
                            onChange={handleCustomerDetails}
                        />}
                        label="Copy Address"
                    />
                </Grid>
                <Grid item md={12} sm={12} xs={12}></Grid>
            </Grid>
        </div>
    )
}
export default Address;
-------------------------------------otherCustomer.js-----------------------------
import React from 'react'
import { Grid } from '@material-ui/core'
import {
    TextField,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
} from '@material-ui/core'

import {Autocomplete} from '@material-ui/lab'
import {
    currencyMasterData,
    paymenttermMasterData,
    gstMasterData,
    taxMasterData,
} from '../../../../utils/static.json';

const OtherDetails = (props) => {
    const { customerDetails, handleCustomerDetails, error,selectedAutoCompleted } = props
    return (
        <div>
            <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="center"
                style={{ paddingBlock: 20, width: 800 }}
            >
                <Grid item md={12} sm={12} xs={12}>
                   

                    <FormControl>
                        <FormLabel  >
                            Tax Preference
                        </FormLabel>
                        <RadioGroup
                            row
                            name="taxable_type"
                            value={customerDetails?.taxable_type}
                            onChange={handleCustomerDetails}
                            // error={error && !customerDetails?.taxable_type}
                        >
                            <FormControlLabel
                                value="taxable"
                                control={<Radio color="primary" />}
                                label="Taxable"
                            />
                            <FormControlLabel
                                value="taxable Exempt"
                                control={<Radio color="primary" />}
                                label="Taxable Exempt"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                 
                    <Autocomplete
                  id="gst_treatment"
                  name="gst_treatment"
                  options={gstMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('gst_treatment', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="GST Treatment"
                      name="gst_treatment"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.gst_treatment}
                      error={error && !customerDetails?.gst_treatment}
                    />
                  )}
                />
                </Grid>

                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="gstn"
                        label="GSTN"
                        size="small"
                        value={customerDetails?.gstn}
                        onChange={handleCustomerDetails}
                        // error={error && !customerDetails?.gstn}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="pan"
                        size="small"
                        label="PAN"
                        value={customerDetails?.pan}
                        onChange={handleCustomerDetails}
                        // error={error && !customerDetails?.pan}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className="min-w-188"
                        fullWidth
                        variant="outlined"
                        name="tan"
                        label="TAN"
                        size="small"
                        value={customerDetails?.tan}
                        onChange={handleCustomerDetails}
                        // error={error && !customerDetails?.tan}
                    />
                </Grid>

                {customerDetails?.taxable_type === 'taxable' ? (
                    <Grid item md={6} sm={6} xs={12}>
                         
                    <Autocomplete
                  id="tax"
                  name="tax"
                  options={taxMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('tax', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Tax"
                      name="tax"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.tax}
                    //   error={error && !customerDetails?.tax}
                    />
                  )}
                />
                        
                    </Grid>
                ) : (
                    <Grid item md={6} sm={6} xs={12}>
                     
                        <Autocomplete
                  id="exemption_reason"
                  name="exemption_reason"
                  options={gstMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('exemption_reason', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Exemption Reason"
                      name="exemption_reason"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.exemption_reason}
                    //   error={error && !customerDetails?.tax}
                    />
                  )}
                />

                    </Grid>
                )}

                <Grid item md={6} sm={6} xs={12}>
                 
                       <Autocomplete
                  id="currency"
                  name="currency"
                  options={currencyMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('currency', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Currency"
                      name="currency"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.currency}
                    //   error={error && !customerDetails?.currency}
                    />
                  )}
                />

                </Grid>

                <Grid item md={6} sm={6} xs={12}>
                 
                          <Autocomplete
                  id="payment_method"
                  name="payment_method"
                  options={paymenttermMasterData}
                  getOptionLabel={option => option.key}
                  onChange={(event, value) =>
                    selectedAutoCompleted('payment_method', value)
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Payment Method"
                      name="payment_method"
                      variant="outlined"
                      size="small"
                      required
                      onChange={e => handleCustomerDetails(e)}
                      value={customerDetails?.payment_method}
                    //   error={error && !customerDetails?.payment_method}
                    />
                  )}
                />
                </Grid>
                <Grid item md={6} sm={6} xs={12}></Grid>
            </Grid>
        </div>
    )
}
export default OtherDetails;
-------------------------productCustomer.js----------------------
import React, { useState } from 'react'
import { Grid, Typography,Tooltip,Fab, IconButton } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove"
// import RemoveIcon from '@mui/icons-material/Remove';


const PersonDetails = (props) => {
    const {contactPerson,handlePersonDetails,handleAddDetails,handleRemoveDetails}=props

    return (
        <div>
            {contactPerson.map((person,index) =>{


return(

    <Grid
    container
    spacing={1}
    alignItems="center"
    justifyContent="center"
    style={{ paddingBlock: 20, width: 800 }}
>
    <Grid item md={12} sm={12} xs={12} >
        <Typography>Person {index + 1}</Typography>
    </Grid>

    <Grid item md={2} sm={2} xs={12}>
    
        <TextField
            fullWidth
            variant="outlined"
            name="fName"
            label="FirstName"
            value={person?.fName}
            onChange={event=>handlePersonDetails(index,event)}
            size="small"
        />
    </Grid>
       
    <Grid item md={2} sm={2} xs={12}>
        <TextField
            fullWidth
            variant="outlined"
            name="lName"
            label="LastName"
            value={person.lName}
            onChange={event=>handlePersonDetails(index,event)}
            size="small"
        />
    </Grid>
 
    <Grid item md={2} sm={2} xs={12}>
        <TextField
            fullWidth
            variant="outlined"
            name="emailAddress"
            label="Email Address"
            value={person.emailAddress}
            onChange={event=>handlePersonDetails(index,event)}
            size="small"
        />
    </Grid>
    <Grid item md={2} sm={2} xs={12}>
        <TextField
            fullWidth
            variant="outlined"
            name="workPhoneInfo"
            label="Work Phone"
            value={person.workPhoneInfo}
            onChange={event=>handlePersonDetails(index,event)}
            size="small"
        />
    </Grid>
    <Grid item md={2} sm={2} xs={12}>
        <TextField
            fullWidth
            variant="outlined"
            name="mobileInfo"
            label="Mobile"
            value={person.mobileInfo}
            onChange={event=>handlePersonDetails(index,event)}
            size="small"
        />
    </Grid>
   
       <IconButton color="primary" >
           <AddIcon onClick={()=>handleAddDetails()}/>
       </IconButton> 
       { index === 0 ?( <IconButton >{" "} </IconButton>):( <IconButton color="secondary" >
           <RemoveIcon onClick={()=>handleRemoveDetails(index)}/>
       </IconButton>
)

       }
      
</Grid>
    
)

            })}
             <Grid item md={12} sm={12} xs={12}  style={{marginBlock:200}}></Grid>
        </div>
    )
}

export default PersonDetails



--------------------------------invoice.js-------------------------
import React, { useEffect } from 'react'
import { useAllsnackbar, useHttp } from 'app/hooks'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import DateFnsUtils from '@date-io/date-fns'
import {
    Grid,
    Card,
    Divider,
    Select,
    MenuItem,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
// import SalesItemTable from '../CounterSales/SalesItemTable'
import {
    Breadcrumb,
    FormTextInput,
    FormFileInput,
    FormAutoCompleteInput,
} from 'app/components'
import {
    TaxCalcHandler,
    TotalCalcHandler,
    setField,
} from 'app/utils/aggregate-calculations'
import InvoiceItemTable from './InvoiceItemTable'
import { TextField } from '@mui/material'

const AddCounterSales = () => {
    const { successSnackBar, errorSnackBar } = useAllsnackbar()
    let ProductData = []
    let itemQty = 0

    const calculateAmount = (values, setFieldValue) => {
        TaxCalcHandler(values, setFieldValue).then((tax_data) => {
            if (tax_data !== undefined) {
                values.discount = Number(tax_data.return_discount).toFixed(2)
                values.taxArr = tax_data.taxArr
            }
            TotalCalcHandler(values, setFieldValue)
            itemQty = values.items.filter(
                (item) => item.amount !== 0 && item.amount !== '0'
            ).length
        })
    }

    const keypressHandler = (event, values) => {
        if (event.key === 'Enter') {
            event.target.blur()
            handleSubmit(values)
        }
    }

    const {
        sendRequest: postDetail,
        status: PostDetailStatus,
        data: PostDetailData,
        error: PostDetailError,
    } = useHttp(false)
    const { sendRequest: fetchCustomerList, data: CustomerDropdownData } =
        useHttp(true)
    const { sendRequest: fetchBranchList, data: BranchDropdownData } =
        useHttp(true)
    const { sendRequest: fetchStoreList, data: StoreDropdownData } =
        useHttp(true)
    const { sendRequest: fetchProductList, data: ProductDropdownData } =
        useHttp(true)
    if (ProductDropdownData.status === 'success') {
        ProductData = ProductDropdownData
    }

    const handleSubmit = async (values) => {
        console.log(values)
        postDetail({
            url: '/invoice',
            method: 'POST',
            data: values,
            withCredentials: true,
        })
    }

    useEffect(() => {
        if (PostDetailStatus === 'completed' && PostDetailData.data) {
            successSnackBar(PostDetailData.message)
        }
        if (PostDetailStatus === 'completed' && PostDetailError) {
            errorSnackBar(PostDetailError.message)
        }
    }, [
        PostDetailStatus,
        PostDetailError,
        PostDetailData.message,
        PostDetailData.data,
    ])

    useEffect(() => {
        fetchCustomerList({ url: `/customer?isNonMaster=yes` })
        fetchBranchList({ url: `/branch?isNonMaster=yes` })
        fetchStoreList({ url: `/store?isNonMaster=yes` })
        fetchProductList({ url: `/product?isNonMaster=yes` })
    }, [fetchCustomerList, fetchBranchList, fetchStoreList])

    const validationSchema = Yup.object({
        // vendor_id: Yup.string()
        //     .required('Required')
    })

    const storeChangeHandler = (data, setFieldValue) => {
        console.log(data)
        setField(
            [
                { key: 'store_id', value: data },
                { key: 'items', value: [emptyItems] },
                { key: 'sub_total', value: 0 },
                { key: 'tax_type', value: 'after' },
                { key: 'discount_value', value: 0 },
                { key: 'discount_type', value: 'percentage' },
                { key: 'discount', value: 0 },
                { key: 'taxArr', value: [] },
                { key: 'total_amount', value: 0 },
            ],
            setFieldValue
        )
        // if (data !== null)
        //     fetchProductList({ url: `/purchasestock/` + data._id })
        // else ProductData = []
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Invoices', path: '/invoices' },
                        { name: 'New' },
                    ]}
                />
            </div>
            <Card elevation={3}>
                <div className="flex p-4">
                    <h4 className="m-0">New Invoice</h4>
                </div>
                <Divider className="mb-2" />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    enableReinitialize={true}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <Form
                            className="p-4"
                            onKeyDown={(event) =>
                                keypressHandler(event, values)
                            }
                            onSubmit={handleSubmit}
                        >
                            {/* <FormCalculation /> */}
                            {/* onKeyDown={event => keypressHandler(event)}  */}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <Field
                                        name="customer_id"
                                        style={{ width: '40%' }}
                                        component={FormAutoCompleteInput}
                                        label="Customer"
                                        options={
                                            CustomerDropdownData.data
                                                ? CustomerDropdownData.data
                                                : []
                                        }
                                        value={values.customer_id}
                                        onChange={(_, value) =>
                                            setFieldValue(
                                                `customer_id`,
                                                value !== null ? value : ''
                                            )
                                        }
                                        getOptionSelected={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.firstname || ''
                                        }
                                        textFieldProps={{ fullWidth: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={FormTextInput}
                                        className="min-w-400"
                                        label="Invoice No"
                                        name="invoiceNo"
                                        size="small"
                                        variant="outlined"
                                        defaultValue="INV-000001"
                                        value={values.invoiceNo}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="flex flex-wrap m--2">
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="m-2"
                                                margin="none"
                                                style={{ width: '19.5%' }}
                                                label="Invoice Date"
                                                inputVariant="outlined"
                                                type="text"
                                                size="small"
                                                autoOk={true}
                                                value={values.invoice_date}
                                                name="invoice_date"
                                                format="dd/MM/yyyy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'invoice_date',
                                                        date
                                                    )
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                        <Field
                                        name="terms"
                                        style={{ width: '19%' }}
                                        component={FormAutoCompleteInput}
                                        label="Terms"
                                        options={
                                            CustomerDropdownData.data
                                                ? CustomerDropdownData.data
                                                : []
                                        }
                                        value={values.terms}
                                        onChange={(_, value) =>
                                            setFieldValue(
                                                `terms`,
                                                value !== null ? value : ''
                                            )
                                        }
                                        getOptionSelected={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.firstname || ''
                                        }
                                        textFieldProps={{ fullWidth: true }}
                                    />


                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="m-2"
                                                margin="none"
                                                label="Due Date"
                                                style={{ width: '19%' }}
                                                inputVariant="outlined"
                                                type="text"
                                                size="small"
                                                autoOk={true}
                                                name="due_date" 
                                                value={values.due_date}
                                                format="dd/MM/yyyy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'due_date',
                                                        date
                                                    )
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="sales_person"
                                        style={{ width: '40%' }}
                                        component={FormAutoCompleteInput}
                                        label="Sales Person"
                                        options={
                                            CustomerDropdownData.data
                                                ? CustomerDropdownData.data
                                                : []
                                        }
                                        value={values.customer_id}
                                        onChange={(_, value) =>
                                            setFieldValue(
                                                `sales_person`,
                                                value !== null ? value : ''
                                            )
                                        }
                                        getOptionSelected={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.firstname || ''
                                        }
                                        textFieldProps={{ fullWidth: true }}
                                    />
                                </Grid>  

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            <div className="mb-8">
                                <InvoiceItemTable
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    emptyItems={emptyItems}
                                    ProductDropdownData={ProductData}
                                />
                            </div>

                            <div className="mb-8">
                                <Grid container spacing={3}>
                                <Grid item xs={6}>
                                        <Grid xs={3} style={{marginBlock:"135px"}}>

                                        </Grid>
                                        <Grid xs={6}>
                                     
                                          <Field
                                        component={FormTextInput}
                                        className="min-w-400"
                                        label="Customer Notes"
                                        name="customer_notes"
                                        size="small"
                                        variant="outlined"
                                        placeholder='Looking forward for your business.'
                                        multiline
                                        rows={3}
                                        value={values.customer_notes}
                                    />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card
                                            className="bg-default p-4"
                                            elevation={0}
                                        >
                                            <Grid
                                                container
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item xs={6}>
                                                    Sub Total
                                                    <br />
                                                    <small>
                                                        Total Quantity :{' '}
                                                        {
                                                            values.items.filter(
                                                                (item) =>
                                                                    item.amount !==
                                                                        0 &&
                                                                    item.amount !==
                                                                        '0'
                                                            ).length
                                                        }
                                                    </small>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        {values.sub_total}
                                                    </div>
                                                </Grid>

                                                {/* {values.tax_type ===
                                                'before' ? (
                                                    <>
                                                        <Grid item xs={4}>
                                                            Discount
                                                            <br />
                                                            <label>
                                                                <Field
                                                                    type="radio"
                                                                    hidden
                                                                    name="tax_type"
                                                                    value="after"
                                                                />
                                                                <small
                                                                    style={{
                                                                        color: '#2485e8',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        values.tax_type =
                                                                            'after'
                                                                        calculateAmount(
                                                                            values,
                                                                            setFieldValue
                                                                        )
                                                                    }}
                                                                >
                                                                    Apply
                                                                    AfterTax
                                                                </small>
                                                            </label>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Field
                                                                component={
                                                                    FormTextInput
                                                                }
                                                                name="discount_value"
                                                                onBlur={(e) => {
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                                InputProps={{
                                                                    style: {
                                                                        paddingRight: 0,
                                                                    },
                                                                    endAdornment:
                                                                        (
                                                                            <FormControl>
                                                                                <Select
                                                                                    name="discount_type"
                                                                                    margin="none"
                                                                                    variant="standard"
                                                                                    disableUnderline
                                                                                    value={
                                                                                        values.discount_type ||
                                                                                        '%'
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        values.discount_type =
                                                                                            e.target.value
                                                                                        calculateAmount(
                                                                                            values,
                                                                                            setFieldValue
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <MenuItem value="percentage">
                                                                                        %
                                                                                    </MenuItem>
                                                                                    <MenuItem value="rupee">
                                                                                        &#x20B9;
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        ),
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <div className="text-right m-0">
                                                                {values.discount >
                                                                0
                                                                    ? '-'
                                                                    : ''}{' '}
                                                                {
                                                                    values.discount
                                                                }
                                                            </div>
                                                        </Grid>
                                                    </>
                                                ) : null} */}

                                                {values.taxArr != null &&
                                                values.taxArr.length > 0
                                                    ? values.taxArr.map(
                                                          (data) => (
                                                              <>
                                                                  <Grid
                                                                      item
                                                                      xs={6}
                                                                  >
                                                                      {
                                                                          data.title
                                                                      }{' '}
                                                                      [
                                                                      {data.key}
                                                                      %]
                                                                  </Grid>
                                                                  <Grid
                                                                      item
                                                                      xs={6}
                                                                      className="text-right"
                                                                  >
                                                                      {data.value.toFixed(
                                                                          2
                                                                      )}
                                                                  </Grid>
                                                              </>
                                                          )
                                                      )
                                                    : null}

                                                <>
                                                    <Grid item xs={4}>
                                                        Discount
                                                        <br />
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                hidden
                                                                name="tax_type"
                                                                value="before"
                                                            />
                                                            {/* <small
                                                                style={{
                                                                    color: '#2485e8',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    values.tax_type =
                                                                        'before'
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                            >
                                                                Apply BeforeTax
                                                            </small> */}
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <FormControl>
                                                            <OutlinedInput
                                                                style={{height:40}}
                                                                id="outlined-adornment-weight"
                                                                value={
                                                                    values.discount_value 
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    values.discount_type = 'rupee'
                                                                    values.discount_value =
                                                                        e.target.value
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        &#x20B9;
                                                                    </InputAdornment>
                                                                }
                                                                aria-describedby="outlined-weight-helper-text"
                                                                inputProps={{
                                                                    'aria-label':
                                                                        'weighttttt',
                                                                }}
                                                                labelWidth={0}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <div className="text-right m-0">
                                                            {values.discount > 0
                                                                ? '-'
                                                                : ''}{' '}
                                                            {values.discount}
                                                        </div>
                                                    </Grid>
                                                </>
                                                <>
                                                    <Grid item xs={4}>
                                                        Adjustments
                                                        <br />
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                hidden
                                                                name="tax_type"
                                                                value="before"
                                                            />
                                                            {/* <small
                                                                style={{
                                                                    color: '#2485e8',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    values.tax_type =
                                                                        'before'
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                            >
                                                                Apply BeforeTax
                                                            </small> */}
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <FormControl>
                                                            <OutlinedInput
                                                                style={{height:40}}
                                                                id="outlined-adornment-weight"
                                                                value={
                                                                    values.discount_value 
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    values.discount_type = 'rupee'
                                                                    values.discount_value =
                                                                        e.target.value
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        &#x20B9;
                                                                    </InputAdornment>
                                                                }
                                                                aria-describedby="outlined-weight-helper-text"
                                                                inputProps={{
                                                                    'aria-label':
                                                                        'weighttttt',
                                                                }}
                                                                labelWidth={0}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4}>
                                                        <div className="text-right m-0">
                                                            {values.adjustments > 0
                                                                ? '-'
                                                                : ''}{' '}
                                                            {values.adjustments}
                                                        </div>
                                                    </Grid>
                                                </>


                                                <Grid item xs={6}>
                                                    <h5 className="m-0">
                                                        Total ( &#x20B9; )
                                                    </h5>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        <h5 className="m-0">
                                                            {
                                                                values.total_amount
                                                            }
                                                        </h5>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Grid xs={6}>
                                     
                                        <Field
                                        component={FormTextInput}
                                        className="min-w-400"
                                        label="Terms And Conditions"
                                        name="terms_conditions"
                                        size="small"
                                        variant="outlined"
                                        
                                        placeholder='Enter the terms and conditions of your business to be displayed in your transaction'
                                        multiline
                                        rows={4}
                                        value={values.terms_conditions}
                                    />


                                        </Grid>
                                        <Grid xs={6} style={{marginBlock:"30px"}}>
                                        <Field
                                        style={{marginLeft:"50px"}}
                                component={FormFileInput}
                                name="images"
                                size="small"
                                multiple
                                onChange={(e) => {
                                    setFieldValue('images', e.target.files)
                                }}
                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="mt-6">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

const emptyItems = {
    product_id: '',
    stockqty: '',
    approved_qty: '',
    rate: '',
    tax: '',
    amount: 0.0,
}

const initialValues = {
    sales_type: 'countersales',
    invoice_id: 'INV-000001',
    invoice_date: new Date(),
    due_date: new Date(),
    tax_type: 'after',
    discount_type: 'rupee',
    items: [emptyItems],
    taxArr: [],
    discount_value: 0,
    sub_total: 0,
    discount: 0,
    total_amount: 0,
    customer_id: '',
    branch_id: '',
    store_id: '',
    adjustments:0,
    terms:'',
    terms_conditions:'',
    customer_notes:'',

}

export default AddCounterSales


-------------------------------------addEstiemate.js--------------------
import React, { useEffect } from 'react'
import { useAllsnackbar, useHttp } from 'app/hooks'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import DateFnsUtils from '@date-io/date-fns'
import {
    Grid,
    Card,
    Divider,
    Select,
    MenuItem,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
// import SalesItemTable from '../CounterSales/SalesItemTable'
import {
    Breadcrumb,
    FormTextInput,
    FormFileInput,
    FormAutoCompleteInput,
} from 'app/components'
import {
    TaxCalcHandler,
    TotalCalcHandler,
    setField,
} from 'app/utils/aggregate-calculations'
import InvoiceItemTable from './EstimateItemTable'
import { TextField } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
    customTextField: {
      "& input::placeholder": {
        fontSize: "5px"
      }
    }
  })

  

const AddCounterSales = () => {
    const { successSnackBar, errorSnackBar } = useAllsnackbar()
    let ProductData = []
    let itemQty = 0

    const classes=useStyles()
    const calculateAmount = (values, setFieldValue) => {
        TaxCalcHandler(values, setFieldValue).then((tax_data) => {
            if (tax_data !== undefined) {
                values.discount = Number(tax_data.return_discount).toFixed(2)
                values.taxArr = tax_data.taxArr
            }
            TotalCalcHandler(values, setFieldValue)
            itemQty = values.items.filter(
                (item) => item.amount !== 0 && item.amount !== '0'
            ).length
        })
    }

    const keypressHandler = (event, values) => {
        if (event.key === 'Enter') {
            event.target.blur()
            handleSubmit(values)
        }
    }

    const {
        sendRequest: postDetail,
        status: PostDetailStatus,
        data: PostDetailData,
        error: PostDetailError,
    } = useHttp(false)
    const { sendRequest: fetchCustomerList, data: CustomerDropdownData } =
        useHttp(true)
    const { sendRequest: fetchBranchList, data: BranchDropdownData } =
        useHttp(true)
    const { sendRequest: fetchStoreList, data: StoreDropdownData } =
        useHttp(true)
    const { sendRequest: fetchProductList, data: ProductDropdownData } =
        useHttp(true)
    if (ProductDropdownData.status === 'success') {
        ProductData = ProductDropdownData
    }

    const handleSubmit = async (values) => {
        console.log(values)
        postDetail({
            url: '/invoice',
            method: 'POST',
            data: values,
            withCredentials: true,
        })
    }

    useEffect(() => {
        if (PostDetailStatus === 'completed' && PostDetailData.data) {
            successSnackBar(PostDetailData.message)
        }
        if (PostDetailStatus === 'completed' && PostDetailError) {
            errorSnackBar(PostDetailError.message)
        }
    }, [
        PostDetailStatus,
        PostDetailError,
        PostDetailData.message,
        PostDetailData.data,
    ])

    useEffect(() => {
        fetchCustomerList({ url: `/customer?isNonMaster=yes` })
        fetchBranchList({ url: `/branch?isNonMaster=yes` })
        fetchStoreList({ url: `/store?isNonMaster=yes` })
        fetchProductList({ url: `/product?isNonMaster=yes` })
    }, [fetchCustomerList, fetchBranchList, fetchStoreList])

    const validationSchema = Yup.object({
        // vendor_id: Yup.string()
        //     .required('Required')
    })

    const storeChangeHandler = (data, setFieldValue) => {
        console.log(data)
        setField(
            [
                { key: 'store_id', value: data },
                { key: 'items', value: [emptyItems] },
                { key: 'sub_total', value: 0 },
                { key: 'tax_type', value: 'after' },
                { key: 'discount_value', value: 0 },
                { key: 'discount_type', value: 'percentage' },
                { key: 'discount', value: 0 },
                { key: 'taxArr', value: [] },
                { key: 'total_amount', value: 0 },
            ],
            setFieldValue
        )
        // if (data !== null)
        //     fetchProductList({ url: `/purchasestock/` + data._id })
        // else ProductData = []
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Estimates', path: '/estimates' },
                        { name: 'New' },
                    ]}
                />
            </div>
            <Card elevation={3}>
                <div className="flex p-4">
                    <h4 className="m-0">New Estimate</h4>
                </div>
                <Divider className="mb-2" />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    enableReinitialize={true}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <Form
                            className="p-4"
                            onKeyDown={(event) =>
                                keypressHandler(event, values)
                            }
                            onSubmit={handleSubmit}
                        >
                            {/* <FormCalculation /> */}
                            {/* onKeyDown={event => keypressHandler(event)}  */}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <Field
                                        name="customer_id"
                                        style={{ width: '40%' }}
                                        component={FormAutoCompleteInput}
                                        label="Customer"
                                        options={
                                            CustomerDropdownData.data
                                                ? CustomerDropdownData.data
                                                : []
                                        }
                                        value={values.customer_id}
                                        onChange={(_, value) =>
                                            setFieldValue(
                                                `customer_id`,
                                                value !== null ? value : ''
                                            )
                                        }
                                        getOptionSelected={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.firstname || ''
                                        }
                                        textFieldProps={{ fullWidth: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={FormTextInput}
                                        className="min-w-400"
                                        label="Estimate No"
                                        name="estimate_no"
                                        size="small"
                                        variant="outlined"
                                        defaultValue="EST-000001"
                                        value={values.invoiceNo}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="flex flex-wrap m--2">
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="m-2"
                                                margin="none"
                                                style={{ width: '19.5%' }}
                                                label="Estimate Date"
                                                inputVariant="outlined"
                                                type="text"
                                                size="small"
                                                autoOk={true}
                                                value={values.estimate_date}
                                                name="estimate_date"
                                                format="dd/MM/yyyy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'estimate_date',
                                                        date
                                                    )
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                        <Field
                                        name="terms"
                                        style={{ width: '19%' }}
                                        component={FormAutoCompleteInput}
                                        label="Terms"
                                        options={
                                            CustomerDropdownData.data
                                                ? CustomerDropdownData.data
                                                : []
                                        }
                                        value={values.terms}
                                        onChange={(_, value) =>
                                            setFieldValue(
                                                `terms`,
                                                value !== null ? value : ''
                                            )
                                        }
                                        getOptionSelected={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.firstname || ''
                                        }
                                        textFieldProps={{ fullWidth: true }}
                                    />

                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="m-2"
                                                margin="none"
                                                style={{ width: '19.5%' }}
                                                label="Expiry Date"
                                                inputVariant="outlined"
                                                type="text"
                                                size="small"
                                                autoOk={true}
                                                name="expiry_date"
                                                value={values.expiry_date}
                                                format="dd/MM/yyyy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'expiry_date',
                                                        date
                                                    )
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        name="sales_person"
                                        style={{ width: '40%' }}
                                        component={FormAutoCompleteInput}
                                        label="Sales Person"
                                        options={
                                            CustomerDropdownData.data
                                                ? CustomerDropdownData.data
                                                : []
                                        }
                                        value={values.customer_id}
                                        onChange={(_, value) =>
                                            setFieldValue(
                                                `sales_person`,
                                                value !== null ? value : ''
                                            )
                                        }
                                        getOptionSelected={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.firstname || ''
                                        }
                                        textFieldProps={{ fullWidth: true }}
                                    />
                                </Grid>         

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            <div className="mb-8">
                                <InvoiceItemTable
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    emptyItems={emptyItems}
                                    ProductDropdownData={ProductData}
                                />
                            </div>

                            <div className="mb-8">
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Grid xs={3} style={{marginBlock:"135px"}}>

                                        </Grid>
                                        <Grid xs={6}>
                                       
                                       
                                        <Field
                                        component={FormTextInput}
                                        className="min-w-400"
                                        label="Customer Notes"
                                        name="customer_notes"
                                        size="small"
                                        variant="outlined"
                                        placeholder='Looking forward for your business.'
                                        multiline
                                        rows={3}
                                        value={values.customer_notes}
                                    />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card
                                            className="bg-default p-4"
                                            elevation={0}
                                        >
                                            <Grid
                                                container
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item xs={6}>
                                                    Sub Total
                                                    <br />
                                                    <small>
                                                        Total Quantity :{' '}
                                                        {
                                                            values.items.filter(
                                                                (item) =>
                                                                    item.amount !==
                                                                        0 &&
                                                                    item.amount !==
                                                                        '0'
                                                            ).length
                                                        }
                                                    </small>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        {values.sub_total}
                                                    </div>
                                                </Grid>

                                                {/* {values.tax_type ===
                                                'before' ? (
                                                    <>
                                                        <Grid item xs={4}>
                                                            Discount
                                                            <br />
                                                            <label>
                                                                <Field
                                                                    type="radio"
                                                                    hidden
                                                                    name="tax_type"
                                                                    value="after"
                                                                />
                                                                <small
                                                                    style={{
                                                                        color: '#2485e8',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        values.tax_type =
                                                                            'after'
                                                                        calculateAmount(
                                                                            values,
                                                                            setFieldValue
                                                                        )
                                                                    }}
                                                                >
                                                                    Apply
                                                                    AfterTax
                                                                </small>
                                                            </label>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Field
                                                                component={
                                                                    FormTextInput
                                                                }
                                                                name="discount_value"
                                                                onBlur={(e) => {
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                                InputProps={{
                                                                    style: {
                                                                        paddingRight: 0,
                                                                    },
                                                                    endAdornment:
                                                                        (
                                                                            <FormControl>
                                                                                <Select
                                                                                    name="discount_type"
                                                                                    margin="none"
                                                                                    variant="standard"
                                                                                    disableUnderline
                                                                                    value={
                                                                                        values.discount_type ||
                                                                                        '%'
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        values.discount_type =
                                                                                            e.target.value
                                                                                        calculateAmount(
                                                                                            values,
                                                                                            setFieldValue
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <MenuItem value="percentage">
                                                                                        %
                                                                                    </MenuItem>
                                                                                    <MenuItem value="rupee">
                                                                                        &#x20B9;
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        ),
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <div className="text-right m-0">
                                                                {values.discount >
                                                                0
                                                                    ? '-'
                                                                    : ''}{' '}
                                                                {
                                                                    values.discount
                                                                }
                                                            </div>
                                                        </Grid>
                                                    </>
                                                ) : null} */}

                                                {values.taxArr != null &&
                                                values.taxArr.length > 0
                                                    ? values.taxArr.map(
                                                          (data) => (
                                                              <>
                                                                  <Grid
                                                                      item
                                                                      xs={6}
                                                                  >
                                                                      {
                                                                          data.title
                                                                      }{' '}
                                                                      [
                                                                      {data.key}
                                                                      %]
                                                                  </Grid>
                                                                  <Grid
                                                                      item
                                                                      xs={6}
                                                                      className="text-right"
                                                                  >
                                                                      {data.value.toFixed(
                                                                          2
                                                                      )}
                                                                  </Grid>
                                                              </>
                                                          )
                                                      )
                                                    : null}

                                                <>
                                                    <Grid item xs={4}>
                                                        Discount
                                                        <br />
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                hidden
                                                                name="tax_type"
                                                                value="before"
                                                            />
                                                            {/* <small
                                                                style={{
                                                                    color: '#2485e8',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    values.tax_type =
                                                                        'before'
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                            >
                                                                Apply BeforeTax
                                                            </small> */}
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <FormControl>
                                                            <OutlinedInput
                                                                style={{height:40}}
                                                                id="outlined-adornment-weight"
                                                                value={
                                                                    values.discount_value 
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    values.discount_type = 'rupee'
                                                                    values.discount_value =
                                                                        e.target.value
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        &#x20B9;
                                                                    </InputAdornment>
                                                                }
                                                                aria-describedby="outlined-weight-helper-text"
                                                                inputProps={{
                                                                    'aria-label':
                                                                        'weighttttt',
                                                                }}
                                                                labelWidth={0}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4}>
                                                        <div className="text-right m-0">
                                                            {values.discount > 0
                                                                ? '-'
                                                                : ''}{' '}
                                                            {values.discount}
                                                        </div>
                                                    </Grid>
                                                </>

                                                <>
                                                    <Grid item xs={4}>
                                                        Adjustments
                                                        <br />
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                hidden
                                                                name="tax_type"
                                                                value="before"
                                                            />
                                                            {/* <small
                                                                style={{
                                                                    color: '#2485e8',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    values.tax_type =
                                                                        'before'
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                            >
                                                                Apply BeforeTax
                                                            </small> */}
                                                        </label>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <FormControl>
                                                            <OutlinedInput
                                                                style={{height:40}}
                                                                id="outlined-adornment-weight"
                                                                value={
                                                                    values.discount_value 
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    values.discount_type = 'rupee'
                                                                    values.discount_value =
                                                                        e.target.value
                                                                    calculateAmount(
                                                                        values,
                                                                        setFieldValue
                                                                    )
                                                                }}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        &#x20B9;
                                                                    </InputAdornment>
                                                                }
                                                                aria-describedby="outlined-weight-helper-text"
                                                                inputProps={{
                                                                    'aria-label':
                                                                        'weighttttt',
                                                                }}
                                                                labelWidth={0}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4}>
                                                        <div className="text-right m-0">
                                                            {values.adjustments > 0
                                                                ? '-'
                                                                : ''}{' '}
                                                            {values.adjustments}
                                                        </div>
                                                    </Grid>
                                                </>

                                                <Grid item xs={6}>
                                                    <h5 className="m-0">
                                                        Total ( &#x20B9; )
                                                    </h5>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        <h5 className="m-0">
                                                            {
                                                                values.total_amount
                                                            }
                                                        </h5>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Grid xs={6}>
                                        {/* <TextField
                                       variant='outlined'
                                       label="Terms And Conditions"
                                       name="terms_conditions"
                                       placeholder='Enter the terms and conditions of your business to be displayed in your transaction'
                                       multiline
                                       rows={4}
                                    fullWidth
                                    
                                       >

                                       </TextField>  */}
                                         <Field
                                        component={FormTextInput}
                                        className="min-w-400"
                                        label="Terms And Conditions"
                                        name="terms_conditions"
                                        size="small"
                                        variant="outlined"
                                        
                                        placeholder='Enter the terms and conditions of your business to be displayed in your transaction'
                                        multiline
                                        rows={4}
                                        value={values.terms_conditions}
                                    />

                                        </Grid>
                                        <Grid xs={6} style={{marginBlock:"30px"}}>
                                        <Field
                                        style={{marginLeft:"50px"}}
                                component={FormFileInput}
                                name="images"
                                size="small"
                                multiple
                                onChange={(e) => {
                                    setFieldValue('images', e.target.files)
                                }}
                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="mt-6">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

const emptyItems = {
    product_id: '',
    stockqty: '',
    approved_qty: '',
    rate: '',
    tax: '',
    amount: 0.0,
}

const initialValues = {
    sales_type: 'countersales',
    estimate_no: 'INV-000001',
    estimate_date: new Date(),
    expiry_date: new Date(),
    tax_type: 'after',
    discount_type: 'rupee',
    items: [emptyItems],
    taxArr: [],
    discount_value: 0,
    sub_total: 0,
    discount: 0,
    adjustments:0,
    total_amount: 0,
    customer_id: '',
    store_id: '',
    terms:'',
    terms_conditions:'',
    customer_notes:'',

}

export default AddCounterSales


