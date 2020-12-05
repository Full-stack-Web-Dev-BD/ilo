import { Button, Card, CardContent, Chip, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string'
import Axios from 'axios';
const Details = ({ auth }) => {
    const [question, setQuestion] = useState({})
    const [allAnswer, setAllAnswer] = useState([])
    const [answer, setAnswer] = useState('')
    useEffect(() => {
        getDetails()
    }, [])
    const getDetails = () => {
        Axios.get(`/api/question/get-single-question/${qs.parse(window.location.search).id}`)
            .then(res => {
                setQuestion(res.data)
                console.log(res.data, 'asdf;l=>');
                Axios.get(`/api/answer/get-single-question-answer/${res.data._id}`)
                    .then(res => {
                        setAllAnswer(res.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    const deleteQuestion = () => {
        Axios.get(`/api/question/delete/${question._id}`)
            .then(res => {
                window.location.href = '/'
            })
            .catch(err => {
                console.log(err);
            })
    }
    const postAnswer = () => {
        let obj = {
            qid: question._id,
            uid: auth.user.id,
            userName: auth.user.name,
            answer: answer
        }
        Axios.post(`/api/answer`, obj)
            .then(res => {
                setAnswer('')
                getDetails()
            })
            .catch(err => {
                console.log(err);
            })
    }
    const deleteAnswer=(id)=>{
        Axios.get(`/api/answer/delete-answer/${id}`)
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="col-md-10 offset-md-1 mt-5">
            <Link to="/"><Button variant="outlined" color="primary" >Back</Button></Link>
            <Card>
                <CardContent>

                    <Button variant="outlined" color="info"> {question.space} </Button>
                    <div className="d-flex mt-3">
                        <Chip icon={<AccountCircleIcon />} label={question.creatorName} /> <Button>{question.time}</Button>
                    </div>
                    <h4>{question.title} </h4>
                    <Typography >{question.content}</Typography>
                    {
                        auth.user.id === question.creatorid ?
                            <div className="d-flex text-right mt-4">
                                <Link to={`/edit?id=${question._id}`}>
                                    <Button variant="outlined" style={{ marginRight: '30px' }} color="primary" >Edit</Button>
                                </Link>
                                <Button onClick={e => { deleteQuestion() }} variant="outlined" style={{ marginRight: '30px' }} color="primary" >Delete</Button>
                            </div> : ''
                    }
                </CardContent>
            </Card>
            <div style={{ paddingLeft: '30px' }}>
                {
                    allAnswer.map(el => (
                        <div className="mt-2">
                            <Card>
                                <CardContent>
                                    <div className="d-flex mt-3">
                                        <Chip icon={<AccountCircleIcon />} label={el.userName} /> <Button>{el.time}</Button>
                                        {
                                            el.uid===auth.user.id ?
                                                <Button onClick={e=>{deleteAnswer(el._id)}} variant="contained" style={{ marginLeft: 'auto' }} color="primary" >Delete</Button> : ''
                                        }
                                    </div>
                                    <Typography > {el.answer} </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                }
                {
                    auth.isAuthenticated ?
                        <div className="mt-2">
                            <Card>
                                <CardContent>
                                    <Chip icon={<AccountCircleIcon />} label={`${auth.user.name}`} />
                                    <div className="d-flex mt-3">
                                        <TextField
                                            fullWidth
                                            placeholder="Post your Answer"
                                            style={{ marginRight: '30px' }}
                                            required
                                            value={answer}
                                            onChange={e => { setAnswer(e.target.value) }}
                                        />
                                        {
                                            answer ?
                                                <Button type='submit' variant="contained" style={{ marginRight: '30px' }} onClick={e => { postAnswer() }} color="primary" >Post</Button> :
                                                <Button type='submit' variant="outlined" style={{ marginRight: '30px' }} color="default" >Post</Button>
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        : ''
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Details)
