--------------------------------------------------------------Add ProductFrom .js--------------------------------
import React, { useEffect } from 'react'
import {
    FormDialog,
    FormTextInput,
    FormSelectInput,
    FormTextSelectInput,
    FormAutoCompleteInput,
    FormRadioInput,
    FormFileInput,
} from 'app/components'
import { Formik, Form, Field } from 'formik'
import RadioButtons from '../../../components/FormikRadioButtons/RadioButtons'
import * as Yup from 'yup'
import {
    Grid,
    Divider,
    FormControlLabel,
    Radio,
    FormControl,
    RadioGroup,
    From,
    MenuItem,
    FormLabel,
    Typography,
} from '@material-ui/core'
import {
    unitMasterData,
    brandMasterData,
    manufacturerMasterData,
    taxMasterData,
} from '../../../utils/static.json'
import { useHttp } from 'app/hooks'

export default function AddProductsForm({
    open,
    formDialogCloseHandler,
    formData,
    FormLoading,
    formSubmitHandler,
    errorHandler,
}) {
    // console.log(errorHandler)
    // if (errorHandler != null) {
    //     const errors = {};
    //     errors.name = "req"
    //     // Object.keys(errorHandler).map(key => {
    //     //     setFieldError(key, errorHandler[key])
    //     // })
    // }
    const { sendRequest: fetchTableList, data: VendorDropdownListData } =
        useHttp(true)

    useEffect(() => {
        fetchTableList({ url: `/vendor?isNonMaster=yes` })
    }, [fetchTableList])

    const RadioOptions = [
        { key: 'Goods', value: 'goods' },
        { key: 'Service', value: 'service' },
    ]

    const RadioOptions1 = [
        { key: 'Texable', value: 'taxable' },
        { key: 'Non-Texable', value: 'non-taxable' },
    ]
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        unit: Yup.string().required('Required!'),
        product_type: Yup.string().required('Requied!'),
        tax_preference: Yup.string().required('Requied!'),
        // vendor: Yup.string().required('Required'),
        // tax_preference: Yup.string().required('Required'),
        // checked: Yup.string().required('Required'),
        // images: Yup.string().required('Required'),
        // tax: Yup.string().required('Required'),
    })

    const DialogFormContent = () => {
        return (
            <Formik
                initialValues={formData}
                onSubmit={formSubmitHandler}
                validationSchema={validationSchema}
            >
                {({ values, setFieldValue }) => (
                    <Form id="add-product-form">
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {/* <Grid container justifyContent="center"> */}
                            <Grid item md={5} sm={5} xs={10}>
                                {/* <FormLabel  style={{fontSize:"18px" }} >Type</FormLabel>  */}

                                {/*                             
                                <Field
                                    component={FormRadioInput}
                                    name="product_type"
                                    style={{marginBlock:"10px"}}
                                    
                                >
                                    <FormControlLabel
                                        value="goods"
                                        
                                        control={
                                            <Radio
                                            id="product_type"
                                                color="primary"
                                                size="small"
                                            
                                            />
                                        }
                                        label="Goods"
                                        
                                    />
                                    <FormControlLabel
                                        value="service"
                                        control={
                                             <Radio
                                             id="product_type"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label="Service"
                                    
                                    />
                                </Field> */}

                                {/* <Grid> */}

                                {/* <Field name="product_type" component={FormRadioInput}>
     <RadioGroup  name="product_type"   >
            <FormControlLabel
              control={
                <Radio id="product_type" name="product_type" value="goods" data-testid="radio" />
              }
              label="Yes"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Radio id="product_type" name="product_type" value="service" data-testid="radio" />
              }
              label="No"
              labelPlacement="end"
            />
            </RadioGroup>
          </Field>
         </Grid>
         */}

                                <RadioButtons
                                    // control="radio"
                                    label="Type"
                                    name="product_type"
                                    options={RadioOptions}
                                />

                                {/* <Grid style={{fontSize:"18px" ,marginBlock:"12px", color:"#adadb7"}}>
                          <label >
                          <Field   type="radio" name="product_type" value="goods" />
                          Goods
                          </label>
                          <label style={{fontSize:"18px"}}>
                          <Field style={{marginLeft:"20px"}} type="radio" name="product_type" value="service" />
                          Service
                          </label>
                          </Grid> */}
                            </Grid>
                            <Grid item md={5} sm={5} xs={10}>
                                {/* <Grid style={{ marginBlock: '10px' }}>
                                    <FormLabel style={{ fontSize: '18px' }}>
                                        Tax Preference
                                    </FormLabel>
                                </Grid> */}
                                {/* <Field
                                    component={FormRadioInput}
                                    name="tax_preference"
                                >
                                    <FormControlLabel
                                        value="taxable"
                                        control={
                                            <Radio
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label="Taxable"
                                    />
                                    <FormControlLabel
                                        value="nontaxable"
                                        control={
                                            <Radio
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label="Non-Taxable"
                                    />
                                </Field> */}
                                {/* <Grid
                                    style={{
                                        fontSize: '18px',
                                        color: '#adadb7',
                                    }}
                                >
                                    <label>
                                        <Field
                                            type="radio"
                                            name="tax_preference"
                                            value="taxable"
                                        />
                                        Texable
                                    </label>
                                    <label style={{ fontSize: '18px' }}>
                                        <Field
                                            style={{ marginLeft: '20px' }}
                                            type="radio"
                                            name="tax_preference"
                                            value="nontaxable"
                                        />
                                        Non-Taxable
                                    </label>
                                </Grid> */}

                                <RadioButtons
                                    label="Tax Preference"
                                    name="tax_preference"
                                    options={RadioOptions1}
                                />
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="name"
                                    label="Name"
                                    fullWidth
                                />
                                {/* error={errorHandler != null && errorHandler.error.name ? true : false}
                                helperText={errorHandler != null && errorHandler.error.name ? errorHandler.error.name : ''}  */}
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="sku"
                                    label="sku"
                                    fullWidth
                                />
                            </Grid>
                            {/* {console.log(values.product_type)} */}

                            {values?.product_type === 'goods' ? (
                                <Grid item md={5} sm={5} xs={12}>
                                    <Field
                                        component={FormTextInput}
                                        className="min-w-188"
                                        name="hsn_code"
                                        label="HSN Code"
                                        fullWidth
                                    />
                                </Grid>
                            ) : (
                                <Grid item md={5} sm={5} xs={12}>
                                    <Field
                                        component={FormTextInput}
                                        className="min-w-188"
                                        name="sac"
                                        label="SAC"
                                        fullWidth
                                    />
                                </Grid>
                            )}

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextSelectInput}
                                    className="min-w-188"
                                    name="unit"
                                    label="Unit"
                                    fullWidth
                                >
                                    {unitMasterData.map((item, ind) => (
                                        <MenuItem
                                            value={item.key}
                                            key={item.key}
                                        >
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item xs={10} style={{ marginBlock: '20px' }}>
                                <Divider />
                            </Grid>

                            <Grid item md={10} sm={10} xs={10}>
                                Sales Information
                            </Grid>

                            <Grid item md={5} sm={5} xs={10}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="sellingprice"
                                    label="sellingprice"
                                    fullWidth
                                />
                            </Grid>

                            {values.tax_preference === 'taxable' ? (
                                <Grid item md={5} sm={5} xs={10}>
                                    <Field
                                        component={FormTextSelectInput}
                                        // style={{ width: 188 }}
                                        className="min-w-188"
                                        name="tax"
                                        label="tax"
                                        fullWidth
                                    >
                                        {taxMasterData.map((item, ind) => (
                                            <MenuItem
                                                value={item.key}
                                                key={item.key}
                                            >
                                                {item.value}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                            ) : (
                                <Grid item md={5} sm={5} xs={12}>
                                    <Field
                                        component={FormTextSelectInput}
                                        // style={{ width: 188 }}
                                        className="min-w-188"
                                        name="excemption_reason"
                                        label="Excemption Reason"
                                        fullWidth
                                    >
                                        {taxMasterData.map((item, ind) => (
                                            <MenuItem
                                                value={item.key}
                                                key={item.key}
                                            >
                                                {item.value}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                            )}

                            <Grid item xs={10} style={{ marginBlock: '20px' }}>
                                <Divider />
                            </Grid>

                            <Grid item md={10} sm={10} xs={12}>
                                Track Inventory for this Product
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="reorderpoint"
                                    label="reorderpoint"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    name="vendor"
                                    // style={{ width: 300  ,innerHeight:300}}
                                    // className="py-8"
                                    style={{ width: 188 }}
                                    // className="min-w-188"
                                    component={FormAutoCompleteInput}
                                    label="Vendor"
                                    options={VendorDropdownListData.data}
                                    // size={"large"}
                                    value={values.vendor}
                                    onChange={(_, value) =>
                                        setFieldValue(
                                            'vendor',
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

                            <Grid item xs={10} style={{ marginBlock: '20px' }}>
                                <Divider />
                            </Grid>

                            <Grid item md={5} sm={5} xs={10}>
                                <FormLabel>
                                    Dimensions (Length X Width X Height)
                                </FormLabel>
                                <div className="flex items-center">
                                    <Grid container alignItems="center">
                                        <Grid item md={4} sm={12} xs={12}>
                                            <Field
                                                component={FormTextInput}
                                                size="small"
                                                className="w-full"
                                                name="dimension1"
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <Field
                                                component={FormTextInput}
                                                size="small"
                                                className="w-full"
                                                name="dimension2"
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <Field
                                                component={FormTextInput}
                                                size="small"
                                                className="w-full"
                                                name="dimension3"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item md={5} sm={5} xs={10}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="weight"
                                    label="weight"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextSelectInput}
                                    className="min-w-188"
                                    name="brand"
                                    label="brand"
                                    fullWidth
                                >
                                    {brandMasterData.map((item, ind) => (
                                        <MenuItem
                                            value={item.key}
                                            key={item.key}
                                        >
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextSelectInput}
                                    className="min-w-188"
                                    name="manufacturer"
                                    label="manufacturer"
                                    fullWidth
                                >
                                    {manufacturerMasterData.map((item, ind) => (
                                        <MenuItem
                                            value={item.key}
                                            key={item.key}
                                        >
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="upc"
                                    label="upc"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item md={5} sm={5} xs={12}>
                                <Field
                                    component={FormTextInput}
                                    className="min-w-188"
                                    name="mpn"
                                    label="mpn"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={10}
                            sm={10}
                            xs={12}
                            style={{ marginLeft: '80px', marginBlock: '15px' }}
                        >
                            {/* <input type="file" name="images" multiple onChange={e => setFieldValue("images", e.target.files)} /> */}
                            <Field
                                component={FormFileInput}
                                name="images"
                                multiple
                                onChange={(e) => {
                                    setFieldValue('images', e.target.files)
                                }}
                            />
                        </Grid>

                        {/* <Grid item md={2} sm={5} xs={12}>
                            <div className="flex flex-wrap m--2">
                                <Field component={FormCheckboxInput} value="taxable" name="checked" label='Checkbox' />
                            </div>
                        </Grid> */}
                        {/* </Grid> */}
                    </Form>
                )}
            </Formik>
        )
    }

    return (
        <FormDialog
            maxWidth="md"
            open={open}
            onDialogClose={formDialogCloseHandler}
            title={formData._id ? 'Update product' : 'Create new product'}
            content={<DialogFormContent />}
            SubmitBtnFormID="add-product-form"
            SubmitBtnText={formData._id ? 'Update' : 'Submit'}
            FormLoading={FormLoading}
        />
    )
}
