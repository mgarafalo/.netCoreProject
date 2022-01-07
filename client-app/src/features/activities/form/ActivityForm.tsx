import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../common/form/MyTextInput';
import MyTextArea from '../../../common/form/MyTextArea';
import MySelectInput from '../../../common/form/MySelectInput';
import { categoryOptions } from '../../../common/options/categoryOptions';
import MyDateInput from '../../../common/form/MyDateInput';
import { Activity, ActivityFormValues } from '../../../models/activity';
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const history = useHistory();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues)

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required('Venue is required'),
        city: Yup.string().required('City is required')
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity, 
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea row={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date' 
                            showTimeSelect timeCaption='time' 
                            dateFormat='MMMM d, yyyy h:mm aa' 
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' 
                            loading={isSubmitting} 
                        />
                        <Button 
                            as={Link} 
                            to='/activities' 
                            floated='right' 
                            type='button' 
                            content='Cancel' 
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})