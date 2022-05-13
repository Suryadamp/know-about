------------------------------addCUster index.js----------------------
import React, { useState ,useCallback} from 'react'
import DialogBox from '../../../../components/Hoc/DialogBox'
import { useHttp, useAllsnackbar } from 'app/hooks'

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

const initialValue ={
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
    pricelist:null,
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
    radioButton: null,
    contactPerson:[]   
}

const Initialperson = [
    {
        fName: '',
        lName: '',
        emailAddress: '',
        workPhoneInfo: '',
        mobileInfo: '',
    },
]

const AddCustomerInformation = (props) => {
    const {formDialogCloseHandler,formSubmitHandler}=props
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [customerDetails, setCustomerDetails] = useState(initialValue)
    const [contactPerson, setContactPerson] = useState(Initialperson)
   
    const [error, setError] = useState(false)
    const [customerError, setCustomerError] = useState(false)
    const [otherError, setOtherError] = useState(false)

    const {
        sendRequest: postDetail,
        status: PostDetailStatus,
        data: PostDetailData,
        error: PostDetailError,
    } = useHttp(false)
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
            if(contactPerson){
                const updatedCustomer = {
                    ...customerDetails,
                    contactPerson,
                }
                detailSubmitHandler(updatedCustomer)
                
            }
            getCall()
            // setContactPerson(Initialperson)
            // formDialogCloseHandler()
            // setActiveStep(0)
            
        }
    }
    const prevStep = () => {
        if (activeStep === 0) {
            setActiveStep(0)
        } else setActiveStep((currentStep) => currentStep - 1)
    }
    
    console.log(contactPerson)
    const getCall = ()=>{
        console.log("after get called the sate ",customerDetails)
    }
    console.log("after setting the sate ",customerDetails)

    const handleCustomerDetails = (e) => {
        console.log(customerDetails)
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
            console.log("handle change is called")
            setCustomerDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }))
        }
    }

    const handlePersonDetails = (index, event) => {
        const values = [...contactPerson]
        console.log("handling contact person")
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
            [name]: value
          }));
        }
      };
      const detailSubmitHandler = useCallback(
        (values) => {
            console.log("handle submit data",values)
            if (values._id) {
                console.log(values)
                postDetail({
                    url: `/customer/${values._id}`,
                    method: 'PATCH',
                    data: values,
                    withCredentials: true,
                })
            } else {
                console.log(values)
                postDetail({
                    url: '/customer',
                    method: 'POST',
                    data: values,
                    withCredentials: true,
                })
            }
            formDialogCloseHandler()
            setCustomerDetails(initialValue)
            setContactPerson([{
                fName: '',
                lName: '',
                emailAddress: '',
                workPhoneInfo: '',
                mobileInfo: '',
            },

        ])
     
        setActiveStep(0)
        },
        [postDetail]
    )

   const handleCancel=()=>{
       console.log('initial value on cancel')
       formDialogCloseHandler()
        setCustomerDetails(initialValue)
        setContactPerson([{ fName: '',
        lName: '',
        emailAddress: '',
        workPhoneInfo: '',
        mobileInfo: '',}])
        setActiveStep(0)
        
         
    }

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
                onDialogClose={formDialogCloseHandler}
            
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
                                 onClick={handleCancel}
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


----------------------------Listcustorme.js--------------------------
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useHttp, useAllsnackbar } from 'app/hooks'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { Button, Grid, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import {
    Breadcrumb,
    SimpleCard,
    DataTableComponent as DataTable,
    DeleteButton,
    LoaderOverlay,
} from 'app/components'
import { default as ConfirmationDialog } from 'app/contexts/ConfirmationDialogContext'
// import AddCustomerForm from './AddCustomerForm'
import AddCustomerInformation from'./AddCustomer/index.jsx'

const tableListConfirmDialog = 'Do you want to delete this customer?'
const initialValue = {
    customer_type: '',
    salutation: '',
    firstname: '',
    lastname: '',
    domainname: '',
    businesscategory: '',
    workphone:'',
    mobile: '',
    email: '',
    website:'',
    textable_type:'',
    gst_treatment:'',
    tan:'',
    taxable:'',
    exemption_reason:'',
    currency:'',
    payment_method:'',
    paymentterms:'',
    pricelist: '',
    line1: '',
    line2: '',
    pincode: '',
    pincode1:'',
    city: '',
    city1:'',
    district: '',
    district1:'',
    state: '',
    state1: '',
    gstn: '',
    pan: '',
    radioButton:'',
   
}

export default function ListCustomers() {
    const { successSnackBar, errorSnackBar } = useAllsnackbar()
    const location = useLocation()
    const [formDialogOpen, setFormDialogOpen] = useState(false)
    const [formData, setFormData] = useState(initialValue)
   
    const {
        sendRequest: fetchTableList,
        status: TableListStatus,
        data: TableListData,
        error: TableListError,
    } = useHttp(true)
    const {
        sendRequest: fetchDetail,
        status: DetailStatus,
        data: DetailData,
        error: DetailError,
    } = useHttp(false)
    const {
        sendRequest: postDetail,
        status: PostDetailStatus,
        data: PostDetailData,
        error: PostDetailError,
    } = useHttp(false)
    let CustomerTableData = []
    let CustomerTableLoading = false
    let CustomerTableTotalRows = 0
    let PostDetailLoading = false

    //Dialog Operations Start
    const formDialogOpenHandler = () => {
        setFormDialogOpen(true)
    }
    const formDialogCloseHandler = () => {
        setFormDialogOpen(false)
        setTimeout(() => {
            setFormData(initialValue)
        }, 200)
    }
    //Dialog Operations End

    // TableList Operations Start
    TableListStatus === 'pending'
        ? (CustomerTableLoading = true)
        : (CustomerTableLoading = false)
    if (TableListData.data) {
        CustomerTableData = TableListData.data[0].customers
        CustomerTableTotalRows = TableListData.data[0].total
    } 
    useEffect(() => {
        fetchTableList({ url: `/customer${location.search}` })
    }, [fetchTableList, location.search])
    // TableList Operations End

    //DetailData Operations Start
    PostDetailStatus === 'pending'
        ? (PostDetailLoading = true)
        : (PostDetailLoading = false)

    const detailSubmitHandler = useCallback(
        (values) => {
            
            if (values._id) {
                console.log(values)
                postDetail({
                    url: `/customer/${values._id}`,
                    method: 'PATCH',
                    data: values,
                    withCredentials: true,
                })
            } else {
                console.log(values)
                postDetail({
                    url: '/customer',
                    method: 'POST',
                    data: values,
                    withCredentials: true,
                })
            }
        },
        [postDetail]
    )

    const detailGetHandler = useCallback(
        (custid) => {
            fetchDetail({ url: `/customer/${custid}` })
        },
        [fetchDetail]
    )

    const detailDeleteHandler = useCallback(
        (newid) => {
            postDetail({
                url: `/customer/${newid}`,
                method: 'DELETE',
                data: formData,
                withCredentials: true,
            })
        },
        [formData, postDetail]
    )

    useEffect(() => {
        if (DetailStatus === 'completed' && DetailData.data) {
            setFormData(DetailData.data[0])
            formDialogOpenHandler()
        }
        if (DetailStatus === 'completed' && DetailError) {
            errorSnackBar('This is a messsage to display when error occured.')
        }
    }, [DetailStatus, DetailData, DetailError, errorSnackBar])

    useEffect(() => {
        if (PostDetailStatus === 'completed' && PostDetailData.data) {
            formDialogCloseHandler()
            successSnackBar(PostDetailData.message)
            fetchTableList({ url: `/customer${location.search}` })
        }
        if (PostDetailStatus === 'completed' && PostDetailError) {
            formDialogCloseHandler()
            errorSnackBar(PostDetailData.message)
            // fetchTableList({ url: `/customer${location.search}` });
        }
    }, [
        fetchTableList,
        PostDetailStatus,
        PostDetailError,
        PostDetailData.message,
        PostDetailData.data,
        errorSnackBar,
        successSnackBar,
    ])
    //DetailData Operations End

    const columns = useMemo(
        () => [
            {
                id: 1,
                name: 'Name',
                selector: (row) => row.firstname,
                column_name: 'firstname',
                sortable: true,
                reorder: true,
            },
            {
                id: 2,
                name: 'Company',
                selector: (row) => row.domainname,
                column_name: 'domainname',
                sortable: true,
                reorder: true,
            },
            {
                id: 3,
                name: 'Mobile',
                selector: (row) => row.mobile,
                column_name: 'mobile',
                sortable: true,
                reorder: true,
            },
            {
                id: 4,
                name: 'Email',
                selector: (row) => row.email,
                column_name: 'email',
                sortable: true,
                reorder: true,
            },
            {
                id: 5,
                name: 'Receivables',
                selector: (row) =>
                    row.receivables.$numberDecimal
                        ? row.receivables.$numberDecimal
                        : row.receivables,
                column_name: 'receivables',
                sortable: true,
                reorder: true,
            },
            {
                id: 6,
                name: 'Created At',
                selector: (row) => row.createdAt,
                column_name: 'createdAt',
                format: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
                sortable: true,
                reorder: true,
            },
            {
                id: 7,
                name: 'Action(s)',
                cell: (row) => (
                    <>
                        <IconButton
                            onClick={() => detailGetHandler(row._id)}
                            style={{ color: '#4caf50' }}
                            aria-label="delete"
                        >
                            <EditIcon />
                        </IconButton>
                        <DeleteButton
                            onClick={() => detailDeleteHandler(row._id)}
                        />
                    </>
                ),
                sortable: false,
                allowOverflow: true,
                button: true,
            },
        ],
        [detailGetHandler, detailDeleteHandler]
    )

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Master', path: '#' },
                        { name: 'Customers' },
                    ]}
                />
            </div>
            <SimpleCard title="All Customers">
                <Grid container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={formDialogOpenHandler}
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Grid>
                <LoaderOverlay
                    active={DetailStatus === 'pending' ? true : false}
                >
                    {TableListError && (
                        <p className="text-center mt-5">
                            Something went wrong. Try again later.
                        </p>
                    )}
                    {!TableListError && (
                        <ConfirmationDialog
                            dialogTitle={tableListConfirmDialog}
                        >
                            <DataTable
                                columns={columns}
                                data={CustomerTableData}
                                loading={CustomerTableLoading}
                                totalRows={CustomerTableTotalRows}
                                RowClickedURL="/customers/"
                            />
                        </ConfirmationDialog>
                    )}
                </LoaderOverlay>
                {/* <AddCustomerForm
                    open={formDialogOpen}
                    formDialogCloseHandler={formDialogCloseHandler}
                    FormLoading={PostDetailLoading}
                    formData={formData}
                    ={detailSubmitHandler}
                /> */}
                <AddCustomerInformation
                 open={formDialogOpen}
                 formDialogCloseHandler={formDialogCloseHandler}
                 FormLoading={PostDetailLoading}
            
                 formSubmitHandler={detailSubmitHandler}//
                
                />
            </SimpleCard>
        </div>
    )
}
