import { Appear, Button, Loading, Paragraph } from 'arwes';
import Clickable from '../components/Clickable';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateGame = props => {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            props.createGame(formData)
        }
    })
    
    return <Appear animate show={props.entered}>
        <Paragraph>Create a Game</Paragraph>
        <form onSubmit={formik.handleSubmit} style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', gridGap: '10px 20px'}}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" onChange={formik.handleChange}/>
            <label htmlFor="subtitle">Subtitle</label>
            <input type="text" id="subtitle" name="subtitle" onChange={formik.handleChange}/>
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" onChange={formik.handleChange}/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" onChange={formik.handleChange}/>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" onChange={formik.handleChange}/>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" onChange={(event) => formik.setFieldValue('image', event.target.files[0])} accept="image/png,image/jpeg"/>
            <label htmlFor="imageType">Image Type</label>
            <select id="imageType" name="imageType" onChange={(event) => {
                return formik.setFieldValue('imageType',event.target.value)
            }}>
                <option value="0">Unset</option>
                <option value="1" selected>Background</option>
                <option value="2">Featured</option>
                <option value="3">Logo</option>
                <option value="4">Icon</option>
            </select>
            <label htmlFor="duration">Duration</label>
            <input type="number" id="duration" name="duration" onChange={formik.handleChange}/>
            <label htmlFor="isDownloadable">Is Downloadable</label>
            <input type="checkbox" id="isDownloadable" name="isDownloadable" onChange={formik.handleChange}/>
            <label htmlFor="isStreamable">Is Streamable</label>
            <input type="checkbox" id="isStreamable" name="isStreamable" onChange={formik.handleChange}/>
            <label htmlFor="isPremium">Is Premium</label>
            <input type="checkbox" id="isPremium" name="isPremium" onChange={formik.handleChange}/>
            <Clickable>
                <Button
                    animate
                    show={props.entered}
                    buttonProps={{
                        type: 'submit'
                    }}
                    layer="success"
                    disabled={props.isPendingCreation}
                >
                    Create Game
                </Button>
                {
                    props.isPendingCreation &&
                    <Loading animate small/>
                }
            </Clickable>
        </form>
    </Appear>
}

function initialValues(){
    return{
        title: '',
        subtitle: '',
        category: '',
        description: '',
        author: '',
        image: undefined,
        imageType : 1,
        duration: 0,
        isDownloadable: false,
        isStreamable: false,
        isPremium: false
    }
}

function validationSchema(){
    return {
        title: Yup.string().required(),
        subtitle: Yup.string().required(),
        category: Yup.string().required(),
        description: Yup.string().required(),
        author: Yup.string().required(),
        duration: Yup.number().positive().required()
    }
}

export default CreateGame