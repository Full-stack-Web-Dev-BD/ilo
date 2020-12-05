import { Button, Card, CardContent, Chip, Radio, TextField, Typography } from '@material-ui/core'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const PostQuestion = ({ auth }) => {
    const [question, setQuestion] = useState([])
    const [title, setTitle] = useState('')
    const [space, setSpace] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        setQuestion(['w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2'])
    }, [])

    const submitHandler = (event) => {
        event.preventDefault()
        if(!title || ! space || ! content){
            return alert('Title , Space  and Content is required !!')
        }
        let obj = {
            title: title,
            space:space,
            content: content,
            creatorid: auth.user.id,
            creatorName: auth.user.name,
            // time:`${new Date().getDate}-${new Date().getMonth}-${new Date().getFullYear}`
        }
        Axios.post('/api/question/ask',obj)
        .then(res=>{
            window.location.href='/'
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="col-md-8 offset-md-2 mt-4">
            <div className="mt-5 mb-2">
                <Link to="/"><Button variant="outlined" color="primary" >Back</Button></Link>
            </div>
            <Card>
                <CardContent>
                    <h3>Ask your question</h3>
                    <form onSubmit={e => { submitHandler(e) }}>
                        <TextField
                            onChange={e => { setTitle(e.target.value) }}
                            placeholder="Title"
                            fullWidth
                            value={title}
                            label="Title"
                            required
                        />
                        <div>
                            <label>Space</label>
                            <div className="d-flex">
                                <select onChange={e => setSpace(e.target.value)} required className="form-control">
                                    <option >Select Space </option>
                                    <option value="Algorithm">Algorithm</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="System">System</option>
                                    <option value="Javascript">Javascript</option>
                                </select>
                            </div>
                        </div>
                        <label>Content</label>
                        <textarea
                            required
                            onChange={e => { setContent(e.target.value) }}
                            value={content}
                            className="form-control"
                            placeholder="Enter your content"
                        />
                        <Typography>Note : Title , Space  and Content is Required !!!</Typography>
                        <div className="d-flex mt-4">
                            <Button type="submit" variant="outlined" color="primary" > Submit</Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PostQuestion)
